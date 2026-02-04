# Specification: UI Refactor - Card Option Ordering

## Overview
This chore refactors the `CreateCardForm` UI to improve the logical flow of card interaction settings. It swaps the visual order of the "Custom Choice Buttons" and "Hide Choice Buttons" toggles and adds a dependency between them.

## Functional Requirements

### 1. Toggle Reordering
*   **Location:** `CreateCardForm.svelte`.
*   **Change:** The "Hide Choice Buttons" toggle must now appear **above** the "Custom Choice Buttons" toggle.

### 2. Logical Dependency
*   **Behavior:** If the "Hide Choice Buttons" toggle is checked (Enabled), the "Custom Choice Buttons" toggle must be **disabled** and its associated text inputs (Button 1/2 Text) must be hidden.
*   **UX:** This prevents the user from configuring button labels that will ultimately be hidden, reducing confusion.

## Non-Functional Requirements
*   **Visual Consistency:** Maintain existing glassmorphic styling and transition animations.

## Acceptance Criteria
*   [ ] In the creation form, "Hide Choice Buttons" is listed first among the interaction toggles.
*   [ ] Checking "Hide Choice Buttons" grays out or disables the "Custom Choice Buttons" checkbox.
*   [ ] If "Hide Choice Buttons" is active, any open "Custom Choice Button" text inputs are collapsed/hidden.

## Out of Scope
*   Changes to the Firestore data model.
*   Changes to the `ReceiverView` or `Dashboard`.
