# Specification: Fix Card Creation Failure with Hidden Buttons

## Overview
This track addresses a bug where card creation consistently fails with an error message ("Failed to create card, try again") whenever the "Hide Choice Button" option is enabled in the creation form.

## Functional Requirements

### 1. Fix Creation Logic
- Investigate and resolve the failure in `createCard` service when `hideButtons` is set to `true`.
- Ensure that cards can be successfully created by stripping `undefined` fields before sending to Firestore.

### 2. Validation Consistency (Acceptable States)
The form must be considered valid in the following states:
1. **Hide Choice Button** is Checked AND **Allow Text Reply** is Checked (Requirement: If buttons are hidden, text reply MUST be enabled).
2. **Hide Choice Button** is Unchecked AND **Allow Text Reply** is Checked.
3. **Custom Choice Button** is Checked AND **Allow Text Reply** is Unchecked.
4. **Custom Choice Button** is Unchecked AND **Allow Text Reply** is Unchecked.
5. **All options** are Unchecked.

### 3. Mutual Exclusivity
- Ensure the UI and state maintain the rule that "Hide Choice Button" and "Custom Choice Button" are mutually exclusive.

## Non-Functional Requirements
- The user should receive a success state and be redirected/shown the share modal as expected even when buttons are hidden.

## Acceptance Criteria
- [ ] A card can be successfully created with "Hide Choice Button" enabled.
- [ ] A card can be successfully created with both "Hide Choice Button" and "Allow Text Reply" enabled.
- [ ] No regression in standard card creation (with default or custom buttons).

## Out of Scope
- Changing the UI layout of the creation form.
- Modifying the Receiver View logic for how hidden buttons are rendered (this track focuses on the creation failure).
