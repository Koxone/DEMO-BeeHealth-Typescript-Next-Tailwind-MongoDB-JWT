import mongoose, { Document, Model, Schema } from 'mongoose';
import { IUser } from './User';
import { IProduct } from './Product';
import { ITransaction } from './Transaction';

/* --- Sub Interface for items sold --- */
interface ISoldItem {
  product: mongoose.Types.ObjectId | IProduct;
  inventory: mongoose.Types.ObjectId;
  quantity: number;
  price: number;
  total: number;
}

/* --- Main Interface --- */
interface IConsultation extends Document {
  patient: mongoose.Types.ObjectId | IUser;
  employee: mongoose.Types.ObjectId | IUser;
  consultType: string;
  speciality?: string;

  consultPrice: number;
  totalItemsSold: number;
  totalCost?: number;
  itemsSold: ISoldItem[];
  paymentMethod: 'efectivo' | 'tarjeta' | 'transferencia';

  transaction: (mongoose.Types.ObjectId | ITransaction)[];
  notes?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

/* --- Mongoose Schema --- */
const ConsultationSchema = new Schema<IConsultation>(
  {
    patient: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    employee: { type: Schema.Types.ObjectId, ref: 'User', required: true },

    consultType: { type: String, trim: true, required: true },
    speciality: { type: String, trim: true },

    consultPrice: { type: Number, required: true, min: 0 },
    totalItemsSold: { type: Number, required: true, min: 0 },
    totalCost: { type: Number, required: true, min: 0 },

    paymentMethod: {
      type: String,
      enum: ['efectivo', 'tarjeta', 'transferencia'],
      required: true,
    },

    itemsSold: [
      {
        product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
        inventory: { type: Schema.Types.ObjectId, ref: 'Inventory', required: true },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true },
        total: { type: Number, required: true },
      },
    ],

    transaction: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Transaction',
      },
    ],

    notes: { type: String, trim: true },
  },
  { timestamps: true }
);

/* --- Model Export --- */
const models = mongoose.models ?? {};

export const Consultation: Model<IConsultation> =
  (models.Consultation as Model<IConsultation>) ||
  mongoose.model<IConsultation>('Consultation', ConsultationSchema);

export default Consultation;
export type { IConsultation, ISoldItem };
