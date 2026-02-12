import type { Card } from "./cards";
import { subscribeToCards } from "./dashboard";
import { notificationState } from "./notification.svelte";

interface CardStatusRecord {
	[cardId: string]: Card["status"];
}

export class DashboardState {
	cards = $state<Card[]>([]);
	loading = $state(true);
	username = $state("");
	hasCard = $derived(this.cards.length > 0);
	private lastSeenStatuses: CardStatusRecord = {};
	private isInitialLoad = true;

	constructor(username: string) {
		this.username = username;
		this.loadLastSeenStatuses();

		$effect(() => {
			if (!this.username) return;

			this.loading = true;
			const unsubscribe = subscribeToCards(this.username, (updatedCards) => {
				this.handleCardUpdates(updatedCards);
				this.loading = false;
			});

			return () => {
				unsubscribe();
			};
		});
	}

	private loadLastSeenStatuses() {
		try {
			const stored = localStorage.getItem(
				`valentine_last_seen_${this.username}`,
			);
			if (stored) {
				this.lastSeenStatuses = JSON.parse(stored);
			}
		} catch (e) {
			console.error("Failed to load last seen statuses:", e);
		}
	}

	private saveLastSeenStatuses() {
		try {
			localStorage.setItem(
				`valentine_last_seen_${this.username}`,
				JSON.stringify(this.lastSeenStatuses),
			);
		} catch (e) {
			console.error("Failed to save last seen statuses:", e);
		}
	}

	private handleCardUpdates(updatedCards: Card[]) {
		for (const card of updatedCards) {
			if (!card.id) continue;

			const lastSeenStatus = this.lastSeenStatuses[card.id];
			const currentStatus = card.status;

			// Check if status has changed to a response status
			if (
				lastSeenStatus &&
				lastSeenStatus !== currentStatus &&
				this.isResponseStatus(currentStatus)
			) {
				// Real-time notification (user is actively viewing)
				if (!this.isInitialLoad) {
					this.showNotification(card, currentStatus);
				}
				// Catch-up notification (user was offline)
				else if (
					this.isInitialLoad &&
					this.shouldShowCatchup(lastSeenStatus, currentStatus)
				) {
					this.showNotification(card, currentStatus);
				}
			}

			// Update last seen status
			this.lastSeenStatuses[card.id] = currentStatus;
		}

		this.cards = updatedCards;
		this.isInitialLoad = false;
		this.saveLastSeenStatuses();
	}

	private isResponseStatus(status: Card["status"]): boolean {
		return ["accepted", "declined", "replied"].includes(status);
	}

	private shouldShowCatchup(
		oldStatus: Card["status"],
		newStatus: Card["status"],
	): boolean {
		// Show catch-up if status changed from sent/viewed to a response status
		return (
			["sent", "viewed"].includes(oldStatus) && this.isResponseStatus(newStatus)
		);
	}

	private showNotification(card: Card, status: Card["status"]) {
		const receiverName = card.receiver;

		switch (status) {
			case "accepted":
				notificationState.show({
					type: "valentine",
					title: "Card Accepted!",
					message: `❤️ ${receiverName} accepted your card!`,
				});
				break;
			case "declined":
				notificationState.show({
					type: "info",
					title: "Card Response",
					message: `${receiverName} declined your card`,
				});
				break;
			case "replied":
				notificationState.show({
					type: "valentine",
					title: "New Reply!",
					message: `💬 ${receiverName} sent you a reply!`,
				});
				break;
		}
	}
}
