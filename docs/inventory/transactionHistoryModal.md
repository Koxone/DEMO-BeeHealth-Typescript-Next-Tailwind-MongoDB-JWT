# Transaction History Modal

Technical Documentation for the Modular Block System

## Overview

The `TransactionHistoryModal` component displays the complete history of all inventory movements linked to a product. These movements include price changes, quantity corrections, restocks, initial stock entries, and status changes.

To keep the codebase clean, scalable and maintainable, each movement type is rendered through its own dedicated block component. The main modal only decides which block should be displayed based on the properties of each transaction.

## Architecture

Main modal component:

```
src/components/.../TransactionHistoryModal.jsx
```

Block components:

```
src/components/.../components/
  InitialStockBlock.jsx
  RestockBlock.jsx
  QuantityBlock.jsx
  PriceBlock.jsx
  StatusOnBlock.jsx
  StatusOffBlock.jsx
```

Each block receives a `transaction` object and renders only the information specific to that type of movement.

## Component Flow

1. The modal receives three props:
   - `history`: an array of transaction objects
   - `item`: product information
   - `onClose`: function to close the modal

2. If `history` is empty, the modal shows a user-friendly empty state.

3. If there are transactions, the modal loops through the `history`.

4. For each transaction, the modal decides which block to render based on transaction properties:
   - `reasonType === "initial"` → `InitialStockBlock`
   - `reasonType === "restock"` → `RestockBlock`
   - `reasonType === "correction"` and no `priceField` → `QuantityBlock`
   - `reasonType === "correction"` and a `priceField` → `PriceBlock`
   - `reasonType === "status_change"` and `movement === "IN"` → `StatusOnBlock`
   - `reasonType === "status_change"` and `movement === "OUT"` → `StatusOffBlock`

5. The card background color is determined at the modal level so that styling remains consistent across all blocks.

## Benefits of the Block-Based System

### Readability

The main modal remains clean and easy to understand even with complex logic.

### Scalability

New movement types can be added without touching existing logic. You only add a new block.

### Maintainability

Modifying or redesigning a specific movement type affects only its block.

### Reusability

Blocks can be reused in other parts of the app if needed.

## Standard Transaction Fields

All transactions share these common properties:

- `_id`
- `reasonType`
- `reason`
- `movement`
- `performedBy`
- `createdAt`

Each movement type then includes its own additional fields.

### Quantity Correction

- `oldQuantity`
- `newQuantity`
- `quantityDelta`

### Price Correction

- `priceField`
- `oldCostPrice`
- `oldSalePrice`
- `newCostPrice`
- `newSalePrice`
- `priceDelta`

### Restock

- `quantity`

### Initial Stock

- `quantity`

### Status Change

- `movement === "IN"` → On
- `movement === "OUT"` → Off

## Example of Block Selection Logic

```jsx
{
  transaction.reasonType === 'correction' && transaction.priceField && (
    <PriceBlock transaction={transaction} />
  );
}
```

The logic is explicit and easy to extend in the future.

## Visual Conventions

The card color is not handled inside each block. It is controlled by the main modal so that global design changes can be made quickly without editing multiple files.
