export interface Notification {
	id: string;
	type: "success" | "info" | "error" | "valentine";
	title?: string;
	message: string;
	duration?: number; // milliseconds, 0 = no auto-dismiss
}

export class NotificationState {
	notifications = $state<Notification[]>([]);
	private timeouts = new Map<string, ReturnType<typeof setTimeout>>();

	show(notification: Omit<Notification, "id"> & { id?: string }): string {
		const id = notification.id || crypto.randomUUID();
		const duration = notification.duration ?? 5000;

		const newNotification: Notification = {
			...notification,
			id,
			duration,
		};

		this.notifications = [...this.notifications, newNotification];

		// Auto-dismiss after duration
		if (duration > 0) {
			const timeout = setTimeout(() => {
				this.dismiss(id);
			}, duration);
			this.timeouts.set(id, timeout);
		}

		return id;
	}

	dismiss(id: string) {
		// Clear timeout if exists
		const timeout = this.timeouts.get(id);
		if (timeout) {
			clearTimeout(timeout);
			this.timeouts.delete(id);
		}

		// Remove notification
		this.notifications = this.notifications.filter((n) => n.id !== id);
	}

	clear() {
		// Clear all timeouts
		for (const timeout of this.timeouts.values()) {
			clearTimeout(timeout);
		}
		this.timeouts.clear();
		this.notifications = [];
	}
}

export const notificationState = new NotificationState();
