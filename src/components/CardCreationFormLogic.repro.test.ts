
import { describe, it, expect, beforeAll } from "bun:test";

beforeAll(() => {
  (globalThis as any).$state = (v: any) => v;
  (globalThis as any).$derived = (v: any) => v;
  (globalThis as any).$props = () => ({});
});

import { CreateCardFormState } from "../lib/create-card.svelte";

class ComponentSimulation {
    form: CreateCardFormState;
    private lastUseCustomButtons = false;
    private lastHideButtons = false;

    constructor() {
        this.form = new CreateCardFormState();
    }

    // Simulate Svelte $effect that reacts to changes
    runExclusionEffect() {
        if (this.form.useCustomButtons && this.form.useCustomButtons !== this.lastUseCustomButtons) {
            this.form.hideButtons = false;
        } else if (this.form.hideButtons && this.form.hideButtons !== this.lastHideButtons) {
            this.form.useCustomButtons = false;
        }
        this.lastUseCustomButtons = this.form.useCustomButtons;
        this.lastHideButtons = this.form.hideButtons;
    }
}

describe("CreateCardForm Exclusion Logic", () => {
    it("should uncheck hideButtons when useCustomButtons is checked", () => {
        const component = new ComponentSimulation();
        const form = component.form;
        
        // Check hideButtons first
        form.hideButtons = true;
        component.runExclusionEffect();
        expect(form.hideButtons).toBe(true);
        expect(form.useCustomButtons).toBe(false);

        // Then check useCustomButtons
        form.useCustomButtons = true;
        component.runExclusionEffect();
        
        expect(form.hideButtons).toBe(false);
        expect(form.useCustomButtons).toBe(true);
    });

    it("should uncheck useCustomButtons when hideButtons is checked", () => {
        const component = new ComponentSimulation();
        const form = component.form;
        
        // Check useCustomButtons first
        form.useCustomButtons = true;
        component.runExclusionEffect();
        expect(form.useCustomButtons).toBe(true);
        expect(form.hideButtons).toBe(false);

        // Then check hideButtons
        form.hideButtons = true;
        component.runExclusionEffect();
        
        expect(form.useCustomButtons).toBe(false);
        expect(form.hideButtons).toBe(true);
    });
});
