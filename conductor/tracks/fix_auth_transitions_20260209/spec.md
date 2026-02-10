# Specification: Fix Auth Page Transitions & Add Valentine Glow

## Overview
This track addresses a bug where the transition animation between the Login and Signup forms in `AuthForm.svelte` is not triggering or appearing correctly. Additionally, it introduces a "Valentine-themed" pink glow effect to enhance the visual feedback during this switch.

## Functional Requirements
- **Transition Fix:** Ensure that when `authState.isSignupRequired` toggles, the current form slides out and the new form slides in smoothly using Svelte transitions.
- **Valentine Glow Effect:** Implement a soft pink glow or pulse effect that activates during the transition period to signify the "occasion."
- **Layout Stability:** Prevent any "snapping" or layout jumps by ensuring the container handles the entering and exiting elements correctly (e.g., using absolute positioning for exiting elements).

## Non-Functional Requirements
- **Performance:** Animations must be hardware-accelerated (using transform and opacity).
- **Aesthetic Consistency:** The glow effect must align with the project's "Lavender Blush" and "Vivid Pink" color palette.
- **Responsiveness:** Transitions must work smoothly on mobile devices without causing horizontal overflow.

## Acceptance Criteria
- [ ] Switching from Login to Signup shows a smooth slide/fade animation.
- [ ] Switching back from Signup to Login (Cancel) shows a smooth animation in the reverse direction.
- [ ] A visible soft pink glow or pulse effect appears during the transition.
- [ ] No layout shifting or abrupt jumps are observed during the transition.

## Out of Scope
- Modifying the actual authentication or signup logic in `auth.svelte.ts`.
- Changes to the `MainApp.svelte` layout beyond ensuring it supports the `AuthForm` transition.
