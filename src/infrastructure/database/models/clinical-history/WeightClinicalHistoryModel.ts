import { UserSpecialty } from '@/domain/enums/';
import { ClinicalHistoryAnswerDTOInfraestructure } from '@/infrastructure/types/clinical-history.infra.types';
import { Schema, model, models, Document } from 'mongoose';

export interface IWeightClinicalHistory extends Document {
  patientId: string;
  specialty: UserSpecialty;
  answers: ClinicalHistoryAnswerDTOInfraestructure[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const AnswerSchema = new Schema(
  {
    questionId: { type: Number, required: true },
    questionText: { type: String, required: true },
    questionType: { type: String, required: true },
    value: { type: Schema.Types.Mixed },
  },
  { _id: false }
);

const WeightClinicalHistorySchema = new Schema<IWeightClinicalHistory>(
  {
    patientId: { type: String, required: true, index: true },
    specialty: { type: String, required: true },
    answers: [AnswerSchema],
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true, collection: 'clinicalHistories' }
);

WeightClinicalHistorySchema.index({ patientId: 1, specialty: 1 });

export const WeightClinicalHistoryModel =
  models.WeightClinicalHistory ||
  model<IWeightClinicalHistory>('WeightClinicalHistory', WeightClinicalHistorySchema);
