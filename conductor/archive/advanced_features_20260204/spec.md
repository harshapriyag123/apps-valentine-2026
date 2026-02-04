# Specification: Advanced Card Features & Limits

## Overview
This track implements three key enhancements to the Valentine's Day PWA: strict creation limits to emphasize the "one special person" concept, new interactive card capabilities (Custom Buttons and Text Replies), and streamlined sharing via QR codes.

## Functional Requirements

### 1. Single Card Enforcement
*   **Rule:** A user account is strictly limited to creating **one** card.
*   **UX:**
    *   If a user with an existing card visits the "Create" page, they must be redirected to their Dashboard.
    *   The Dashboard should display a message indicating the limit (e.g., "You have crafted your one special Valentine.").

### 2. Modular Message Types
*   **Configuration:** The `CreateCardForm` will remain a single form but gain new optional toggles:
    *   **[Toggle] Custom Choice Buttons:**
        *   When enabled, displays two inputs: "Button 1 Text" (default: "Yes") and "Button 2 Text" (default: "No").
        *   **Receiver View:** Renders these two buttons. Clicking one updates the card status in Firestore (e.g., `response: 'Button 1 Text'`).
    *   **[Toggle] Allow Text Reply:**
        *   When enabled, the Receiver View displays a text area and a "Send Reply" button.
        *   **Receiver View:** Submitting the form saves the text message to the card document in Firestore.

### 3. Dedicated Response Inbox
*   **New View:** A new page or distinct view section (e.g., `/dashboard/inbox` or a modal) for reading replies.
*   **Dashboard Integration:** The main card summary on the Dashboard will link to this Inbox if a text reply has been received.

### 4. QR Code Sharing
*   **Interaction:** Clicking the "Share" or "Copy Link" button on the Dashboard now opens a **Share Modal**.
*   **Modal Content:**
    *   The full Receiver URL.
    *   A "Copy to Clipboard" button.
    *   A dynamically generated QR Code encoding the Receiver URL.

## Non-Functional Requirements
*   **Client-Side Generation:** QR Codes must be generated client-side (e.g., using a library like `qrcode` or `qrious`) to ensure speed and privacy.
*   **Mobile Responsiveness:** The Share Modal and QR code must fit comfortably on mobile screens.

## Acceptance Criteria
*   [ ] **Limit:** A user with an existing card is physically blocked/redirected from creating a second one.
*   [ ] **Custom Buttons:** Sender can define custom button text (e.g., "Date Night?" / "Movie Night?"), and the Receiver sees these exact labels.
*   [ ] **Text Reply:** Receiver can successfully send a text response, which is persisted to Firestore.
*   [ ] **Inbox:** Sender can read the Receiver's text response in the dedicated Inbox view.
*   [ ] **QR Code:** The Share Modal appears with a valid, scannable QR code that redirects to the correct card URL.

## Out of Scope
*   Email notifications for replies.
*   Editing cards after they are sent.
*   Multiple cards per user account.
