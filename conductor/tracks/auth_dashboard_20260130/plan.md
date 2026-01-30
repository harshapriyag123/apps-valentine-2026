# Implementation Plan: User Authentication and Private Dashboard

## Phase 1: User Data Model & Service
- [x] Task: Update the data model to support a `users` collection. 2c7dcbe
    - [x] Write failing unit tests for user creation and retrieval. 2c7dcbe
    - [x] Implement `src/lib/auth.ts` to handle user lookup and creation in Firestore. 2c7dcbe
    - [x] Verify tests pass. 2c7dcbe
- [x] Task: Update the `cards` schema to include `senderUsername`. b754a5b
    - [x] Write failing unit tests for card creation with `senderUsername`. b754a5b
    - [x] Update `src/lib/cards.ts` to include the new field. b754a5b
    - [x] Verify tests pass. b754a5b
- [~] Task: Conductor - User Manual Verification 'Phase 1: User Data Model & Service' (Protocol in workflow.md)

## Phase 2: Lightweight Authentication UI
- [ ] Task: Implement the Auth state management using Svelte 5 Runes.
    - [ ] Write failing tests for `src/lib/auth.svelte.ts` (handling login/logout/session).
    - [ ] Implement `src/lib/auth.svelte.ts` using `$state`.
    - [ ] Verify tests pass.
- [ ] Task: Create the Login/Signup UI component.
    - [ ] Write failing tests for the `AuthForm.svelte` component logic.
    - [ ] Implement `src/components/AuthForm.svelte` with a romantic, glassmorphic design.
    - [ ] Verify tests pass.
- [ ] Task: Integrate AuthForm into the Card Creation flow.
    - [ ] Update `src/pages/index.astro` to conditionally show the `AuthForm` or `CreateCardForm`.
    - [ ] Verify the "Login as first step" flow manually.
- [ ] Task: Conductor - User Manual Verification 'Phase 2: Lightweight Authentication UI' (Protocol in workflow.md)

## Phase 3: Private Dashboard & Security
- [ ] Task: Secure Firestore with Security Rules.
    - [ ] Draft `firestore.rules` to allow card reading only if `senderUsername` matches.
    - [ ] (Note: Manual step to apply rules in Firebase console or CLI).
- [ ] Task: Update the Status Tracker to fetch user-specific cards.
    - [ ] Write failing tests for filtered card subscription.
    - [ ] Update `src/lib/dashboard.ts` to query Firestore by `senderUsername`.
    - [ ] Verify tests pass.
- [ ] Task: Conductor - User Manual Verification 'Phase 3: Private Dashboard & Security' (Protocol in workflow.md)

## Phase 4: Final Polish & UX
- [ ] Task: Implement "Logout" functionality.
    - [ ] Add a logout button to the dashboard.
    - [ ] Verify that logout clears the session and redirects to the login step.
- [ ] Task: Final UX review for mobile responsiveness and skeuomorphic details.
    - [ ] Check all touch targets and animations on mobile emulation.
- [ ] Task: Conductor - User Manual Verification 'Phase 4: Final Polish & UX' (Protocol in workflow.md)
