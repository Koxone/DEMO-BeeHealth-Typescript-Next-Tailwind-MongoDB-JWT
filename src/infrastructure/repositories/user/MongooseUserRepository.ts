import mongoose from 'mongoose';

import { UserRepository } from '@/domain/repositories/user/UserRepository';
import { User } from '@/domain/entities/user/User';
import { Email } from '@/domain/value-objects/Email';
import { UserRole, UserSpecialty } from '@/domain/enums/';
import { connectDB } from '@/infrastructure/database/mongodb';

import MongooseUserModel from '@/infrastructure/database/models/user/UserModel';

// Lean doc type
type UserLeanFromMongoDB = {
  _id: mongoose.Types.ObjectId;
  fullName: string;
  email: string;
  password: string;
  role: UserRole;
  phone: string;
  specialty: UserSpecialty;
  avatar: string | null;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export class MongooseUserRepository implements UserRepository {
  // Find all
  async findAll(): Promise<User[]> {
    await connectDB();

    const documents = await MongooseUserModel.find({}).lean<UserLeanFromMongoDB[]>().exec();

    return documents.map((doc) => this.mapToDomain(doc));
  }

  // Find by id
  async findById(id: string): Promise<User | null> {
    await connectDB();

    const document = await MongooseUserModel.findById(id).lean<UserLeanFromMongoDB>().exec();
    if (!document) return null;

    return this.mapToDomain(document);
  }

  // Find by email
  async findByEmail(email: string): Promise<User | null> {
    await connectDB();

    const document = await MongooseUserModel.findOne({ email }).lean<UserLeanFromMongoDB>().exec();
    if (!document) return null;

    return this.mapToDomain(document);
  }

  // Find by role
  async findByRole(role: UserRole): Promise<User[]> {
    await connectDB();

    const documents = await MongooseUserModel.find({ role }).lean<UserLeanFromMongoDB[]>().exec();

    return documents.map((doc) => this.mapToDomain(doc));
  }

  // Find by phone
  async findByPhone(phone: string): Promise<User | null> {
    await connectDB();

    const document = await MongooseUserModel.findOne({ phone }).lean<UserLeanFromMongoDB>().exec();
    if (!document) return null;

    return this.mapToDomain(document);
  }

  // Find by specialty
  async findBySpecialty(specialty: UserSpecialty): Promise<User[]> {
    await connectDB();

    const documents = await MongooseUserModel.find({ specialty })
      .lean<UserLeanFromMongoDB[]>()
      .exec();

    return documents.map((doc) => this.mapToDomain(doc));
  }

  // Find by role and specialty
  async findByRoleAndSpecialty(role: UserRole, specialty: UserSpecialty): Promise<User[]> {
    await connectDB();

    const documents = await MongooseUserModel.find({
      role,
      specialty,
    })
      .sort({ fullName: 1 })
      .lean<UserLeanFromMongoDB[]>()
      .exec();

    return documents.map((doc) => this.mapToDomain(doc));
  }

  // Exists by email
  async existsByEmail(email: string): Promise<boolean> {
    await connectDB();

    const count = await MongooseUserModel.countDocuments({ email }).exec();
    return count > 0;
  }

  // Exists by id
  async existsById(id: string): Promise<boolean> {
    await connectDB();

    const count = await MongooseUserModel.countDocuments({ _id: id }).exec();
    return count > 0;
  }

  // Update user
  async update(user: User): Promise<void> {
    await connectDB();

    const data = user.toPersistence();

    await MongooseUserModel.updateOne(
      { _id: user.getId() },
      {
        $set: {
          fullName: `${data.name} ${data.lastName}`.trim(),
          email: data.email.getValue(),
          phone: data.phone,
          password: data.passwordHash,
          role: data.role,
          specialty: data.specialty,
          isActive: data.isActive,
          updatedAt: data.updatedAt,
        },
      }
    ).exec();
  }

  // Save new user
  async save(user: User): Promise<void> {
    await connectDB();

    const data = user.toPersistence();

    await MongooseUserModel.create({
      fullName: `${data.name} ${data.lastName}`.trim(),
      email: data.email.getValue(),
      password: data.passwordHash,
      role: data.role,
      phone: data.phone,
      specialty: data.specialty,
      isActive: data.isActive,
    });
  }

  // Mapper
  private mapToDomain(document: UserLeanFromMongoDB): User {
    // Name split
    const [name, ...rest] = (document.fullName || '').trim().split(' ');
    const lastName = rest.join(' ').trim();

    return User.fromPersistence({
      id: document._id.toString(),
      email: Email.create(document.email),
      name,
      lastName,
      phone: document.phone,
      role: document.role,
      specialty: document.specialty,
      avatar: document.avatar ?? null,
      passwordHash: document.password,
      isActive: document.isActive,
      createdAt: document.createdAt,
      updatedAt: document.updatedAt,
    });
  }
}
