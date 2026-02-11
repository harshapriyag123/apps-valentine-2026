# Plan: Valentine UI Animations & Transitions

This plan outlines the implementation of cinematic transitions for the card creation form and a magical unboxing experience for the card receiver.

## Phase 1: Cinematic Mobile Transitions in CreateCardForm

Improve the mobile experience by adding themed transitions between the Edit and Preview tabs.

- [ ] Task: Integrate `svelte-motion` into `CreateCardForm.svelte` for tab switching.
    - Wrap the "Edit" and "Preview" sections in `AnimatePresence` and `Motion`.
    - Implement a "Slide" transition where one view pushes the other.
- [ ] Task: Implement a "Heart Pulse" overlay effect.
    - Create a temporary heart-shaped overlay that pulses or expands during the tab switch to mask the transition and reinforce the Valentine theme.
- [ ] Task: Write unit tests in `src/components/CreateCardForm.animation.test.ts`.
    - Verify that switching `activeTab` correctly triggers state changes intended for `svelte-motion`.
- [ ] Task: Conductor - User Manual Verification 'Phase 1' (Protocol in workflow.md)

## Phase 2: Magical Envelope Unboxing in ReceiverView

Create a romantic "unboxing" experience for the recipient before they see the actual card.

- [ ] Task: Create the `src/components/Envelope.svelte` component.
    - Implement a closed envelope UI using CSS/SVG.
    - Use `svelte-motion` to add a "Hover Wiggle" effect (physics-based jitter).
- [ ] Task: Update `ReceiverView.svelte` to manage the unboxing state.
    - Add an `isOpen` and `isOpening` state.
    - Conditionally render `Envelope` or `CardDisplay`.
- [ ] Task: Implement the "Deliberate Unfolding" animation sequence.
    - Phase 1: Flap opens (3D rotation or SVG path animation).
    - Phase 2: Card slides up from inside the envelope.
    - Phase 3: Envelope fades out as the card reaches full scale.
- [ ] Task: Write unit tests in `src/components/ReceiverView.animation.test.ts`.
    - Verify that clicking the envelope correctly initiates the opening sequence and ultimately shows the card.
- [ ] Task: Conductor - User Manual Verification 'Phase 2' (Protocol in workflow.md)

## Phase 3: Polishing & Performance

- [ ] Task: Refine animation timings and easing.
    - Ensure all transitions feel "soft" and "delightful" rather than mechanical.
- [ ] Task: Verify mobile responsiveness.
    - Ensure the envelope and transitions look perfect on small screens.
- [ ] Task: Conductor - User Manual Verification 'Phase 3' (Protocol in workflow.md)
