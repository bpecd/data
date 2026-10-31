# Editable Print Invoice Popup

## Goal

Let an admin review and edit invoice details before opening the print invoice for a transaction.

## User flow

- Clicking a transaction's Print Receipt button opens a modal styled like the existing email confirmation popup.
- The modal is prefilled from the selected transaction and current project data.
- Editable fields: client name, contact, address, status, transaction date, reason, payment method, total funding, total due, and transaction amount.
- Cancel closes the modal and discards edits.
- Print Invoice uses the edited values to create the existing `printTransactionData` payload and opens `invo.html`.
- Edits apply to that invoice only; do not update the transaction sheet or stored transaction row.

## Data handling

- Prefill the amount from the existing description-based value for Additional Bill / Payable transactions, using its absolute value as the editable invoice amount.
- Keep the existing transaction date, client state, funding, and due as the modal defaults.
- Validate numeric amount, funding, and due values before printing; show validation feedback in the modal and do not open the invoice when invalid.

## Scope

- Apply the popup to both `F:\Building_Plan\data\homme.html` and `F:\Building_Plan\BD cons\data\homme.html`.
- Preserve existing email confirmation behavior and each page's transaction submission flow.
- Do not modify spreadsheet data or transaction rows.

## Verification

- Inspect both print handlers and confirm they open the edit popup instead of immediately writing print data.
- Confirm cancel discards edits, print uses edited fields, and the invoice receives the edited funding, due, and amount.
