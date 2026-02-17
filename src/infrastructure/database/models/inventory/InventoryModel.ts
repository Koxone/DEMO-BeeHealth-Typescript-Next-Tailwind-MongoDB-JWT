import mongoose, { Schema } from 'mongoose';

const InventorySchema = new Schema(
  {
    productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true, unique: true },
    currentStock: { type: Number, required: true, default: 0 },
    minStock: { type: Number, required: true, default: 0 },
    maxStock: { type: Number, required: true, default: 0 },
  },
  { timestamps: true }
);

export const InventoryModel =
  mongoose.models.Inventory || mongoose.model('Inventory', InventorySchema);
