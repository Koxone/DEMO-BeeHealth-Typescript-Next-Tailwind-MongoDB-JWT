import mongoose, { Schema, Document } from 'mongoose';

export interface IOption {
  value: string;
  label: string;
}

export interface IQuestion extends Document {
  questionId: number;
  text: string;
  specialty: 'weight' | 'dental' | 'stetic';
  version: 'short' | 'full' | 'quick';
  isMetric?: boolean;
  type: string;
  options?: IOption[];
  placeholder?: string;
  required?: boolean;
}

const OptionSchema: Schema<IOption> = new Schema({
  value: { type: String, required: true },
  label: { type: String, required: true },
});

const QuestionSchema: Schema<IQuestion> = new Schema({
  questionId: { type: Number, required: true },
  text: { type: String, required: true },
  specialty: { type: String, enum: ['weight', 'dental', 'stetic'], required: true },
  version: { type: String, enum: ['short', 'full', 'quick'], required: true },
  isMetric: { type: Boolean, default: false },
  type: { type: String },
  options: { type: [OptionSchema], required: false },
  placeholder: { type: String, required: false },
  required: { type: Boolean, default: false },
});

export const Question =
  mongoose.models.Question || mongoose.model<IQuestion>('Question', QuestionSchema);
