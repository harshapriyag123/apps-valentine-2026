import { describe, expect, it, mock } from "bun:test";

// Mock global window
(globalThis as any).window = {
	location: {
		origin: "http://localhost:3000",
	},
};

// Mock Svelte 5 runes globally BEFORE imports
(globalThis as any).$state = (v: any) => v;
(globalThis as any).$derived = (v: any) => v;

// Now import the modules that use runes
const { CreateCardFormState } = await import("../lib/create-card.svelte");
const { uiState } = await import("../lib/ui.svelte");

// Mock the cards service
mock.module("../lib/cards", () => ({
	createCard: async () => "test-card-id",
}));

describe("Auto-Open Share Modal Reproduction", () => {
	it("should automatically open share modal after successful submission", async () => {
		// Reset UI state
		uiState.closeShareModal();
		
		const form = new CreateCardFormState("Romeo", "romeo123");
		form.receiver = "Juliet";
		form.message = "Be my Valentine?";
		
		// Verify initial state
		expect(uiState.isShareModalOpen).toBe(false);

		// Submit the form
		await form.submit();

		// Check if share modal is open
		expect(uiState.isShareModalOpen).toBe(true);
		expect(uiState.shareModalUrl).toContain("test-card-id");
	});
});
