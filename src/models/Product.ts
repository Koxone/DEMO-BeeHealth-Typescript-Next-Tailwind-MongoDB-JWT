import mongoose, { Document, Model, Schema } from 'mongoose';

interface IProduct extends Document {
  name: string;
  type: 'medicamento' | 'receta' | 'suministro';
  category: string;
  specialty: string;
  inStock: boolean;
  costPrice: number;
  salePrice: number;
  inventory?: mongoose.Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}

const ProductSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true, trim: true },
    type: { type: String, enum: ['medicamento', 'receta', 'suministro'], required: true },
    category: { type: String, required: true, trim: true },
    specialty: { type: String, required: true, trim: true },
    inStock: { type: Boolean, default: true },
    costPrice: { type: Number, required: true },
    salePrice: { type: Number, required: true },
    inventory: { type: Schema.Types.ObjectId, ref: 'Inventory' },
  },
  { timestamps: true }
);

const models = mongoose.models ?? {};

export const Product: Model<IProduct> =
  (models.Product as Model<IProduct>) || mongoose.model<IProduct>('Product', ProductSchema);

export default Product;
export type { IProduct };
