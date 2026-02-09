# Specification: UI Enhancements and Flow Fixes

## Overview
This track addresses several UI/UX improvements and bug fixes to the Valentine's Day PWA, focusing on readability, form logic, and user guidance during the card creation process.

## Functional Requirements

### 1. Preview Card Readability
- Increase the font size for all text elements within the card preview displayed after a user signs in. This includes headers, status labels, recipient names, and button text within the preview container.

### 2. Form Logic: Custom Choice vs. Hide Button
- In the card creation form, if the user selects "Custom Choice Buttons":
    - The "Hide Choice Button" checkbox must be automatically **unchecked**.
    - The "Hide Choice Button" checkbox must be **disabled** (preventing the user from hiding buttons if they've gone through the effort of customizing them).

### 3. "Send Love" Disclaimer
- Implement a confirmation modal that appears when the user clicks the "Send Love" button.
- The modal must state: "You can only craft one message per account. Are you sure you want to send this?"
- The message should only be submitted to Firestore *after* the user confirms in this modal.

### 4. Post-Creation Flow
- Upon successful creation (submission) of a card, the application must automatically trigger the "Share" modal (which contains the QR code and link).
- This replaces the need for the user to manually click a "Share" or "Show QR" button after creation.

## Non-Functional Requirements
- Maintain the existing "Lavender Blush" and "Vivid Pink" aesthetic.
- Ensure the confirmation modal is responsive and follows the project's glassmorphism/tactile design.

## Acceptance Criteria
- [ ] Text in the dashboard preview card is significantly more legible on both mobile and desktop.
- [ ] Selecting "Custom Choice" in the creation form disables and unchecks "Hide Choice Button".
- [ ] Clicking "Send Love" opens a confirmation modal; clicking "Cancel" stops submission; clicking "Confirm" submits and continues.
- [ ] The Share/QR modal opens automatically immediately after a successful "Send Love" confirmation.

## Out of Scope
- Changing the overall layout of the dashboard beyond font size adjustments.
- Modifying the Receiver View (this track focuses on the Sender's creation and preview experience).
