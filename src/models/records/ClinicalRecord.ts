import mongoose, { Schema, Document, Types } from 'mongoose';
import AnswerSchema, { IAnswer } from './Answer';

interface IClinicalRecord extends Document {
  patient: Types.ObjectId;
  specialty: 'weight' | 'dental' | 'stetic';
  version: 'short' | 'full';
  diets?: Types.ObjectId[];
  workouts?: Types.ObjectId[];
  answers: IAnswer[];
  recordDate: Date;
  createdAt: Date;
  updatedAt: Date;
}

const ClinicalRecordSchema: Schema<IClinicalRecord> = new Schema(
  {
    patient: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    diets: [{ type: Schema.Types.ObjectId, ref: 'Diet' }],
    workouts: [{ type: Schema.Types.ObjectId, ref: 'Workout' }],
    specialty: { type: String, enum: ['weight', 'dental', 'stetic'], required: true },
    version: { type: String, enum: ['short', 'full'], required: true },
    answers: [AnswerSchema],
    recordDate: { type: Date, required: true },
  },
  { timestamps: true }
);

export const ClinicalRecord =
  mongoose.models.ClinicalRecord ||
  mongoose.model<IClinicalRecord>('ClinicalRecord', ClinicalRecordSchema);
export type { IClinicalRecord };
