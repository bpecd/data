# Editable Print Invoice Popup Implementation Plan

> **For agentic workers:** Execute the tasks in order in this session. Preserve existing local changes and transaction behavior in both pages.

**Goal:** Show an editable invoice review popup before opening the print invoice from either `homme.html` page.

**Architecture:** Reuse the existing email confirmation styles for a separate print confirmation modal. The selected transaction and current client/project values prefill editable form fields; confirmation writes only the edited values to `printTransactionData` and opens the existing `invo.html` page.

**Tech Stack:** HTML, CSS, and vanilla JavaScript already in the two pages; existing `invo.html` invoice renderer.

## Global Constraints

- Edits apply to that invoice only; do not update the transaction sheet or stored transaction row.
- Preserve the existing description-based amount for Additional Bill / Payable transactions as the modal's absolute amount default.
- Validate numeric amount, funding, and due values before printing; show validation feedback in the modal and do not open the invoice when invalid.
- Apply the popup to both `F:\Building_Plan\data\homme.html` and `F:\Building_Plan\BD cons\data\homme.html`.
- Preserve existing email confirmation behavior and each page's transaction submission flow.
- Do not modify spreadsheet data or transaction rows.

---

## File Structure

- Modify `F:\Building_Plan\data\homme.html`: add the modal, route Print Receipt clicks to it, and build the print payload from edited values.
- Modify `F:\Building_Plan\BD cons\data\homme.html`: make the equivalent changes while retaining its current invoice date and dual-sheet transaction behavior.
- Do not modify `invo.html`; it already renders the `printTransactionData` fields consumed by this flow.

### Task 1: Add the invoice edit modal to both pages

**Files:**
- Modify: both `homme.html` files near the existing email confirmation modal and CSS.

**Interfaces:**
- Modal ID: `printConfirmModal`.
- Editable input IDs: `printClientName`, `printClientContact`, `printClientAddress`, `printClientStatus`, `printTransactionDate`, `printReason`, `printPaymentMethod`, `printFunding`, `printDue`, and `printAmount`.
- Buttons call `closePrintConfirmation()` and `confirmPrintInvoice()`.

- [x] Add a second modal using `email-confirm-modal`, `email-confirm-content`, `email-confirm-header`, and `email-confirm-buttons` styles, with a two-column `.invoice-edit-grid` that collapses to one column on narrow screens.
- [x] Add the ten labeled fields above. Use text inputs for descriptive values and amount inputs with `inputmode="decimal"` for funding, due, and amount. Add Cancel and Print Invoice buttons.
- [x] Add modal-only styles so the content scrolls within `90vh`, the grid inputs fill their columns, and the existing email modal styles remain unchanged.

### Task 2: Route printing through editable invoice data

**Files:**
- Modify: both `homme.html` print-button handlers and near the existing email modal functions.

**Interfaces:**
- Add `pendingPrintInvoice`, holding `{ transaction, printButton, ownerInfo }` until the user cancels or confirms.
- Add `showPrintConfirmation(transaction, printButton)`, `closePrintConfirmation()`, and `confirmPrintInvoice()`.

- [x] In each print-button handler, keep the existing transaction lookup and replace the immediate localStorage write plus `window.open("invo.html", "_blank")` with `showPrintConfirmation(transaction, target)`.
- [x] In `showPrintConfirmation`, calculate the same state-specific funding currently used by that page, default due from the existing `due` span, default amount to `Math.abs(getInvoiceTransactionAmount(transaction))`, and prefill client and transaction fields. Set the modal active and retain the button reference without mutating the transaction.
- [x] In `closePrintConfirmation`, close the modal, re-enable the original print button, and clear `pendingPrintInvoice` without writing localStorage.
- [x] In `confirmPrintInvoice`, parse funding, due, and amount after removing commas. Reject empty, non-finite, or negative values by showing an inline validation message and leave the modal open.
- [x] On valid confirmation, create the same `printTransactionData` shape used today, filling `ownerInfo.name`, `phone`, `email`, `state`, `Funding`, `due`, and `address` from the popup, and filling transaction date, description, reason, payment method, amount, remark, and serial number from the selected transaction plus popup edits.
- [x] Store the payload under `printTransactionData`, open `invo.html`, close the modal, re-enable the print button, and clear the pending state. Keep `amount` numeric; `invo.html` formats its magnitude.

### Task 3: Inspect the finished paths

**Files:**
- Inspect: both `homme.html` files and the invoice data handoff.

- [x] Confirm every popup field maps to the intended `printTransactionData` property and the invoice renderer's existing field names.
- [x] Trace Cancel and invalid numeric input to confirm neither writes print data nor opens a new window.
- [x] Confirm valid confirmation opens the invoice with edited amount, funding, and due, while the transaction and sheet submission code remains unchanged in both pages.

