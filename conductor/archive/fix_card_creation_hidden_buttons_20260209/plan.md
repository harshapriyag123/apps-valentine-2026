# Implementation Plan: Fix Card Creation Failure with Hidden Buttons

## Phase 1: Bug Reproduction & Error Handling [checkpoint: ]
- [x] Task: Confirm bug with unit tests
    - [x] Add failing test case to `src/lib/cards.test.ts` that passes explicit `undefined` values.
    - [x] Update `src/lib/create-card.repro.test.ts` to simulate the full `CreateCardFormState.submit()` flow and confirm it fails when service throws.
- [x] Task: Improve Error Reporting in `CreateCardFormState` 4baff4e
    - [x] Update `submit()` method in `src/lib/create-card.svelte.ts` to capture and display the specific error message if available, rather than a generic one.
    - [x] Verify that tests now show more descriptive errors.
- [ ] Task: Conductor - User Manual Verification 'Phase 1: Bug Reproduction & Error Handling' (Protocol in workflow.md)

## Phase 2: Fix Data Preparation & Validation Rules [checkpoint: 8d7af81]
- [x] Task: Update `isValid` in `src/lib/create-card.svelte.ts` 8d7af81
    - [x] Implement the rule: if `hideButtons` is true, `allowReply` must be true.
    - [x] Update `src/lib/create-card.repro.test.ts` to verify all acceptable state combinations.
- [x] Task: Refactor `submit()` to avoid `undefined` values 8d7af81
    - [x] Modify the `createCard` call in `src/lib/create-card.svelte.ts` to only include `button1Text` and `button2Text` if `useCustomButtons` is `true`.
    - [x] Verify that the `cards.test.ts` failing case now passes.
- [x] Task: Conductor - User Manual Verification 'Phase 2: Fix Data Preparation & Validation Rules' (Protocol in workflow.md) 8d7af81

## Phase 3: Final Verification & Cleanup [checkpoint: 8d7af81]
- [x] Task: Run full test suite 8d7af81
    - [x] Execute `bun test` to ensure no regressions in card creation or dashboard functionality.
- [x] Task: Conductor - User Manual Verification 'Phase 3: Final Verification & Cleanup' (Protocol in workflow.md) 8d7af81
