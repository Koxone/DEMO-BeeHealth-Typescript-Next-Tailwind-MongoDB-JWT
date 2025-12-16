import mongoose, { Document, Model, Schema } from 'mongoose';
import { IUser } from './User';
import { IClinicalRecord } from './records/ClinicalRecord';

export interface IWorkout extends Document {
  patients: {
    patient: mongoose.Types.ObjectId | IUser;
    isActive: boolean;
    assignedAt: Date;
    finishedAt?: Date;
  }[];

  clinicalRecord?: mongoose.Types.ObjectId | IClinicalRecord;

  name: string;
  type: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: number;
  about: string;
  instructions: string[];
  benefits: string[];
  cautions: string[];
  images: string[];
  video: string;
}

const WorkoutSchema: Schema<IWorkout> = new Schema(
  {
    patients: [
      {
        patient: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        isActive: { type: Boolean, default: true },
        assignedAt: { type: Date, default: Date.now },
        finishedAt: { type: Date },
      },
    ],

    clinicalRecord: { type: Schema.Types.ObjectId, ref: 'ClinicalRecord' },

    name: { type: String, required: true },
    type: { type: String, required: true },
    difficulty: { type: String, enum: ['Beginner', 'Intermediate', 'Advanced'], required: true },
    duration: { type: Number, required: true },
    about: { type: String, required: true },
    instructions: { type: [String], required: true },
    benefits: { type: [String], required: true },
    cautions: { type: [String], required: true },
    images: { type: [String], required: true },
    video: { type: String, required: true },
  },
  { timestamps: true }
);

const models = mongoose.models ?? {};
export const Workout: Model<IWorkout> =
  models.Workout || mongoose.model<IWorkout>('Workout', WorkoutSchema);

export default Workout;
