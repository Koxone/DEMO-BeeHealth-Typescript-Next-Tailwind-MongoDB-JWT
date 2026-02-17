import mongoose, { Schema, Document } from 'mongoose';

export interface IUserPasswordHistory extends Document {
  userId: string;
  passwordHash: string;
  createdAt: Date;
}

const UserPasswordHistorySchema = new Schema<IUserPasswordHistory>(
  {
    userId: {
      type: String,
      required: true,
      index: true,
    },
    passwordHash: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
  }
);

// Compound index for efficient lookups
UserPasswordHistorySchema.index({ userId: 1, passwordHash: 1 });
UserPasswordHistorySchema.index({ userId: 1, createdAt: -1 });

const MongooseUserPasswordHistoryModel =
  mongoose.models.UserPasswordHistory ||
  mongoose.model<IUserPasswordHistory>('UserPasswordHistory', UserPasswordHistorySchema);

export default MongooseUserPasswordHistoryModel;
