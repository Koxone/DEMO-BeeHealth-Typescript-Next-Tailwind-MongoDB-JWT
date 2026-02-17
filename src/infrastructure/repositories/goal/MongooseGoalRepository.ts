import { Goal } from '@/domain/entities/goal/Goal';
import { GoalStatusEnum } from '@/domain/enums/';
import { GoalRepository } from '@/domain/repositories/goal/GoalRepository';
import GoalModel from '@/infrastructure/database/models/goal/GoalModel';
import { GoalMapper } from '@/infrastructure/mappers/goal/GoalMapper';

export class MongooseGoalRepository implements GoalRepository {
  async save(goal: Goal): Promise<Goal> {
    const data = goal.toPersistence();

    const doc = await GoalModel.create({
      patientId: data.patientId,
      consultationId: data.consultationId,
      specialty: data.specialty,
      initialValue: data.initialValue,
      targetValue: data.targetValue,
      status: data.status,
      notes: data.notes,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    });

    return GoalMapper.toDomain(doc);
  }

  async findById(id: string): Promise<Goal | null> {
    const doc = await GoalModel.findById(id);
    if (!doc) return null;

    return GoalMapper.toDomain(doc);
  }

  async findByPatientId(patientId: string): Promise<Goal[]> {
    const docs = await GoalModel.find({ patientId }).sort({
      createdAt: -1,
    });

    return docs.map((doc) => GoalMapper.toDomain(doc));
  }

  async findByConsultationId(consultationId: string): Promise<Goal[]> {
    const docs = await GoalModel.find({ consultationId }).sort({
      createdAt: -1,
    });

    return docs.map((doc) => GoalMapper.toDomain(doc));
  }

  async findActiveByPatientId(patientId: string): Promise<Goal | null> {
    const doc = await GoalModel.findOne({
      patientId,
      status: GoalStatusEnum.ACTIVE,
    }).sort({ createdAt: -1 });

    if (!doc) return null;
    return GoalMapper.toDomain(doc);
  }

  async update(goal: Goal): Promise<void> {
    const data = goal.toPersistence();

    await GoalModel.findByIdAndUpdate(
      goal.getId(),
      {
        $set: {
          status: data.status,
          notes: data.notes,
          initialValue: data.initialValue,
          targetValue: data.targetValue,
          finalValue: data.finalValue,
          updatedAt: new Date(),
        },
      },
      { runValidators: true }
    );
  }

  async delete(id: string): Promise<void> {
    await GoalModel.findByIdAndDelete(id);
  }
}
