# Implementation Plan: Fix Reactivity Anti-Patterns in Svelte 5 Components

## Phase 1: Audit and Replication
- [~] Task: **Audit Targeted Components**
    - [ ] Inspect `MainApp.svelte`, `StatusTracker.svelte`, and `AuthForm.svelte` for variables captured by classes during initialization.
    - [ ] List all affected components and instances.
- [~] Task: **Create Reproduction Tests**
    - [x] Create `src/components/CreateCardForm.repro.test.ts` to simulate prop changes and verify `CreateCardFormState` fails to update.
    - [x] Create `src/components/ReceiverView.repro.test.ts` to simulate `id` changes and verify `CardState`/`Logic` fail to update.
- [ ] Task: Conductor - User Manual Verification 'Phase 1: Audit and Replication' (Protocol in workflow.md)

## Phase 2: Fix Reported Components
- [x] Task: **Refactor CreateCardForm.svelte** [checkpoint: 78a9c1]
    - [x] Implement `$derived` initialization for the `form` instance.
    - [x] Add explanatory comments regarding the reactive initialization pattern.
- [x] Task: **Refactor ReceiverView.svelte** [checkpoint: 78a9c1]
    - [x] Implement `$derived` initialization for `cardState` and `logic`.
    - [x] Ensure `card` derivation remains efficient.
    - [x] Add explanatory comments.
- [x] Task: **Verify Fixes (Green Phase)** [checkpoint: 78a9c1]
    - [x] Run reproduction tests and ensure they pass with the new implementation.
- [ ] Task: Conductor - User Manual Verification 'Phase 2: Fix Reported Components' (Protocol in workflow.md)

## Phase 3: Audit and Fix Secondary Components
- [x] Task: **Refactor Audited Components** [checkpoint: 78a9c1]
    - [x] Apply the same derived initialization pattern to `MainApp.svelte`, `StatusTracker.svelte`, or `AuthForm.svelte` if issues were found during audit. (Audit complete: no issues found).
- [x] Task: **Final Verification & Cleanup** [checkpoint: 78a9c1]
    - [x] Run all project tests (`bun test`) to ensure zero regressions.
    - [x] Verify zero `state_referenced_locally` warnings in the build/dev logs.
- [x] Task: Conductor - User Manual Verification 'Phase 3: Audit and Fix Secondary Components' (Protocol in workflow.md) [checkpoint: 78a9c1]
