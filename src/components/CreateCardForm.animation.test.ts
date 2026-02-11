import { describe, expect, it } from "bun:test";
import { readFileSync } from "node:fs";
import { join } from "node:path";

describe("CreateCardForm Animations", () => {
    const cwd = process.cwd();
    const componentPath = join(cwd, "src/components/CreateCardForm.svelte");
    const content = readFileSync(componentPath, "utf-8");

    it("should import svelte-motion components", () => {
        expect(content).toContain('import { AnimatePresence, Motion } from "svelte-motion"');
    });

    it("should wrap mobile tab content in AnimatePresence", () => {
        expect(content).toContain("<AnimatePresence");
    });

    it("should use Motion components for transitions", () => {
        expect(content).toContain("<Motion");
    });

    it("should include a heart pulse overlay", () => {
        // We expect a specific visual element or class for the pulse effect
        expect(content).toContain("heart-pulse-overlay");
    });
});
