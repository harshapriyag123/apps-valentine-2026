import { describe, expect, it } from "bun:test";
import { NotificationState } from "./notification.svelte";

describe("NotificationState", () => {
	it("should add notifications", () => {
		const state = new NotificationState();

		const id = state.show({
			type: "success",
			message: "Test notification",
			duration: 0, // No auto-dismiss for test
		});

		expect(state.notifications).toHaveLength(1);
		expect(state.notifications[0].id).toBe(id);
		expect(state.notifications[0].message).toBe("Test notification");
	});

	it("should dismiss notifications", () => {
		const state = new NotificationState();

		const id = state.show({
			type: "info",
			message: "Test notification",
			duration: 0,
		});

		expect(state.notifications).toHaveLength(1);

		state.dismiss(id);

		expect(state.notifications).toHaveLength(0);
	});

	it("should support multiple notifications", () => {
		const state = new NotificationState();

		state.show({ type: "success", message: "First", duration: 0 });
		state.show({ type: "error", message: "Second", duration: 0 });
		state.show({ type: "info", message: "Third", duration: 0 });

		expect(state.notifications).toHaveLength(3);
		expect(state.notifications[0].message).toBe("First");
		expect(state.notifications[1].message).toBe("Second");
		expect(state.notifications[2].message).toBe("Third");
	});

	it("should auto-dismiss notifications after duration", async () => {
		const state = new NotificationState();

		state.show({
			type: "success",
			message: "Auto-dismiss test",
			duration: 100, // 100ms
		});

		expect(state.notifications).toHaveLength(1);

		// Wait for auto-dismiss
		await new Promise((resolve) => setTimeout(resolve, 150));

		expect(state.notifications).toHaveLength(0);
	});

	it("should clear all notifications", () => {
		const state = new NotificationState();

		state.show({ type: "success", message: "First", duration: 0 });
		state.show({ type: "error", message: "Second", duration: 0 });

		expect(state.notifications).toHaveLength(2);

		state.clear();

		expect(state.notifications).toHaveLength(0);
	});

	it("should handle custom notification IDs", () => {
		const state = new NotificationState();

		const customId = "custom-id-123";
		const id = state.show({
			id: customId,
			type: "valentine",
			message: "Custom ID test",
			duration: 0,
		});

		expect(id).toBe(customId);
		expect(state.notifications[0].id).toBe(customId);
	});

	it("should set default duration to 5000ms", () => {
		const state = new NotificationState();

		state.show({
			type: "info",
			message: "Default duration test",
		});

		expect(state.notifications[0].duration).toBe(5000);
	});
});
