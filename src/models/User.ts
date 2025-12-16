import mongoose, { Document, Model, Schema } from 'mongoose';

// Interface
interface IUser extends Document {
  fullName: string;
  email: string;
  phone: string;
  password: string;
  avatar?: string;
  isActive: boolean;
  hasRecord: boolean;
  role: 'patient' | 'doctor' | 'admin' | 'employee';
  specialty: 'weight' | 'dental' | 'stetic' | 'none';

  diets?: {
    diet: mongoose.Types.ObjectId;
    isActive: boolean;
    assignedAt: Date;
    finishedAt?: Date;
  }[];
  workouts: {
    workout: mongoose.Types.ObjectId;
    isActive: boolean;
    assignedAt: Date;
    finishedAt?: Date;
  }[];

  resetToken?: string | null;
  lastVisit?: Date | null;
  createdAt?: Date;
  updatedAt?: Date;
}

// Schema
const UserSchema = new Schema<IUser>(
  {
    fullName: { type: String, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    phone: { type: String, trim: true, required: true, unique: true, match: /^[0-9]{7,15}$/ },
    password: { type: String, required: true },
    avatar: { type: String, default: '' },
    isActive: { type: Boolean, default: true },
    hasRecord: { type: Boolean, default: false },
    resetToken: { type: String, default: null },

    diets: [
      {
        diet: { type: Schema.Types.ObjectId, ref: 'Diet' },
        isActive: { type: Boolean, default: true },
        assignedAt: { type: Date, default: Date.now },
        finishedAt: { type: Date },
      },
    ],
    workouts: [
      {
        workout: { type: Schema.Types.ObjectId, ref: 'Workout' },
        isActive: { type: Boolean, default: true },
        assignedAt: { type: Date, default: Date.now },
        finishedAt: { type: Date },
      },
    ],

    role: { type: String, enum: ['patient', 'doctor', 'admin', 'employee'], default: 'patient' },
    specialty: { type: String, enum: ['weight', 'dental', 'stetic', 'none'], default: 'none' },
    lastVisit: { type: Date, default: null },
  },
  { timestamps: true }
);

// Model
const models = mongoose.models ?? {};

export const User: Model<IUser> =
  (models.User as Model<IUser>) || mongoose.model<IUser>('User', UserSchema);

export default User;
export type { IUser };
