# Specification: Auto-Open Share Modal (QR Code) on Card Creation

## Overview
Currently, when a user successfully creates a Valentine's card, they are redirected to the "Sent Cards" view (StatusTracker), but the Share Modal (which contains the QR code and link) does not open automatically. The user must manually click the "Share" button to see it. This track aims to ensure the Share Modal opens immediately upon successful creation to provide a seamless sharing experience.

## Functional Requirements
1. **Auto-Trigger on Success:** Immediately after a card is successfully saved to Firestore and the ID is returned, the `ShareModal` must be opened.
2. **Persistence across View Transitions:** Ensure that the modal state (managed in `uiState`) is correctly handled even as the `CreateCardForm` unmounts and the `StatusTracker` mounts.
3. **Manual Share Trigger:** Maintain the existing functionality where clicking "Share" in the `StatusTracker` opens the modal for the corresponding card.

## Non-Functional Requirements
- **Reliability:** The modal must open consistently regardless of how fast the Firestore listener updates the local `hasCard` state.
- **Visual Smoothness:** The transition from the "Sending..." state to the Share Modal should feel intentional and not jarring.

## Acceptance Criteria
- [ ] After clicking "Send Love" and confirming, the `ShareModal` appears automatically once the card is created.
- [ ] The `ShareModal` displays the correct QR code and URL for the newly created card.
- [ ] Closing the modal allows the user to see the `StatusTracker` with their sent card.
- [ ] Clicking "Share" on an existing card in the `StatusTracker` still opens the modal correctly.

## Out of Scope
- Redesigning the `ShareModal` or `StatusTracker` UI.
- Modifying the QR code generation logic.
