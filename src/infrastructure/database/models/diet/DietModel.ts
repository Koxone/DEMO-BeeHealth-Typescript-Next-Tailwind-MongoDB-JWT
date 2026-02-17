import mongoose, { Schema, Document } from 'mongoose';

export interface IDietTemplate extends Document {
  name: string;
  category: string;
  description?: string;
  instructions?: string;
  benefits?: string;
  allowedFoods: {
    items: string[];
    note?: string;
  };
  forbiddenFoods: {
    items: string[];
    note?: string;
  };
  allowedLiquids: {
    items: string[];
    note?: string;
  };
  forbiddenLiquids: {
    items: string[];
    note?: string;
  };
  ingredients?: string[];
  images?: string[];
  notes?: string;
  isActive: boolean;
}

const RestrictionSchema = new Schema(
  {
    items: [{ type: String, lowercase: true, trim: true }],
    note: { type: String, trim: true },
  },
  { _id: false }
);

const DietTemplateSchema = new Schema<IDietTemplate>(
  {
    name: { type: String, required: true, trim: true },
    category: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    instructions: { type: String, trim: true },
    benefits: { type: String, trim: true },
    allowedFoods: { type: RestrictionSchema, required: true },
    forbiddenFoods: { type: RestrictionSchema, required: true },
    allowedLiquids: { type: RestrictionSchema, required: true },
    forbiddenLiquids: { type: RestrictionSchema, required: true },
    ingredients: [{ type: String }],
    images: [{ type: String }],
    notes: { type: String },
    isActive: { type: Boolean, default: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default mongoose.models.DietTemplate ||
  mongoose.model<IDietTemplate>('Diet', DietTemplateSchema);
