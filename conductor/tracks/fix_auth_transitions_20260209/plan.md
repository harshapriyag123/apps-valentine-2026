# Implementation Plan - Fix Auth Transitions & Add Valentine Glow

## Phase 1: Reproduction & Setup [checkpoint: 93e2a3c]
- [x] Task: Create reproduction test case for missing transition [e370be3]
    - [x] Create `src/components/AuthForm.repro.test.ts`
    - [x] Write test to simulate switching from Login to Signup
    - [x] Assert that transition classes/styles are present (or fail if missing)
- [x] Task: Conductor - User Manual Verification 'Phase 1: Reproduction & Setup' (Protocol in workflow.md)

## Phase 2: Implementation [checkpoint: c5760a5]
- [x] Task: Fix Transition Logic in `AuthForm.svelte` [69147]
    - [x] Update `{#key}` block usage to ensure correct component unmounting/mounting
    - [x] Ensure `in:fly` and `out:fly` are configured with absolute positioning to prevent layout jumps (grid stacking)
- [x] Task: Add Valentine Glow Effect [69739]
    - [x] Create new animation variant/class for "Valentine Glow" in `global.css`
    - [x] Apply glow effect to the container during the transition state
- [x] Task: Conductor - User Manual Verification 'Phase 2: Implementation' (Protocol in workflow.md)

## Phase 3: Verification & Polish
- [~] Task: Verify Animations on Mobile
    - [ ] Check for overflow issues
    - [ ] Adjust transition duration/easing if needed for touch devices
- [ ] Task: Run final regression tests
- [ ] Task: Conductor - User Manual Verification 'Phase 3: Verification & Polish' (Protocol in workflow.md)
