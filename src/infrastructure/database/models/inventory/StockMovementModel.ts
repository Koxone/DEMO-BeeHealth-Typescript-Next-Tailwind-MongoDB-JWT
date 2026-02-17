import mongoose, { Schema } from 'mongoose';

const StockMovementSchema = new Schema(
  {
    productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
    type: { type: String, required: true },
    source: { type: String, required: true },
    sourceId: { type: Schema.Types.ObjectId, default: null },
    balanceBefore: { type: Number, required: true },
    quantity: { type: Number, required: true },
    balanceAfter: { type: Number, required: true },
    performedBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true }
);

export const StockMovementModel =
  mongoose.models.StockMovement || mongoose.model('StockMovement', StockMovementSchema);
