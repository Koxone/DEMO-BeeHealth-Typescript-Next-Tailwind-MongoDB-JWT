import mongoose, { Document, Model, Schema } from 'mongoose';
import { IUser } from './User';
import { IClinicalRecord } from './records/ClinicalRecord';

export interface IDiet extends Document {
  clinicalRecord?: mongoose.Types.ObjectId | IClinicalRecord;

  description?: string;
  images?: string[];
  name: string;
  category?: string;
  doctor: mongoose.Types.ObjectId | IUser;

  benefits?: string;
  instructions?: string;

  allowedLiquids?: {
    items: string[];
    note?: string;
  };
  allowedFoods?: {
    items: string[];
    note?: string;
  };
  forbiddenFoods?: {
    items: string[];
    note?: string;
  };
  forbiddenLiquids?: {
    items: string[];
    note?: string;
  };

  duration?: string;
  ingredients?: string[];
  isActive?: boolean;
  notes?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const DietSchema = new Schema<IDiet>(
  {
    doctor: { type: Schema.Types.ObjectId, ref: 'User', required: true },

    clinicalRecord: { type: Schema.Types.ObjectId, ref: 'ClinicalRecord' },

    name: { type: String, trim: true, required: true },
    category: { type: String, trim: true },

    benefits: { type: String, trim: true },
    instructions: { type: String, trim: true },
    description: { type: String, trim: true },
    ingredients: [{ type: String, trim: true }],

    allowedLiquids: {
      items: [{ type: String, trim: true }],
      note: { type: String, trim: true },
    },
    allowedFoods: {
      items: [{ type: String, trim: true }],
      note: { type: String, trim: true },
    },

    forbiddenFoods: {
      items: [{ type: String, trim: true }],
      note: { type: String, trim: true },
    },
    forbiddenLiquids: {
      items: [{ type: String, trim: true }],
      note: { type: String, trim: true },
    },

    duration: { type: String, trim: true },

    isActive: { type: Boolean, default: true },
    images: [{ type: String, trim: true }],
    notes: { type: String, trim: true },
  },
  { timestamps: true }
);

const models = mongoose.models ?? {};
export const Diet: Model<IDiet> = models.Diet || mongoose.model<IDiet>('Diet', DietSchema);

export default Diet;
