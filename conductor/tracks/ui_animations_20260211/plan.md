# Plan: Valentine UI Animations & Transitions

This plan outlines the implementation of cinematic transitions for the card creation form and a magical unboxing experience for the card receiver.

## Phase 1: Cinematic Mobile Transitions in CreateCardForm

Improve the mobile experience by adding themed transitions between the Edit and Preview tabs.

- [x] Task: Integrate `svelte-motion` into `CreateCardForm.svelte` for tab switching. [8cf6025]
    - Wrap the "Edit" and "Preview" sections in `AnimatePresence` and `Motion`.
    - Implement a "Slide" transition where one view pushes the other.
- [x] Task: Implement a "Heart Pulse" overlay effect. [8cf6025]
    - Create a temporary heart-shaped overlay that pulses or expands during the tab switch to mask the transition and reinforce the Valentine theme.
- [x] Task: Write unit tests in `src/components/CreateCardForm.animation.test.ts`. [8cf6025]
    - Verify that switching `activeTab` correctly triggers state changes intended for `svelte-motion`.
- [x] Task: Conductor - User Manual Verification 'Phase 1' (Protocol in workflow.md) [checkpoint: 5308e2c]

## Phase 2: Magical Envelope Unboxing in ReceiverView

Create a romantic "unboxing" experience for the recipient before they see the actual card.

- [x] Task: Create the `src/components/Envelope.svelte` component. [44cdaab]
    - Implement a closed envelope UI using CSS/SVG.
    - Use `svelte-motion` to add a "Hover Wiggle" effect (physics-based jitter).
- [x] Task: Update `ReceiverView.svelte` to manage the unboxing state. [7c05658]
    - Add an `isOpen` and `isOpening` state.
    - Conditionally render `Envelope` or `CardDisplay`.
- [x] Task: Implement the "Deliberate Unfolding" animation sequence. [a4269d8]
    - Phase 1: Flap opens (3D rotation or SVG path animation).
    - Phase 2: Card slides up from inside the envelope.
    - Phase 3: Envelope fades out as the card reaches full scale.
- [x] Task: Write unit tests in `src/components/ReceiverView.animation.test.ts`. [a4269d8]
    - Verify that clicking the envelope correctly initiates the opening sequence and ultimately shows the card.
- [x] Task: Conductor - User Manual Verification 'Phase 2' (Protocol in workflow.md) [checkpoint: 587902e]

## Phase 3: Polishing & Performance

- [ ] Task: Refine animation timings and easing.
    - Ensure all transitions feel "soft" and "delightful" rather than mechanical.
- [ ] Task: Verify mobile responsiveness.
    - Ensure the envelope and transitions look perfect on small screens.
- [ ] Task: Conductor - User Manual Verification 'Phase 3' (Protocol in workflow.md)
