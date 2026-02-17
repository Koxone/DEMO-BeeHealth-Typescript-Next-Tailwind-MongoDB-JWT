import mongoose, { Schema, Document, Model } from 'mongoose';
import { UserSpecialty, ComplianceStatusEnum, WorkoutStatusEnum } from '@/domain/enums/';

export interface IWorkoutPlanDocument extends Document {
  parentId: mongoose.Types.ObjectId | null;
  consultationId: mongoose.Types.ObjectId;
  patientId: mongoose.Types.ObjectId;
  workoutId: mongoose.Types.ObjectId;
  specialty: UserSpecialty;
  startDate: Date;
  endDate: Date;
  status: WorkoutStatusEnum;

  workoutSnapshot: {
    originalWorkoutId: string;
    name: string;
    type: string;
    category: string;
    difficulty: string;
    duration: number;
    about: string;
    instructions: string[];
    benefits: string[];
    cautions: string[];
    images: string[];
    video: string;
  };

  compliance: {
    status: ComplianceStatusEnum;
    rating: number;
    doctorNotes: string;
  };

  createdAt: Date;
  updatedAt: Date;
}

const WorkoutPlanSchema = new Schema<IWorkoutPlanDocument>(
  {
    parentId: { type: Schema.Types.ObjectId, ref: 'WorkoutPlan', default: null },
    consultationId: { type: Schema.Types.ObjectId, ref: 'Consultation', required: true },
    patientId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    workoutId: { type: Schema.Types.ObjectId, ref: 'Workout', required: true },
    specialty: {
      type: String,
      enum: Object.values(UserSpecialty),
      required: true,
    },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    status: {
      type: String,
      enum: Object.values(WorkoutStatusEnum),
      default: WorkoutStatusEnum.ACTIVE,
    },

    workoutSnapshot: {
      originalWorkoutId: { type: String, required: true },
      name: { type: String, required: true },
      type: { type: String },
      category: { type: String },
      difficulty: { type: String },
      duration: { type: Number },
      about: { type: String },
      instructions: [{ type: String }],
      benefits: [{ type: String }],
      cautions: [{ type: String }],
      images: [{ type: String }],
      video: { type: String },
    },

    compliance: {
      status: {
        type: String,
        enum: Object.values(ComplianceStatusEnum),
        default: ComplianceStatusEnum.PENDING,
      },
      rating: { type: Number, default: 0, min: 0, max: 5 },
      doctorNotes: { type: String, trim: true, default: '' },
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

WorkoutPlanSchema.index({ patientId: 1, status: 1 });
WorkoutPlanSchema.index({ consultationId: 1 });

const WorkoutPlanModel: Model<IWorkoutPlanDocument> =
  mongoose.models.WorkoutPlan ||
  mongoose.model<IWorkoutPlanDocument>('WorkoutPlan', WorkoutPlanSchema);

export default WorkoutPlanModel;
