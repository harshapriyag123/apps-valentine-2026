import { describe, it, expect, beforeAll } from "bun:test";

// Mock Svelte 5 runes globally
(globalThis as any).$state = (v: any) => v;

describe("UI Utilities", () => {
  let uiModule: any;

  beforeAll(async () => {
    uiModule = await import("./ui.svelte");
  });

  describe("prefersReducedMotion", () => {
    it("should default to false in test environment", () => {
      expect(uiModule.uiState.prefersReducedMotion).toBe(false);
    });
  });

  describe("getRandomSendingAnimation", () => {
    it("should return one of the three valid animation types", () => {
      const validAnimations = ["flying-letter", "heartbeat-burst", "soft-dissolve"];
      for (let i = 0; i < 20; i++) {
        const animation = uiModule.getRandomSendingAnimation();
        expect(validAnimations).toContain(animation);
      }
    });

    it("should be somewhat random", () => {
        const results = new Set();
        for (let i = 0; i < 100; i++) {
            results.add(uiModule.getRandomSendingAnimation());
        }
        expect(results.size).toBe(3);
    });
  });
});
