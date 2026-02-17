import { WorkoutCategoryEnum, WorkoutDifficultyEnum } from '@/domain/enums/';
import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IWorkoutDocument extends Document {
  name: string;
  type: string;
  category: WorkoutCategoryEnum;
  difficulty: WorkoutDifficultyEnum;
  duration: number;
  about: string;
  instructions: string[];
  benefits: string[];
  cautions: string[];
  images: string[];
  video: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const WorkoutSchema = new Schema<IWorkoutDocument>(
  {
    name: { type: String, required: true, trim: true },
    type: { type: String, required: true, trim: true },
    category: {
      type: String,
      enum: Object.values(WorkoutCategoryEnum),
      required: true,
    },
    difficulty: {
      type: String,
      enum: Object.values(WorkoutDifficultyEnum),
      required: true,
    },
    duration: { type: Number, required: true },
    about: { type: String, required: true },
    instructions: { type: [String], required: true },
    benefits: { type: [String], default: [] },
    cautions: { type: [String], default: [] },
    images: { type: [String], default: [] },
    video: { type: String, default: '' },
    isActive: { type: Boolean, default: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const WorkoutTemplateModel: Model<IWorkoutDocument> =
  mongoose.models.Workout || mongoose.model<IWorkoutDocument>('Workout', WorkoutSchema);

export default WorkoutTemplateModel;
