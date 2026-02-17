import { UserSpecialty } from '@/domain/enums/';
import { ClinicalHistoryAnswerDTOInfraestructure } from '@/infrastructure/types/clinical-history.infra.types';
import { Schema, model, models, Document } from 'mongoose';

export interface IConsultation extends Document {
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

const ConsultationSchema = new Schema<IConsultation>(
  {
    patientId: { type: String, required: true, index: true },
    specialty: { type: String, required: true },
    answers: [AnswerSchema],
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true, collection: 'consultations' }
);

ConsultationSchema.index({ patientId: 1, specialty: 1 });

export const ConsultationModel =
  models.Consultation || model<IConsultation>('Consultation', ConsultationSchema);
