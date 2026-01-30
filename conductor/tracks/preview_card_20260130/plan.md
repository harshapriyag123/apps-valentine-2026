# Implementation Plan: Real-time Card Preview

## Phase 1: Shared Component Refactoring [checkpoint: 404c1d4]
To ensure 100% visual parity between the preview and the final card, we'll extract the core card UI into a reusable component.

- [x] Task: Create a `CardDisplay` component for shared usage. [7ed9c2a]
    - [x] Create `src/components/CardDisplay.svelte` to hold the card's visual structure.
    - [x] Implement props to accept card data (sender, receiver, message, theme, status).
    - [x] Add a `previewMode` prop to disable button interactions.
- [x] Task: Update `ReceiverView.svelte` to use `CardDisplay`. [7ed9c2a]
    - [x] Replace the inline card HTML with the new component.
    - [x] Verify existing functionality (Yes/No buttons, status updates) still works via tests.
- [x] Task: Conductor - User Manual Verification 'Phase 1: Shared Component Refactoring' (Protocol in workflow.md) [7ed9c2a]

## Phase 2: Preview Implementation & Desktop Layout [checkpoint: bfd31ae]
Implement the real-time synchronization and the split-screen view for desktop.

- [x] Task: Update `CreateCardForm.svelte` with a split-screen layout. [52ea1c6]
    - [x] Wrap the form and the new `CardDisplay` in a flex container (hidden preview on mobile for now).
    - [x] Pass the live form state (`form.sender`, `form.receiver`, etc.) into `CardDisplay`.
- [x] Task: Verify real-time updates. [52ea1c6]
    - [x] Fix theme styling in `CardDisplay.svelte` (specificity issue).
    - [x] Enhance theme differentiation (Fonts & Colors).
    - [x] Write tests to ensure form changes are reflected in the state correctly.
    - [x] Manually verify that typing in the form updates the preview instantly on desktop.
- [x] Task: Conductor - User Manual Verification 'Phase 2: Preview Implementation & Desktop Layout' (Protocol in workflow.md) [52ea1c6]

## Phase 3: Mobile Responsive Tabs [checkpoint: pending]
Add the tabbed interface for mobile and ensure the "Send Love" button is always accessible.

- [x] Task: Implement Mobile Tab UI in `CreateCardForm.svelte`. [6b1889d]
    - [x] Create a "Edit / Preview" toggle visible only on small screens.
    - [x] Use Svelte state to manage the active tab.
- [x] Task: Implement Sticky "Send Love" Button. [6b1889d]
    - [x] Move the "Send Love" button out of the scrollable form container.
    - [x] Position it as a fixed/sticky element at the bottom of the screen on mobile.
- [x] Task: Final UX Polish. [6b1889d]
    - [x] Ensure smooth transitions between tabs.
    - [x] Verify touch targets and layout on mobile emulation.
- [x] Task: Conductor - User Manual Verification 'Phase 3: Mobile Responsive Tabs' (Protocol in workflow.md) [6b1889d]
