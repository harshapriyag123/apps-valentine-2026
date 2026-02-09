# Implementation Plan: UI Enhancements and Flow Fixes

## Phase 1: Dashboard Preview Readability [checkpoint: b881d49]
- [x] Task: Increase font size in `CardDisplay.svelte` 3f6e30e
    - [ ] Write failing test in `src/styles/theme.test.ts` (or create a new component test) to verify text elements in `CardDisplay` have larger font sizes/classes.
    - [ ] Update `src/components/CardDisplay.svelte` to use larger Tailwind font size classes (e.g., `text-lg`, `text-xl`) for headers, labels, and buttons.
    - [ ] Verify the UI looks consistent and balanced on mobile.
- [x] Task: Conductor - User Manual Verification 'Phase 1: Dashboard Preview Readability' (Protocol in workflow.md) b881d49

## Phase 2: Card Creation Form Logic [checkpoint: 395bb05]
- [x] Task: Implement Custom Choice vs. Hide Button exclusion logic ae0578c
    - [ ] Write failing test in `src/components/CreateCardForm.repro.test.ts` to ensure that selecting "Custom Choice Buttons" automatically unchecks and disables "Hide Choice Button".
    - [ ] Update `src/components/CreateCardForm.svelte` using Svelte runes (`$derived` or `$effect`) to enforce the exclusion logic.
    - [ ] Ensure the checkbox state is correctly synced with the card submission data.
    - [ ] Verify tests pass.
- [x] Task: Conductor - User Manual Verification 'Phase 2: Card Creation Form Logic' (Protocol in workflow.md) 395bb05

## Phase 3: "Send Love" Confirmation and Flow [checkpoint: a1d5f94]
- [x] Task: Implement Confirmation Modal 70fdd9a
    - [ ] Create a new reusable Modal component or extend `ShareModal.svelte` logic for a generic "Confirmation" use case.
    - [ ] Add the "You can only craft one message per account..." disclaimer text.
    - [ ] Write failing test for the confirmation flow: clicking "Send Love" -> Modal Appears -> Clicking "Confirm" -> Service called.
    - [ ] Integrate the modal into `src/components/CreateCardForm.svelte`.
    - [ ] Verify tests pass.
- [x] Task: Implement Auto-Open Share Modal flow 35f5502
    - [ ] Write failing test to ensure that after a successful card creation, the `showShareModal` state (or equivalent) in the parent component is set to true.
    - [ ] Update the success handler in `src/components/CreateCardForm.svelte` to trigger the "Share" modal automatically.
    - [ ] Verify tests pass.
- [x] Task: Conductor - User Manual Verification 'Phase 3: "Send Love" Confirmation and Flow' (Protocol in workflow.md) a1d5f94
