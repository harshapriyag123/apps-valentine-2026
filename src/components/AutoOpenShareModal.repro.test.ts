import { describe, expect, it } from "bun:test";

// Mock Svelte runes before anything else
(globalThis as any).$state = (v: any) => v;
(globalThis as any).$derived = (v: any) => v;
(globalThis as any).$props = () => ({});
(globalThis as any).window = { location: { origin: "http://localhost:3000" } };

// Use require to avoid import hoisting
const { uiState } = require("../lib/ui.svelte");

describe("Auto-Open Share Modal Flow", () => {
	it("should open the share modal when openShareModal is called", () => {
		const testId = "card-123";
		uiState.openShareModal(testId);

		expect(uiState.isShareModalOpen).toBe(true);
		expect(uiState.shareModalUrl).toBe(`http://localhost:3000/card/${testId}`);
	});
});
