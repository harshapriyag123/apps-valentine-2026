# Implementation Plan: User Authentication and Private Dashboard

## Phase 1: User Data Model & Service [checkpoint: 26b5618]
- [x] Task: Update the data model to support a `users` collection. 2c7dcbe
    - [x] Write failing unit tests for user creation and retrieval. 2c7dcbe
    - [x] Implement `src/lib/auth.ts` to handle user lookup and creation in Firestore. 2c7dcbe
    - [x] Verify tests pass. 2c7dcbe
- [x] Task: Update the `cards` schema to include `senderUsername`. b754a5b
    - [x] Write failing unit tests for card creation with `senderUsername`. b754a5b
    - [x] Update `src/lib/cards.ts` to include the new field. b754a5b
    - [x] Verify tests pass. b754a5b
- [~] Task: Conductor - User Manual Verification 'Phase 1: User Data Model & Service' (Protocol in workflow.md)

## Phase 2: Lightweight Authentication UI [checkpoint: 8461883]
- [x] Task: Implement the Auth state management using Svelte 5 Runes. b11550a
    - [x] Write failing tests for `src/lib/auth.svelte.ts` (handling login/logout/session). b11550a
    - [x] Implement `src/lib/auth.svelte.ts` using `$state`. b11550a
    - [x] Verify tests pass. b11550a
- [x] Task: Create the Login/Signup UI component. d3a982c
    - [x] Implement `src/components/AuthForm.svelte` with a romantic, glassmorphic design. d3a982c
- [x] Task: Integrate AuthForm into the Card Creation flow. b1b5764
    - [x] Update `src/pages/index.astro` to conditionally show the `AuthForm` or `CreateCardForm`. b1b5764
    - [x] Verify the "Login as first step" flow manually. b1b5764
- [~] Task: Conductor - User Manual Verification 'Phase 2: Lightweight Authentication UI' (Protocol in workflow.md)

## Phase 3: Private Dashboard & Security [checkpoint: 7fba88a]
- [x] Task: Secure Firestore with Security Rules. 58cdf7a
    - [x] Draft `firestore.rules` to allow card reading only if `senderUsername` matches. 58cdf7a
    - [x] (Note: Manual step to apply rules in Firebase console or CLI). 58cdf7a
- [x] Task: Update the Status Tracker to fetch user-specific cards. 0b11c76
    - [x] Write failing tests for filtered card subscription. 0b11c76
    - [x] Update `src/lib/dashboard.ts` to query Firestore by `senderUsername`. 0b11c76
    - [x] Verify tests pass. 0b11c76
- [~] Task: Conductor - User Manual Verification 'Phase 3: Private Dashboard & Security' (Protocol in workflow.md)

## Phase 4: Final Polish & UX
- [ ] Task: Implement "Logout" functionality.
    - [ ] Add a logout button to the dashboard.
    - [ ] Verify that logout clears the session and redirects to the login step.
- [ ] Task: Final UX review for mobile responsiveness and skeuomorphic details.
    - [ ] Check all touch targets and animations on mobile emulation.
- [ ] Task: Conductor - User Manual Verification 'Phase 4: Final Polish & UX' (Protocol in workflow.md)
