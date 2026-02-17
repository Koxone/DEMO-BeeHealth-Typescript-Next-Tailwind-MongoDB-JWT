import mongoose, { Schema, Document, Model } from 'mongoose';
import { GoalStatusEnum, UserSpecialty } from '@/domain/enums/';

export interface IGoalDocument extends Document {
  patientId: mongoose.Types.ObjectId;
  consultationId: mongoose.Types.ObjectId;
  specialty: UserSpecialty;
  initialValue: number;
  targetValue: number;
  finalValue?: number;
  status: GoalStatusEnum;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const GoalSchema = new Schema<IGoalDocument>(
  {
    patientId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    consultationId: { type: Schema.Types.ObjectId, ref: 'Consultation', required: true },
    specialty: { type: String, enum: Object.values(UserSpecialty), default: UserSpecialty.WEIGHT },
    initialValue: { type: Number, required: true },
    targetValue: { type: Number, required: true },
    finalValue: { type: Number },
    status: {
      type: String,
      enum: Object.values(GoalStatusEnum),
      default: GoalStatusEnum.ACTIVE,
    },
    notes: { type: String, trim: true },
  },
  { timestamps: true, versionKey: false }
);

GoalSchema.index({ patientId: 1, status: 1 });
GoalSchema.index({ consultationId: 1 });

const GoalModel: Model<IGoalDocument> =
  mongoose.models.Goal || mongoose.model<IGoalDocument>('Goal', GoalSchema);

export default GoalModel;
