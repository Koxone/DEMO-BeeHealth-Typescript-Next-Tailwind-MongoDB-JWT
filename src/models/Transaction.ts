import mongoose, { Document, Model, Schema } from 'mongoose';

interface ITransaction extends Document {
  inventory: mongoose.Types.ObjectId;
  movement?: 'IN' | 'OUT' | 'PRODUCT_UPDATE';
  reasonType: 'initial' | 'sale' | 'restock' | 'correction' | 'status_change';
  quantity?: number;
  reason?: string;
  performedBy: mongoose.Types.ObjectId;
  patient?: mongoose.Types.ObjectId;

  // Dynamic changed fields
  changedFields?: string[];

  // Inventory fields change
  oldQuantity?: number;
  newQuantity?: number;
  quantityDelta?: number;

  // Stock fields change
  oldMinStock?: number;
  newMinStock?: number;
  minStockDelta?: number;
  oldMaxStock?: number;
  newMaxStock?: number;
  maxStockDelta?: number;

  // Product fields change
  oldName?: string;
  newName?: string;
  oldType?: 'medicamento' | 'receta' | 'suministro';
  newType?: 'medicamento' | 'receta' | 'suministro';
  oldCategory?: string;
  newCategory?: string;
  oldSpecialty?: string;
  newSpecialty?: string;
  oldCostPrice?: number;
  newCostPrice?: number;
  oldSalePrice?: number;
  newSalePrice?: number;

  /* Helpers to identify what changed for price */
  priceField?: 'costPrice' | 'salePrice' | 'both';
  priceDelta?: number;

  createdAt?: Date;
  updatedAt?: Date;
}

const TransactionSchema = new Schema<ITransaction>(
  {
    inventory: { type: Schema.Types.ObjectId, ref: 'Inventory', required: true },
    movement: { type: String, enum: ['IN', 'OUT', 'PRODUCT_UPDATE'], required: false },
    reasonType: {
      type: String,
      enum: ['initial', 'sale', 'restock', 'correction', 'status_change'],
      required: true,
    },
    quantity: { type: Number, required: false },
    reason: { type: String, trim: true },
    performedBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    patient: { type: Schema.Types.ObjectId, ref: 'User' },
    changedFields: { type: [String], required: false },

    // Stock field changes
    oldMinStock: { type: Number },
    newMinStock: { type: Number },
    minStockDelta: { type: Number },
    oldMaxStock: { type: Number },
    newMaxStock: { type: Number },
    maxStockDelta: { type: Number },

    // Product field changes
    oldName: { type: String },
    newName: { type: String },
    oldType: { type: String, enum: ['medicamento', 'receta', 'suministro'] },
    newType: { type: String, enum: ['medicamento', 'receta', 'suministro'] },
    oldCategory: { type: String },
    newCategory: { type: String },
    oldSpecialty: { type: String },
    newSpecialty: { type: String },
    oldCostPrice: { type: Number },
    newCostPrice: { type: Number },
    oldSalePrice: { type: Number },
    newSalePrice: { type: Number },

    /* Quantity change fields */
    oldQuantity: { type: Number },
    newQuantity: { type: Number },
    quantityDelta: { type: Number },

    /* Helpers */
    priceField: { type: String, enum: ['costPrice', 'salePrice', 'both'] },
    priceDelta: { type: Number },
  },
  { timestamps: true }
);

const models = mongoose.models ?? {};

export const Transaction: Model<ITransaction> =
  (models.Transaction as Model<ITransaction>) ||
  mongoose.model<ITransaction>('Transaction', TransactionSchema);

export default Transaction;
export type { ITransaction };
