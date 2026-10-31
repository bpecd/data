# Additional Bill and Payable Transactions Implementation Plan

> **For agentic workers:** Execute the tasks in order in this session. Preserve the user's existing changes in `homme.html`.

**Goal:** Add signed Additional Bill and Payable transaction entries with independent summary totals.

**Architecture:** Keep the feature in `homme.html`, using the existing panel toggles and Google Forms submission endpoint. Store zero in the numeric Amount field and encode category plus signed value in Description; a shared parser will drive table display and the two summary totals.

**Tech Stack:** HTML, CSS already in `homme.html`, vanilla JavaScript, existing Google Forms endpoint.

## Global Constraints

- Store the row's numeric Amount as `0`.
- Add records a positive value; Remove records a negative value.
- Store the reason field value in Reason.
- Calculate each summary independently by summing signed values for matching category descriptions.
- Keep changes in `homme.html`, preserve existing local edits, and avoid changing the spreadsheet schema or other transaction types.
- Do not change or delete spreadsheet data as part of implementation.
- Do not add or run tests; inspect the implementation for consistent IDs, event wiring, signed amount parsing, and isolation from existing amount calculations.

---

## File Structure

- Modify `homme.html`: add the button and form, wire its two actions to the existing form endpoint, parse description-based values for the table, and update the two summary spans from loaded transactions.
- No other files or data sources change. The design and implementation plan live under `docs/superpowers/`.

### Task 1: Add the adjustment entry panel and submit actions

**Files:**
- Modify: `homme.html` near the existing entry buttons and `buttonsGiven` panel.
- Modify: `homme.html` inside the `DOMContentLoaded` panel-toggle setup and near the Petty Cash submit handlers.

**Interfaces:**
- Produce `submitBillPayableAdjustment(direction)`, where `direction` is `1` for Add and `-1` for Remove.
- The form uses `adjustmentType`, `adjustmentReason`, and `adjustmentAmount` inputs, plus `adjustmentAddBtn` and `adjustmentRemoveBtn` actions.

- [x] Add an `Additional / Payable` button adjacent to `givenBtn`. Add a hidden `buttonsAdjustment` panel with a back button matching the other panels, a select with exactly `Additional Bill` and `Payable`, reason and amount inputs, and separate Add and Remove buttons.
- [x] Wire the new button using the existing panel pattern: show `buttonsAdjustment`, hide the other panels and entry buttons; wire the back control consistent with existing `location.reload()` back controls.
- [x] Add `submitBillPayableAdjustment(direction)`. Read the form fields, trim the reason, parse the formatted amount after removing commas, and stop with visible feedback unless category is one of the two allowed values, reason is non-empty, and amount is finite and greater than zero.
- [x] Build Description as `${category} #${direction === 1 ? "+" : "-"}${formattedPositiveAmount}`. Submit Description, Reason, and `0` for the numeric Amount using `cldata.formid`, `sdentry`, `srentry`, and `saentry`, matching the Petty Cash `FormData` and fetch pattern.
- [x] Disable both action buttons during submission. On completion, show the page's existing success feedback and reload after the same delay as Petty Cash; on fetch rejection, show the existing failure feedback and restore both buttons for retry.
- [x] Wire Add to `submitBillPayableAdjustment(1)` and Remove to `submitBillPayableAdjustment(-1)`.

### Task 2: Show signed description amounts and calculate the summaries

**Files:**
- Modify: `homme.html` near `formatNumber2` and `displayTransaction`.

**Interfaces:**
- Produce `parseBillPayableAdjustment(description)`, returning `{ category, amount }` for valid adjustment descriptions and `null` for all other descriptions.
- Use the parser result in `displayTransaction(rows)` and for summary rendering.

- [x] Add a parser that matches only `Additional Bill` or `Payable`, followed by `#`, a signed decimal/integer amount with optional grouping commas; remove commas and return the parsed finite amount.
- [x] In `displayTransaction`, retain each row's original numeric `Amount` in `transactions`. For matching adjustment descriptions only, render `+ ৳<formatted>` or `- ৳<formatted>` using the parsed description amount and neutral styling, following the existing Petty Cash special case. Leave all other rows' display unchanged.
- [x] After transaction loading, sum parsed entries independently by category, including negative removals, then set `abtotal` and `payab` with `formatNumber2` and the existing BDT summary convention.
- [x] Confirm the new summaries do not alter `calculateAndDisplayPaymentDue`, `calculateAndDisplayInHand`, or other calculations that read the sheet's numeric Amount.

### Task 3: Inspect the completed change

**Files:**
- Inspect: `homme.html` and the diff for that file.

- [x] Inspect the final diff to confirm the two existing local edits (Agreement label and summary markup) remain intact and only the requested feature has been added.
- [x] Check that every new element ID is unique and referenced consistently, the submit handlers disable and restore both actions correctly, and the parser accepts positive and negative grouped amounts.
- [x] Trace the page's existing row rendering and summary paths to confirm ordinary transactions and Petty Cash keep their existing behavior and the numeric Amount submitted for new rows is exactly `0`.

