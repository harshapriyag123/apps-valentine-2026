# Specification: Valentine UI Animations & Transitions

## Overview
Enhance the visual delight and romantic "feel" of the application by adding cinematic transitions during card creation and a magical "unboxing" experience for the receiver.

## Functional Requirements

### 1. CreateCardForm Mobile Transitions
- **Animation Style:** Slide & Heart Fade.
- When switching between "Edit" and "Preview" tabs on mobile:
    - The outgoing view should slide out while the incoming view slides in.
    - A temporary "heart-shaped" fade effect or a central heart pulse should overlay the transition to mask the switch and reinforce the theme.

### 2. Receiver Page "Envelope" Unboxing
- **Initial State:** Instead of showing the card immediately, display a closed, romantic envelope.
- **Interaction:**
    - **Hover Wiggle:** The envelope should gently wiggle when hovered (or periodically on mobile) to invite the user to click.
    - **Opening Sequence (Deliberate Unfolding):** 
        1. User clicks the envelope.
        2. The envelope flap opens smoothly.
        3. The card slowly slides up from inside the envelope.
        4. The envelope container fades out as the card reaches its final position.

## Non-Functional Requirements
- **Animation Priority:**
    1. `svelte-motion` (for complex physics/sequences)
    2. Tailwind CSS animations
    3. Custom CSS keyframes (if necessary)
- **Smoothness:** Transitions must be 60fps.
- **Responsiveness:** The envelope should be appropriately sized for both mobile and desktop screens.
- **Accessibility:** Ensure the "Click to Open" call to action is clear.

## Acceptance Criteria
- [ ] Switching tabs in `CreateCardForm` on mobile triggers the slide & heart fade animation using `svelte-motion`.
- [ ] `ReceiverView` displays an envelope first.
- [ ] Envelope wiggles on hover (wiggle implemented with `svelte-motion` or Tailwind).
- [ ] Clicking the envelope triggers a multi-stage animation: flap opens -> card slides up -> envelope fades.
- [ ] The card is fully interactive after the animation completes.

## Out of Scope
- Adding complex sound effects.
- Redesigning the `CardDisplay` component itself.
