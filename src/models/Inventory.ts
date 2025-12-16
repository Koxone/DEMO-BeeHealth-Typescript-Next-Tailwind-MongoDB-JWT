import mongoose, { Document, Model, Schema } from 'mongoose';

/* --- Interface --- */
interface IInventory extends Document {
  product: mongoose.Types.ObjectId;
  productType: 'medicamento' | 'receta' | 'suministro';
  quantity?: number;
  minStock: number;
  maxStock: number;
  createdAt?: Date;
  updatedAt?: Date;
}

const InventorySchema = new Schema<IInventory>(
  {
    product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
    productType: { type: String, enum: ['medicamento', 'receta', 'suministro'], required: true },
    quantity: { type: Number, required: false },
    minStock: { type: Number, required: true },
    maxStock: { type: Number, required: true },
  },
  { timestamps: true }
);

const models = mongoose.models ?? {};

export const Inventory: Model<IInventory> =
  (models.Inventory as Model<IInventory>) ||
  mongoose.model<IInventory>('Inventory', InventorySchema);

export default Inventory;
export type { IInventory };
