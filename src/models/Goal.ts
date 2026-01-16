import mongoose, { Document, Model, Schema } from 'mongoose';

export interface IGoal extends Document {
  patient: mongoose.Types.ObjectId;
  initialWeight?: number;
  goal: number;
  notes?: string;
  isActive: boolean;
  comply?: boolean;
}

const GoalSchema: Schema<IGoal> = new Schema(
  {
    patient: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
    isActive: { type: Boolean, default: true },
    initialWeight: { type: Number },
    comply: { type: Boolean, default: false },
    goal: { type: Number, required: true },
    notes: { type: String },
  },
  { timestamps: true }
);

// Indexes
GoalSchema.index({ patient: 1, isActive: 1 });
GoalSchema.index({ comply: 1 });

const Goal: Model<IGoal> = mongoose.models.Goal || mongoose.model<IGoal>('Goal', GoalSchema);

export default Goal;
