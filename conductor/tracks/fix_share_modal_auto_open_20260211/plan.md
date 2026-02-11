# Implementation Plan: Auto-Open Share Modal on Card Creation

## Phase 1: Reproduction & Setup [checkpoint: 8fab6cd]
- [x] Task: Create reproduction test case for auto-open share modal
    - [x] Create `src/components/AutoOpenShareModal.repro.test.ts`
    - [x] Write a test that mocks `createCard` to return a success ID
    - [x] Simulate calling `form.submit()`
    - [x] Assert that `uiState.isShareModalOpen` becomes `true`
- [x] Task: Conductor - User Manual Verification 'Phase 1: Reproduction & Setup' (Protocol in workflow.md)

## Phase 2: Implementation
- [ ] Task: Move auto-open logic to `CreateCardFormState`
    - [ ] Import `uiState` in `src/lib/create-card.svelte.ts`
    - [ ] Update `submit()` method to call `uiState.openShareModal(id)` immediately after `this.success = id`
    - [ ] Ensure this happens before any potential component unmounting triggered by `dashboard.hasCard`
- [ ] Task: Clean up redundant component logic
    - [ ] Remove the success-tracking `$effect` from `src/components/CreateCardForm.svelte` to avoid duplicate calls or lifecycle issues
- [ ] Task: Conductor - User Manual Verification 'Phase 2: Implementation' (Protocol in workflow.md)

## Phase 3: Verification & Polish
- [ ] Task: Verify fix with automated tests
    - [ ] Run `bun test src/components/AutoOpenShareModal.repro.test.ts`
    - [ ] Ensure all tests pass
- [ ] Task: Regression test for manual share button
    - [ ] Ensure clicking "Share" in `StatusTracker.svelte` still works as expected
- [ ] Task: Conductor - User Manual Verification 'Phase 3: Verification & Polish' (Protocol in workflow.md)
