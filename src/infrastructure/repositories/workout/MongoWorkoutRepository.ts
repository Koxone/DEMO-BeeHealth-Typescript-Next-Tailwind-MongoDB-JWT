// Domain
import { WorkoutTemplate } from '@/domain/entities/workout/WorkoutTemplate';
import { WorkoutRepository } from '@/domain/repositories/workout/WorkoutRepository';

// Database
import WorkoutTemplateModel from '@/infrastructure/database/models/workout/WorkoutTemplateModel';

// Mappers
import { WorkoutMapper } from '@/infrastructure/services/workout/WorkoutTemplateMapper';

export class MongoWorkoutRepository implements WorkoutRepository {
  public async findById(id: string): Promise<WorkoutTemplate | null> {
    const raw = await WorkoutTemplateModel.findById(id).lean();
    if (!raw) return null;
    return WorkoutMapper.toDomain(raw);
  }

  public async findByCategory(category: string): Promise<WorkoutTemplate[]> {
    const raws = await WorkoutTemplateModel.find({ category }).lean();
    return raws.map((raw) => WorkoutMapper.toDomain(raw));
  }

  public async findAll(): Promise<WorkoutTemplate[]> {
    const raws = await WorkoutTemplateModel.find().lean();
    return raws.map((raw) => WorkoutMapper.toDomain(raw));
  }

  public async save(workout: WorkoutTemplate): Promise<void> {
    const persistenceModel = WorkoutMapper.toPersistence(workout);

    if (workout.id) {
      const { _id, ...updateData } = persistenceModel;
      await WorkoutTemplateModel.findByIdAndUpdate(workout.id, updateData, { upsert: true });
    } else {
      await WorkoutTemplateModel.create(persistenceModel);
    }
  }

  public async delete(id: string): Promise<void> {
    await WorkoutTemplateModel.findByIdAndDelete(id);
  }
}
