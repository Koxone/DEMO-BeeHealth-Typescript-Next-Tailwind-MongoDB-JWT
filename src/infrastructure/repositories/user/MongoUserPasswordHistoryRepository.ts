import mongoose from 'mongoose';

import { UserPasswordHistoryRepository } from '@/domain/repositories/user/UserPasswordHistoryRepository';
import { UserPasswordHistory } from '@/domain/entities/user/UserPasswordHistory';
import { connectDB } from '@/infrastructure/database/mongodb';

import MongooseUserPasswordHistoryModel from '@/infrastructure/database/models/user/UserPasswordHistoryModel';

// Lean doc type
type UserPasswordHistoryLeanFromMongoDB = {
  _id: mongoose.Types.ObjectId;
  userId: string;
  passwordHash: string;
  createdAt: Date;
};

export class MongooseUserPasswordHistoryRepository implements UserPasswordHistoryRepository {
  // Save
  async save(history: UserPasswordHistory): Promise<void> {
    await connectDB();

    await MongooseUserPasswordHistoryModel.create(history.toPersistence());
  }

  // Find by user id
  async findByUserId(userId: string): Promise<UserPasswordHistory[]> {
    await connectDB();

    const documents = await MongooseUserPasswordHistoryModel.find({ userId })
      .sort({ createdAt: -1 })
      .lean<UserPasswordHistoryLeanFromMongoDB[]>()
      .exec();

    return documents.map((doc) => this.mapToDomain(doc));
  }

  // Exists password hash for user
  async existsPasswordHash(userId: string, passwordHash: string): Promise<boolean> {
    await connectDB();

    const count = await MongooseUserPasswordHistoryModel.countDocuments({
      userId,
      passwordHash,
    }).exec();

    return count > 0;
  }

  // Mapper
  private mapToDomain(document: UserPasswordHistoryLeanFromMongoDB): UserPasswordHistory {
    return UserPasswordHistory.fromPersistence({
      _id: document._id.toString(),
      userId: document.userId,
      passwordHash: document.passwordHash,
      createdAt: document.createdAt,
    });
  }
}
