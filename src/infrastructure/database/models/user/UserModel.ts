import { UserSpecialty, UserRole } from '@/domain/enums/';
import mongoose, { Document, Model, Schema } from 'mongoose';

// Interface
interface IUser extends Document {
  id?: string;
  fullName: string;
  email: string;
  phone: string;
  password: string;
  avatar?: string;
  isActive: boolean;
  role: UserRole;
  specialty: UserSpecialty;

  lastVisit?: Date | null;
  createdAt?: Date;
  updatedAt?: Date;
}

// Schema
const UserSchema = new Schema<IUser>(
  {
    id: { type: String, unique: true, index: true },
    fullName: { type: String, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    phone: { type: String, trim: true, required: true, unique: true, match: /^[0-9]{7,15}$/ },
    password: { type: String, required: true },
    avatar: { type: String, default: '' },
    isActive: { type: Boolean, default: true },

    role: { type: String, enum: Object.values(UserRole), default: UserRole.PATIENT },
    specialty: { type: String, enum: Object.values(UserSpecialty), default: UserSpecialty.WEIGHT },

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
