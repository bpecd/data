# Grand Total Stats Implementation Plan

> **For agentic workers:** Execute the tasks in order in this session. Preserve existing local edits in both pages.

**Goal:** Show `Agreement + Additional Bill - Payable = Grand Total` on both `homme.html` pages.

**Architecture:** Keep each page self-contained. Store the three parsed numeric inputs in page-level variables, and use one `updateGrandTotalStats()` function per page after agreement parsing and transaction aggregation. Render a formula card with signed operators and a separate Grand Total value.

**Tech Stack:** HTML and vanilla JavaScript already in both pages.

## Global Constraints

- Calculate `grandTotal = agreement + additionalBill - payable` using numeric values, not animated or formatted DOM text.
- Update the Grand Total after agreement data is parsed and after transactions are loaded, so either loading order produces the correct result.
- Update `F:\Building_Plan\data\homme.html` and `F:\Building_Plan\BD cons\data\homme.html` while preserving each page's existing layout, submission behavior, and local changes.
- Do not change spreadsheet data or transaction submission semantics.

---

## File Structure

- Modify `F:\Building_Plan\data\homme.html`: add the card, the input state, the equation updater, and calls at agreement and transaction aggregation.
- Modify `F:\Building_Plan\BD cons\data\homme.html`: make the same stats-only changes while retaining its existing dual client/developer sheet submission flow.

### Task 1: Add the Grand Total card and calculation state to both pages

**Files:**
- Modify: `F:\Building_Plan\data\homme.html` in the balance stats markup and transaction helper area.
- Modify: `F:\Building_Plan\BD cons\data\homme.html` at the corresponding balance stats markup and helper area.

**Interfaces:**
- Add page-level numeric values: `agreementStatValue`, `additionalBillStatValue`, and `payableStatValue`, initialized to `0`.
- Add `updateGrandTotalStats()`, which updates `grandTotalEquation` and `grandTotal` DOM spans.

- [ ] Add a card beside the existing stats with `Agreement + Additional Bill - Payable = Grand Total`, an equation span with ID `grandTotalEquation`, and a Grand Total span with ID `grandTotal` followed by `BDT`.
- [ ] Add the three numeric state variables next to `let transactions = []` in each page.
- [ ] Add `updateGrandTotalStats()` in each page near its bill/payable amount helpers. Format all magnitudes with the existing `formatBillPayableAmount`; use a minus sign for negative Agreement or Grand Total, use `+` or `−` before the absolute Additional Bill net depending on its sign, and use `−` for positive Payable or `+` for negative Payable. Set the equation and result spans with `textContent`.

```js
function updateGrandTotalStats() {
  const grandTotal = agreementStatValue + additionalBillStatValue - payableStatValue;
  const agreement = `${agreementStatValue < 0 ? "−" : ""}${formatBillPayableAmount(agreementStatValue)}`;
  const additionalOperator = additionalBillStatValue < 0 ? "−" : "+";
  const payableOperator = payableStatValue < 0 ? "+" : "−";
  const equation = `${agreement} ${additionalOperator} ${formatBillPayableAmount(additionalBillStatValue)} ${payableOperator} ${formatBillPayableAmount(payableStatValue)}`;
  const result = `${grandTotal < 0 ? "−" : ""}${formatBillPayableAmount(grandTotal)}`;

  document.getElementById("grandTotalEquation").textContent = equation;
  document.getElementById("grandTotal").textContent = result;
}
```

### Task 2: Connect both data paths to the Grand Total updater

**Files:**
- Modify: both pages' `displayAllData()` agreement parsing and `displayTransaction(rows)` bill/payable aggregation.

**Interfaces:**
- Consume: the three numeric state variables and `updateGrandTotalStats()` from Task 1.

- [ ] In each `displayAllData()`, immediately after parsing the local agreement value `total`, assign `agreementStatValue = total` and call `updateGrandTotalStats()`.
- [ ] In each `displayTransaction(rows)`, after independently summing transaction descriptions, assign the category sums to `additionalBillStatValue` and `payableStatValue`, update the existing `abtotal` and `payab` spans, and call `updateGrandTotalStats()`.
- [ ] Keep the current transaction and invoice behavior unchanged; in the target page, verify the adjustment submission still posts to both the client and developer forms.

### Task 3: Inspect both resulting pages

**Files:**
- Inspect: both `homme.html` files and the exact diffs.

- [ ] Confirm each Grand Total card has unique IDs within its page and the formula/result update uses numeric values rather than display text.
- [ ] Trace one positive and one negative category net through the formula operators and result sign.
- [ ] Confirm both update calls exist in each page and the target page's dual-sheet submit code remains intact.
