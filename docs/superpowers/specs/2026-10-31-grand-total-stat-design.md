# Grand Total Stats

## Goal

Show a Grand Total derived from Agreement, Additional Bill, and Payable on both `homme.html` pages.

## Display

- Add a stats card alongside the existing balance cards.
- Show the arithmetic and result: Agreement + Additional Bill - Payable = Grand Total.
- Format values as BDT amounts without a leading plus sign. Keep a minus sign for negative net values.
- Render negative category nets with equivalent arithmetic operators, so the equation remains understandable (for example, a negative Payable is added back).

## Calculation and updates

- Agreement is the parsed numeric agreement value already read by `displayAllData`.
- Additional Bill and Payable are the signed sums parsed from transaction descriptions.
- Calculate `grandTotal = agreement + additionalBill - payable` using numeric values, not animated or formatted DOM text.
- Update the Grand Total after agreement data is parsed and after transactions are loaded, so either loading order produces the correct result.

## Scope

- Update `F:\Building_Plan\data\homme.html` and `F:\Building_Plan\BD cons\data\homme.html` while preserving each page's existing layout, submission behavior, and local changes.
- Do not change spreadsheet data or transaction submission semantics.

## Verification

- Inspect both pages to confirm the formula, displayed values, and update calls are present and use the existing source totals.
- Confirm the target page retains its dual client/developer transaction submission flow.
