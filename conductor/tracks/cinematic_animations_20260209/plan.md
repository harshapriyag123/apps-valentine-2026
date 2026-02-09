# Implementation Plan: Cinematic UI & Animation Enhancements

## Phase 1: Animation Utilities & Accessibility [checkpoint: 8a03cca]
- [x] Task: Create animation utility for "Reduced Motion" and randomization. 21743a8
    - [x] Write tests for a `prefersReducedMotion` store or utility. 21743a8
    - [x] Implement `src/lib/ui.svelte.ts` (or update) to include a helper that checks system motion preferences. 21743a8
    - [x] Write tests for the "Sending Animation" randomizer logic. 21743a8
    - [x] Implement the randomizer function to return one of the three defined animation types. 21743a8
- [x] Task: Conductor - User Manual Verification 'Phase 1: Animation Utilities & Accessibility' (Protocol in workflow.md) 8a03cca

## Phase 2: Reactive Card Preview (Svelte Motion)
- [x] Task: Implement layout morphing in `CardDisplay.svelte`. d4af7be
    - [x] Write failing tests for component reactivity and layout changes (verify no layout jumps). d4af7be
    - [x] Wrap `CardDisplay` elements in `motion.div` from `svelte-motion`. d4af7be
    - [x] Implement `layout` prop on motion components to enable automatic layout projections. d4af7be
    - [x] Add `AnimatePresence` for fading in/out dynamic content (like optional text fields). d4af7be
- [~] Task: Conductor - User Manual Verification 'Phase 2: Reactive Card Preview' (Protocol in workflow.md)

## Phase 3: Ethereal Modals
- [ ] Task: Update Modals with floating and transition effects.
    - [ ] Write tests for modal entrance/exit states in `ShareModal.svelte` and `ConfirmModal.svelte`.
    - [ ] Implement Tailwind transitions for the backdrop blur and fade.
    - [ ] Create a "floating" CSS keyframe animation or `svelte-motion` variant for the modal content.
    - [ ] Apply the floating animation to all modals.
- [ ] Task: Conductor - User Manual Verification 'Phase 3: Ethereal Modals' (Protocol in workflow.md)

## Phase 4: Cinematic "Sending" Flow
- [ ] Task: Implement the "Sending" transition animations.
    - [ ] Create a `SendingAnimation.svelte` wrapper or update `CreateCardForm.svelte` to handle the exit states.
    - [ ] Implement "Flying Letter" animation (CSS/Svelte Motion).
    - [ ] Implement "Heartbeat & Burst" animation (using existing `canvas-confetti` if possible).
    - [ ] Implement "Soft Dissolve" with a pulsing heart loader.
- [ ] Task: Integrate the random animation into the submission flow.
    - [ ] Update the card submission handler in `CreateCardForm.svelte` to trigger the selected animation before resolving the UI change.
- [ ] Task: Conductor - User Manual Verification 'Phase 4: Cinematic "Sending" Flow' (Protocol in workflow.md)

## Phase 5: Final Polish & Performance
- [ ] Task: UX review for mobile smoothness and performance.
    - [ ] Verify 60fps performance on mobile emulation for all transitions.
    - [ ] Ensure "Reduce Motion" correctly disables all decorative animations.
- [ ] Task: Conductor - User Manual Verification 'Phase 5: Final Polish & Performance' (Protocol in workflow.md)
