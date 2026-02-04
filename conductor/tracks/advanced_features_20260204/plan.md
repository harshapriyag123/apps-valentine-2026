# Implementation Plan: Advanced Card Features & Limits

## Phase 1: Single Card Enforcement [checkpoint: afcdb9a]
- [x] Task: Update Card Service to prevent multiple cards. feff8bc
    - [ ] Write failing test in `src/lib/cards.test.ts` to ensure `createCard` fails if a card already exists for the user.
    - [ ] Implement check in `src/lib/cards.ts` using a Firestore query or by checking the local session state.
    - [ ] Verify tests pass.
- [x] Task: Implement redirection logic on the Home page. 1897cc6
    - [ ] Write failing test for `src/pages/index.astro` (or relevant state controller) to verify redirect when a card already exists.
    - [ ] Update `src/pages/index.astro` logic to redirect to the Dashboard if `user.hasCard` is detected.
    - [ ] Verify tests pass.
- [ ] Task: Conductor - User Manual Verification 'Phase 1: Single Card Enforcement' (Protocol in workflow.md)

## Phase 2: Data Model & Card Creation (Custom Buttons & Replies) [checkpoint: 1438ae9]
- [x] Task: Update Card Schema and Type definitions. cae8585
    - [ ] Update `Card` interface in `src/lib/cards.ts` to include `useCustomButtons` (boolean), `button1Text` (string), `button2Text` (string), `allowReply` (boolean), and `replyText` (string).
    - [ ] Write failing test for card creation with these new fields.
    - [ ] Verify tests pass.
- [x] Task: Enhance `CreateCardForm.svelte` with new feature toggles. 8c08a12
    - [ ] Add Svelte Runes (`$state`) for the new toggles and text inputs in `CreateCardForm.svelte`.
    - [ ] Implement UI for "Custom Choice Buttons" toggle and its nested text inputs.
    - [ ] Implement UI for "Allow Text Reply" toggle.
    - [ ] Write/Update tests for `CreateCardForm.svelte` to ensure these new fields are correctly bound and sent to the create service.
    - [ ] Verify tests pass.
- [ ] Task: Conductor - User Manual Verification 'Phase 2: Data Model & Card Creation' (Protocol in workflow.md)

## Phase 3: Receiver Interaction (Custom Buttons & Text Reply)
- [x] Task: Implement Custom Buttons in `ReceiverView.svelte`. 30d8ed8
    - [ ] Write failing test in `src/components/ReceiverView.repro.test.ts` to ensure custom button labels are displayed when enabled.
    - [ ] Update `ReceiverView.svelte` to conditionally render labels from the card data.
    - [ ] Ensure button clicks save the specific custom label as the response in Firestore.
    - [ ] Verify tests pass.
- [x] Task: Implement Reply Form in `ReceiverView.svelte`. 207274f
    - [ ] Write failing test for the reply text area and submission process.
    - [ ] Add a text area and "Send Reply" button to `ReceiverView.svelte`, visible only if `allowReply` is true.
    - [ ] Implement the `submitReply` logic to update the card document in Firestore.
    - [ ] Verify tests pass.
- [ ] Task: Conductor - User Manual Verification 'Phase 3: Receiver Interaction' (Protocol in workflow.md)

## Phase 4: Share Modal & QR Code
- [x] Task: Add QR Code library. fd2305b
    - [ ] Add `qrcode` (or `qrious`) package using `npm install`.
    - [ ] Verify installation in `package.json`.
- [x] Task: Create `ShareModal.svelte` component. ee99241
    - [x] Implement a glassmorphic modal displaying the link and a canvas/image for the QR code.
    - [x] Use a Svelte `$effect` to generate the QR code dynamically when the modal is active.
    - [x] Include a "Copy Link" button with visual feedback.
    - [ ] Write unit tests for the `ShareModal.svelte` visibility and content.
- [x] Task: Integrate `ShareModal` into `StatusTracker.svelte`. ee99241
    - [x] Replace the simple "Copy" action in `StatusTracker.svelte` with a trigger for the `ShareModal`.
    - [x] Verify the flow manually.
- [ ] Task: Conductor - User Manual Verification 'Phase 4: Share Modal & QR Code' (Protocol in workflow.md)

## Phase 5: Response Inbox
- [x] Task: Implement Inbox logic in `src/lib/dashboard.ts`. 4dcf74a
    - [ ] Write failing test for retrieving the `replyText` field from a card.
    - [ ] Ensure the dashboard state correctly reflects the presence of a reply.
    - [ ] Verify tests pass.
- [x] Task: Create `InboxView.svelte` or Dashboard detail section. 4dcf74a
    - [x] Create a romantic, focused UI for reading the text response.
    - [x] Add a "View Reply" link/button to the card summary in `StatusTracker.svelte`.
    - [ ] Write tests for the Inbox component rendering and data display.
- [ ] Task: Conductor - User Manual Verification 'Phase 5: Response Inbox' (Protocol in workflow.md)
