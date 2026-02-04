# Specification: Fix Reactivity Anti-Patterns in Svelte 5 Components

## Overview
Address "state_referenced_locally" warnings in Svelte 5 components where reactive props are captured by class instances during initialization, preventing updates when props change.

## Functional Requirements
1.  **Fix `CreateCardForm.svelte`**: Ensure `CreateCardFormState` is reactively initialized or updated when `authState` changes.
2.  **Fix `ReceiverView.svelte`**: Ensure `CardState` and `ReceiverViewLogic` react to changes in `id` or `initialCard`.
3.  **Audit & Fix Targeted Components**: 
    - Check `MainApp.svelte`, `StatusTracker.svelte`, and `AuthForm.svelte` for similar patterns.
    - Apply the "Derived Initialization" pattern where class instances capture reactive props.

## Non-Functional Requirements
- **Svelte 5 Runes**: Adhere strictly to `$state`, `$derived`, and `$props` best practices.
- **Documentation**: Add brief inline comments to refactored code explaining the reactive initialization pattern to prevent future regressions.

## Acceptance Criteria
- Zero `state_referenced_locally` warnings in the Svelte compiler/linter for audited files.
- Components correctly reflect changes when their props are updated (verified by manual inspection or existing tests).

## Out of Scope
- Global state management refactoring.
- Implementing new features or UI changes.
