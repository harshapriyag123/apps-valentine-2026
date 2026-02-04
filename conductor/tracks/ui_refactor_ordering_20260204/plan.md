# Implementation Plan: UI Refactor - Card Option Ordering

## Phase 1: Form UI Refactor
- [x] Task: Reorder and Add Dependency to Toggles in `CreateCardForm.svelte`. b395820
    - [ ] Update `CreateCardForm.svelte` to move the "Hide Choice Buttons" toggle above "Custom Choice Buttons".
    - [ ] Update the "Custom Choice Buttons" checkbox to be disabled when `form.hideButtons` is true.
    - [ ] Update the conditional rendering of the button text inputs to only show if `form.useCustomButtons` is true AND `form.hideButtons` is false.
    - [ ] Verify visual order and interaction logic manually in the browser.
- [ ] Task: Conductor - User Manual Verification 'Phase 1: Form UI Refactor' (Protocol in workflow.md)
