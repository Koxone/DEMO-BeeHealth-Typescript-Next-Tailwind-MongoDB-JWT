import { UserSpecialty } from '@/domain/enums/';
import { Schema, model, models, Document } from 'mongoose';

export interface IConsultationTemplate extends Document {
  specialty: UserSpecialty;
  version: number;
  isActive: boolean;
  sections: any[];
  createdAt: Date;
  updatedAt: Date;
}

const QuestionOptionSchema = new Schema(
  {
    value: { type: String, required: true },
    label: { type: String, required: true },
  },
  { _id: false }
);

const QuestionSchema = new Schema(
  {
    questionId: { type: String, required: true },
    text: { type: String, required: true },
    type: { type: String, required: true },
    required: { type: Boolean, default: false },
    isMetric: { type: Boolean, default: false },
    placeholder: { type: String },
    options: [QuestionOptionSchema],
  },
  { _id: false }
);

const SectionSchema = new Schema(
  {
    order: { type: Number, required: true },
    category: { type: String, required: true },
    questions: [QuestionSchema],
  },
  { _id: false }
);

const ConsultationTemplateSchema = new Schema<IConsultationTemplate>(
  {
    specialty: { type: String, required: true, unique: true },
    version: { type: Number, required: true },
    isActive: { type: Boolean, default: true },
    sections: [SectionSchema],
  },
  {
    timestamps: true,
    collection: 'consultationTemplates',
  }
);

export const ConsultationTemplateModel =
  models.ConsultationTemplate ||
  model<IConsultationTemplate>('ConsultationTemplate', ConsultationTemplateSchema);
