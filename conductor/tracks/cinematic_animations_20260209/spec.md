# Specification: Cinematic UI & Animation Enhancements

## Overview
This track focuses on elevating the user experience of the Valentine's PWA through "Cinematic" animations. The goal is to make the application feel more alive, tactile, and romantic by adding motion to key interactions: real-time preview updates, modal transitions, and the "sending" experience. We will employ a hybrid technical approach using `svelte-motion` for complex layout changes and Tailwind CSS for standard transitions.

## Functional Requirements

### 1. Card Preview Reactivity
- **Trigger**: User inputs text or toggles options (checkboxes) in the creation form.
- **Behavior**:
    - **Smooth Transitions**: New or changed elements must fade and slide into place.
    - **Layout Morphing**: The card container must smoothly resize and rearrange its layout to accommodate content changes without jumping.
- **Tech**: Use `svelte-motion` (Motion primitives) to handle layout projection and shared layout animations.

### 2. Ethereal Modals
- **Trigger**: Opening or closing any modal (Share, Confirmation, etc.).
- **Behavior**:
    - **Entrance/Exit**: Gentle fade-in.
    - **Continuous State**: Once open, the modal content should have a subtle, continuous "floating" or "hovering" animation (slow vertical bobbing) to fit the romantic theme.
    - **Backdrop**: Smooth fade-in of the backdrop overlay.
- **Tech**: CSS animations or simple `svelte-motion` variants.

### 3. "Sending" Transition Surprise
- **Trigger**: User clicks the "Send Card" button.
- **Behavior**: The app must randomly select one of three exit animations for the card creation view before showing the success/share screen:
    1.  **Flying Letter**: Card slides up/away as if mailed.
    2.  **Heartbeat & Burst**: Card pulses and explodes into confetti/hearts.
    3.  **Soft Dissolve**: Gentle fade with a throbbing heart loader.
- **Tech**: Logic to randomize the animation class/variant applied to the main container.

## Non-Functional Requirements
- **Performance**: Animations must run at 60fps. layout thrashing should be minimized.
- **Accessibility**: All motion must respect the user's `prefers-reduced-motion` system setting. If enabled, animations should be disabled or replaced with simple opacity fades.
- **Responsiveness**: Animations must work fluidly on both mobile and desktop.

## Acceptance Criteria
- [ ] Typing in the message field causes the preview text to update smoothly, with the card expanding naturally.
- [ ] Toggling a checkbox (e.g., "Add Confetti") smoothly transitions the element into the preview.
- [ ] Opening the "Share" modal triggers a fade-in and the modal gently floats while open.
- [ ] Clicking "Send" triggers one of the three random animations before the "Card Created" screen appears.
- [ ] Enabling "Reduce Motion" in OS settings simplifies all above effects to instant or simple fades.
