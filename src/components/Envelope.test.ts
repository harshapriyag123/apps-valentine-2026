import { describe, expect, it } from "bun:test";
import { readFileSync } from "node:fs";
import { join } from "node:path";

describe("Envelope Component", () => {
    const cwd = process.cwd();
    // We will create this file shortly
    const componentPath = join(cwd, "src/components/Envelope.svelte");
    
    it("should render an envelope SVG", () => {
        const content = readFileSync(componentPath, "utf-8");
        expect(content).toContain("<svg");
        expect(content).toContain("viewBox");
    });

    it("should use svelte-motion for interactivity", () => {
        const content = readFileSync(componentPath, "utf-8");
        expect(content).toContain("svelte-motion");
        // Expecting Motion or AnimatePresence
        expect(content).toContain("Motion"); 
    });

    it("should emit an 'open' event when clicked", () => {
        const content = readFileSync(componentPath, "utf-8");
        // Check for onclick handler that likely calls a prop or dispatcher
        // Since we use Svelte 5 props, maybe `onclick` prop
        expect(content).toContain("onclick");
    });

    it("should manage heart seal position via Motion props to avoid jumping", () => {
        const content = readFileSync(componentPath, "utf-8");
        // Ensure we don't have a static transform on the g tag that conflicts with Motion
        expect(content).not.toContain('<g use:sealMotion transform="translate');
        // Ensure coordinates are in the Motion props
        expect(content).toContain('x: 132, y: 115');
    });
});
