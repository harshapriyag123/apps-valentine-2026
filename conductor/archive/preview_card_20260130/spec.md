# Specification: Real-time Card Preview

## Overview
This feature introduces a live, high-fidelity preview to the card creation process. Senders will be able to see an exact replica of what the recipient will see, updating in real-time as they fill out the form.

## Problem Statement
Currently, senders must "send blindly," only seeing the final result after the card is created. Providing a preview reduces anxiety and allows for creative adjustments to the message and theme before finalizing.

## Functional Requirements
- **Live Sync:** All form fields (Receiver Name, Message, Theme) must update the preview instantly.
- **High Fidelity:** The preview must look identical to the final `ReceiverView`, including glassmorphism, background animations (floating hearts), and typography.
- **Responsive Layout:**
    - **Desktop:** A side-by-side (split-screen) layout showing the form and preview simultaneously.
    - **Mobile:** A tabbed interface allowing users to toggle between "Edit" and "Preview" views.
- **Persistent Action:** The "Send Love" button must remain visible and accessible at all times on mobile, regardless of the active tab.
- **Non-functional Preview Buttons:** The "Yes" and "No" buttons in the preview should be visible for layout purposes but non-functional/disabled.

## Non-Functional Requirements
- **Performance:** Preview updates must be smooth and not cause lag in the input fields.
- **Consistency:** Use shared components between the Preview and the `ReceiverView` to ensure 100% visual parity.

## Acceptance Criteria
- [ ] Typing in the "To" or "Message" fields updates the preview text in real-time.
- [ ] Changing the "Theme" dropdown updates the preview's color scheme and styling immediately.
- [ ] On mobile, switching to the "Preview" tab shows the full card experience.
- [ ] On mobile, the "Send Love" button is anchored to the bottom and visible in both tabs.
- [ ] Visual styling in the preview matches the `ReceiverView` exactly.

## Out of Scope
- Making the preview buttons interactive (e.g., testing the "No" button movement).
- Adding a "Share Preview" feature.
