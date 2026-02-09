# Implementation Plan: Fix Message-Only Card Reply Flow

This plan outlines the steps to introduce a new `replied` status for cards without interactive buttons, ensuring the flow is correctly closed for receivers and reflected for senders.

## Phase 1: Foundation & Types [checkpoint: 67f6735]
- [x] Task: Update `Card` interface and types <!-- 3561db2 -->
    - [ ] Add `replied` to the `status` union in `src/lib/cards.ts`.
    - [ ] Update `updateCardStatus` if necessary (though it uses the type union).
- [ ] Task: Conductor - User Manual Verification 'Phase 1: Foundation & Types' (Protocol in workflow.md)

## Phase 2: Receiver Logic & TDD [checkpoint: db28263]
- [x] Task: TDD - Test `replied` status transition in `ReceiverViewLogic` <!-- bf6cfac -->
    - [ ] Create/Update `src/lib/receiver.test.ts` (or equivalent).
    - [ ] Write a test: Submitting a reply when `hideButtons` is `true` should update status to `replied`.
    - [ ] Write a test: Submitting a reply when `hideButtons` is `false` should NOT change the status (remain `viewed`).
    - [ ] **CRITICAL:** Run tests and verify they fail (Red Phase).
- [x] Task: Implement status update in `ReceiverViewLogic.submitReply` <!-- bf6cfac -->
    - [ ] Modify `submitReply` in `src/lib/receiver.svelte.ts` to check `this.card.hideButtons`.
    - [ ] If `hideButtons` is true, call `updateCardStatus(this.id, 'replied')`.
    - [ ] Run tests and verify they pass (Green Phase).
- [ ] Task: Conductor - User Manual Verification 'Phase 2: Receiver Logic & TDD' (Protocol in workflow.md)

## Phase 3: UI Updates (Receiver & Sender) [checkpoint: f9378c9]
- [x] Task: Update `CardDisplay.svelte` for `replied` status <!-- cd44641 -->
    - [ ] Ensure the component handles the `replied` state similarly to `accepted` or `declined` if necessary, or simply relies on `replySuccess` for the message.
    - [ ] Verify that the "replied" success message is shown and inputs are disabled when status is `replied`.
- [x] Task: Update `StatusTracker.svelte` for Sender Dashboard <!-- bfd02c8 -->
    - [ ] Add `replied: "text-purple-500 font-semibold"` (or similar romantic color) to `statusColors`.
    - [ ] Ensure "Replied" badge or text appears correctly in the card list.
- [ ] Task: Conductor - User Manual Verification 'Phase 3: UI Updates' (Protocol in workflow.md)

## Phase 4: Final Integration & Cleanup [checkpoint: 59ee266]
- [x] Task: Verify end-to-end flow <!-- 21ff242 -->
    - [ ] Create a "Message only" card.
    - [ ] Access it as receiver.
    - [ ] Submit reply.
    - [ ] Verify sender sees "Replied".
- [ ] Task: Conductor - User Manual Verification 'Phase 4: Final Integration & Cleanup' (Protocol in workflow.md)
