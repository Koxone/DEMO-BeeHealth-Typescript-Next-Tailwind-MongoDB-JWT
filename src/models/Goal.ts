import mongoose, { Document, Model, Schema } from 'mongoose';

export interface IGoal extends Document {
  patient: mongoose.Types.ObjectId;
  type: 'weight' | 'workout' | 'diet' | 'custom';
  diet?: string;
  workout?: string;
  isCompleted: boolean;
  goal: string;
  notes?: string;
}

const GoalSchema: Schema<IGoal> = new Schema(
  {
    patient: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, enum: ['weight', 'workout', 'diet', 'custom'], required: true },
    isCompleted: { type: Boolean, default: false },
    diet: { type: String },
    workout: { type: String },
    goal: { type: String, required: true },
    notes: { type: String },
  },
  { timestamps: true }
);

const Goal: Model<IGoal> = mongoose.models.Goal || mongoose.model<IGoal>('Goal', GoalSchema);

export default Goal;
