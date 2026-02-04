import { describe, it, expect, mock, beforeAll } from "bun:test";

beforeAll(() => {
  (globalThis as any).$state = (v: any) => v;
  (globalThis as any).$derived = (v: any) => v;
  (globalThis as any).$effect = (fn: any) => fn();
  (globalThis as any).$props = () => ({});
});

import { ReceiverViewLogic } from "../lib/receiver.svelte";
import { CardState } from "../lib/cards.svelte";

// Mock the cards module to avoid side effects in CardState constructor
mock.module('../lib/cards', () => ({
  subscribeToCard: () => () => {},
  updateCardStatus: async () => {},
}));

// Simulating the Component Logic in @src/components/ReceiverView.svelte
class ReceiverViewSimulation {
    props: { id: string, initialCard: any };
    cardState: CardState;
    logic: ReceiverViewLogic;

    constructor(initialProps: any) {
        this.props = initialProps;
        
        // Refactored: Pass getter to CardState and initialize logic empty
        this.cardState = new CardState(() => this.props.id);
        
        this.logic = new ReceiverViewLogic('', undefined);
        
        // Run effects on mount
        this.runEffects();
    }

    updateProps(newProps: any) {
        this.props = newProps;
        // Run effects after props update
        this.runEffects();
    }
    
    runEffects() {
        // Sync logic
        this.logic.id = this.props.id;
        this.logic.card = this.props.initialCard;
    }
}

describe("ReceiverView Reactivity Bug", () => {
    it("updates logic.id when prop id changes", () => {
        const initialProps = { id: "card-1", initialCard: {} };
        const component = new ReceiverViewSimulation(initialProps);

        expect(component.logic.id).toBe("card-1");

        // Simulate navigation to a different card
        component.updateProps({ id: "card-2", initialCard: {} });

        // EXPECTATION: logic.id should be updated to "card-2"
        expect(component.logic.id).toBe("card-2");
    });

    it("correctly holds custom button data", () => {
        const initialCard = {
            id: "card-1",
            useCustomButtons: true,
            button1Text: "Date Night?",
            button2Text: "Movie?",
            sender: "Romeo",
            receiver: "Juliet"
        };
        const initialProps = { id: "card-1", initialCard };
        const component = new ReceiverViewSimulation(initialProps);

        expect(component.logic.card?.useCustomButtons).toBe(true);
        expect(component.logic.card?.button1Text).toBe("Date Night?");
        expect(component.logic.card?.button2Text).toBe("Movie?");
    });
});
