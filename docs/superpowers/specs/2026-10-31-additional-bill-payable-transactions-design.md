# Additional Bill and Payable Transactions

## Goal

Add a transaction workflow to `homme.html` for tracking Additional Bill and Payable adjustments. Each category has its own signed total in the existing summary area.

## User interface

- Add a button beside the existing transaction entry buttons to open the new form.
- The form contains a category selector (`Additional Bill` or `Payable`), a reason field, an amount field, and separate Add and Remove actions.
- Reuse the existing form styling, success/error feedback, and submission behavior.

## Transaction behavior

- Submit through the selected client's existing Google Forms endpoint and entry IDs.
- Store the row's numeric Amount as `0`.
- Encode the category and signed value in Description using a stable, parseable format, for example `Additional Bill #+1,000` or `Payable #-250`.
- Add records a positive value; Remove records a negative value. The user enters a positive amount in either case.
- Store the reason field value in Reason.
- Display the signed value from Description in the transaction table, even though the sheet Amount is zero.
- Calculate each summary independently by summing signed values for matching category descriptions. Existing transaction calculations should continue to use the row's numeric Amount unless they already have special handling for description-based values.

## Validation and feedback

- Require a category, a non-empty reason, and a positive finite amount.
- Prevent repeat submissions while a request is in progress.
- Reuse the page's current completion and error feedback and reload behavior after submission.

## Scope

Keep changes in `homme.html`, preserve existing local edits, and avoid changing the spreadsheet schema or other transaction types.

## Verification

Inspect the resulting HTML and JavaScript for consistent IDs, event wiring, signed amount parsing, and isolation from existing amount calculations. Do not change or delete spreadsheet data as part of implementation.
