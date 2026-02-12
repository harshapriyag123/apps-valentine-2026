import { doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { type Card, updateCardStatus } from "./cards";
import { db } from "./firebase";

export class ReceiverViewLogic {
	id: string;
	card = $state<Card | null>(null);
	noButtonPos = $state({ x: 0, y: 0 });
	yesButtonScale = $state(1);
	noButtonFlyCount = $state(0);
	onAccept?: () => void;

	// Reply features
	replyText = $state("");
	replySubmitting = $state(false);
	replySuccess = $state(false);

	constructor(id: string = "", initialCard?: Card, onAccept?: () => void) {
		this.id = id;
		if (initialCard) {
			this.card = initialCard;
			if (initialCard.replyText) {
				this.replyText = initialCard.replyText;
				this.replySuccess = true;
			}
		}
		this.onAccept = onAccept;
	}

	async markAsViewed() {
		if (this.card?.status === "sent") {
			await updateCardStatus(this.id, "viewed");
		}
	}

	handleNoHover() {
		// Limit the random fly to 5 times only
		if (this.noButtonFlyCount < 5) {
			this.noButtonPos = {
				x: (Math.random() - 0.5) * 200,
				y: (Math.random() - 0.5) * 200,
			};
			this.noButtonFlyCount += 1;
			// Yes button grows on hover, but only during the first 5 fly attempts
			this.yesButtonScale += 0.1;
		}
	}

	async accept(replyText?: string) {
		this.replySubmitting = true;
		try {
			const docRef = doc(db, "cards", this.id);
			// biome-ignore lint/suspicious/noExplicitAny: This is for firebase updateDoc
			const updates: Record<string, any> = {
				// If hideButtons is true, status should be 'replied' not 'accepted'
				status: this.card?.hideButtons ? "replied" : "accepted",
				updatedAt: serverTimestamp(),
			};

			if (replyText) {
				updates.replyText = replyText;
			}

			await updateDoc(docRef, updates);
			this.replySuccess = true;
			this.onAccept?.();
		} catch (err) {
			console.error("Failed to accept:", err);
		} finally {
			this.replySubmitting = false;
		}
	}

	async decline(replyText?: string) {
		this.replySubmitting = true;
		try {
			const docRef = doc(db, "cards", this.id);
			// biome-ignore lint/suspicious/noExplicitAny: This is for firebase updateDoc
			const updates: Record<string, any> = {
				// If hideButtons is true, status should be 'replied' not 'declined'
				status: this.card?.hideButtons ? "replied" : "declined",
				updatedAt: serverTimestamp(),
			};

			if (replyText) {
				updates.replyText = replyText;
			}

			await updateDoc(docRef, updates);
			this.replySuccess = true;
		} catch (err) {
			console.error("Failed to decline:", err);
		} finally {
			this.replySubmitting = false;
		}
	}

	async submitReply() {
		if (!this.id || !this.replyText.trim()) return;

		this.replySubmitting = true;
		try {
			const docRef = doc(db, "cards", this.id);
			await updateDoc(docRef, {
				replyText: this.replyText,
				updatedAt: serverTimestamp(),
			});

			if (this.card?.hideButtons) {
				await updateCardStatus(this.id, "replied");
			}

			this.replySuccess = true;
			this.replyText = "";
		} catch (err) {
			console.error("Failed to submit reply:", err);
		} finally {
			this.replySubmitting = false;
		}
	}
}
