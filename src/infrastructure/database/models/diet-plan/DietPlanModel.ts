import { UserSpecialty, DietPlanStatusEnum } from '@/domain/enums/';
import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IDietPlan extends Document {
  consultationId: Types.ObjectId;
  patientId: Types.ObjectId;
  parentId: Types.ObjectId | null;
  dietId: Types.ObjectId;
  specialty: UserSpecialty;
  startDate: Date;
  endDate: Date;
  status: DietPlanStatusEnum;
  dietSnapshot: any;
  createdAt: Date;
  updatedAt: Date;
}

const DietPlanSchema = new Schema<IDietPlan>(
  {
    consultationId: { type: Schema.Types.ObjectId, ref: 'Consultation', required: true },
    patientId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    parentId: { type: Schema.Types.ObjectId, ref: 'DietPlan', default: null },
    dietId: { type: Schema.Types.ObjectId, ref: 'DietTemplate', required: true },
    specialty: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    status: {
      type: String,
      enum: Object.values(DietPlanStatusEnum),
      default: DietPlanStatusEnum.ACTIVE,
    },
    dietSnapshot: { type: Schema.Types.Mixed, required: true },
    createdAt: { type: Date, required: true },
    updatedAt: { type: Date, required: true },
  },
  { versionKey: false }
);

export const DietPlanModel =
  mongoose.models.DietPlan || mongoose.model<IDietPlan>('DietPlan', DietPlanSchema);
