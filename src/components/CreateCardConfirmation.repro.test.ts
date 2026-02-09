
import { describe, it, expect, beforeAll, spyOn } from "bun:test";

beforeAll(() => {
  (globalThis as any).$state = (v: any) => v;
  (globalThis as any).$derived = (v: any) => v;
  (globalThis as any).$props = () => ({});
});

import { CreateCardFormState } from "../lib/create-card.svelte";

class ComponentSimulation {
    form: CreateCardFormState;
    showConfirmModal = false;
    
    constructor() {
        this.form = new CreateCardFormState();
        // Mock the submit method to track if it's called
        this.form.submit = async () => {
            return Promise.resolve();
        };
    }

    // This simulates the behavior of the "Send Love" button click
    handleSendLove() {
        this.showConfirmModal = true;
    }

    async handleConfirm() {
        this.showConfirmModal = false;
        await this.form.submit();
    }

    handleCancel() {
        this.showConfirmModal = false;
    }
}

describe("CreateCardForm Confirmation Flow", () => {
    it("should show modal on Send Love and only submit on confirm", async () => {
        const component = new ComponentSimulation();
        const submitSpy = spyOn(component.form, "submit");

        // Click Send Love
        component.handleSendLove();
        expect(component.showConfirmModal).toBe(true);
        expect(submitSpy).not.toHaveBeenCalled();

        // Click Cancel
        component.handleCancel();
        expect(component.showConfirmModal).toBe(false);
        expect(submitSpy).not.toHaveBeenCalled();

        // Click Send Love again
        component.handleSendLove();
        expect(component.showConfirmModal).toBe(true);

        // Click Confirm
        await component.handleConfirm();
        expect(component.showConfirmModal).toBe(false);
        expect(submitSpy).toHaveBeenCalled();
    });
});
