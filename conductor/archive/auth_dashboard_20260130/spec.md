# Track Specification: User Authentication and Private Dashboard

## Overview
Introduce a lightweight authentication system where users log in or sign up using only a username (and a sender name for new accounts). This ensures that senders have a private experience and can only track the cards they have personally created.

## Functional Requirements
- **Lightweight Authentication:**
  - Login requires only a `username`.
  - If a `username` does not exist, the user is prompted to provide a `senderName` to sign up.
  - User sessions are maintained in volatile memory (session-only), meaning refreshes will require a re-login.
- **Integrated Auth Flow:**
  - The Card Creation form will now begin with an authentication step.
  - A user must be "logged in" to proceed to the message creation and theme selection.
- **Private Dashboard (Status Tracker):**
  - The dashboard will only display cards where the `senderUsername` matches the currently logged-in user.
- **Firestore Data Model:**
  - `users` collection: `username` (ID), `senderName`, `createdAt`, `lastLoginAt`.
  - `cards` collection: Update schema to include `senderUsername` for filtering.

## Security Requirements
- **Firestore Security Rules:** Implement rules to restrict `read` access to the `cards` collection such that a user can only query documents where `senderUsername` matches their own.
- **Data Integrity:** Prevent users from creating cards under usernames other than their own authenticated session.

## Acceptance Criteria
- Users can log in with a username.
- New users can sign up by providing a username and sender name.
- The Status Tracker only shows cards sent by the logged-in user.
- Refreshing the page clears the session and returns the user to the login step.
- Firestore rules successfully block unauthorized attempts to read cards from other users.

## Out of Scope
- Password-based authentication or OAuth.
- Persistent sessions (localStorage/Cookies).
- Profile editing after signup.
