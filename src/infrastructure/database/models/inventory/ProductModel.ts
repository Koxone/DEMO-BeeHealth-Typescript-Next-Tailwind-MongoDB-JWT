import mongoose, { Schema } from 'mongoose';

const ProductSchema = new Schema(
  {
    sku: { type: String, required: true, unique: true },
    specialty: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String, default: null },
    category: { type: String, required: true },
    isPhysical: { type: Boolean, default: true },
    costPrice: {
      amount: { type: Number, required: true },
      currency: { type: String, default: 'MXN' },
    },
    salePrice: {
      amount: { type: Number, required: true },
      currency: { type: String, default: 'MXN' },
    },
  },
  { timestamps: true }
);

export const ProductModel = mongoose.models.Product || mongoose.model('Product', ProductSchema);
