import mongoose, { Schema } from 'mongoose';

const SaleSchema = new Schema(
  {
    consultationId: { type: Schema.Types.ObjectId, ref: 'Consultation', default: null },
    patientId: { type: Schema.Types.ObjectId, ref: 'User', default: null },
    items: [
      {
        productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
        quantity: { type: Number, required: true },
        unitPrice: {
          amount: { type: Number, required: true },
          currency: { type: String, default: 'MXN' },
        },
        subtotal: {
          amount: { type: Number, required: true },
          currency: { type: String, default: 'MXN' },
        },
      },
    ],
    total: {
      amount: { type: Number, required: true },
      currency: { type: String, default: 'MXN' },
    },
    paymentMethod: { type: String, required: true },
    status: { type: String, required: true },
  },
  { timestamps: true }
);

export const SaleModel = mongoose.models.Sale || mongoose.model('Sale', SaleSchema);
