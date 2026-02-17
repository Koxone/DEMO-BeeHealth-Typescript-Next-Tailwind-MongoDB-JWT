import { WorkoutPlan } from '@/domain/entities/workout-plan/WorkoutPlan';
import { WorkoutStatusEnum } from '@/domain/enums/';
import { WorkoutPlanRepository } from '@/domain/repositories/workout-plan/WorkoutPlanRepository';
import WorkoutPlanModel from '@/infrastructure/database/models/workout-plan/WorkoutPlanModel';
import { WorkoutPlanMapper } from '@/infrastructure/mappers/workout-plan/WorkoutPlanMapper';
import mongoose from 'mongoose';

export class MongooseWorkoutPlanRepository implements WorkoutPlanRepository {
  async save(workoutPlan: WorkoutPlan): Promise<void> {
    const data = workoutPlan.toPersistence();

    await WorkoutPlanModel.create({
      consultationId: data.consultationId,
      parentId: data.parentId,
      specialty: data.specialty,
      patientId: data.patientId,
      workoutId: data.workoutId,
      startDate: data.startDate,
      endDate: data.endDate,
      workoutSnapshot: data.workoutSnapshot,
      status: data.status,
      compliance: data.compliance,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    });
  }

  async findByConsultationId(consultationId: string): Promise<WorkoutPlan[]> {
    const docs = await WorkoutPlanModel.find({ consultationId }).sort({
      createdAt: -1,
    });

    return docs.map((doc) =>
      WorkoutPlan.fromPersistence({
        id: doc._id.toString(),
        consultationId: doc.consultationId.toString(),
        parentId: doc.parentId?.toString() || null,
        specialty: doc.specialty,
        patientId: doc.patientId.toString(),
        workoutId: doc.workoutId.toString(),
        startDate: doc.startDate,
        endDate: doc.endDate,
        workoutSnapshot: doc.workoutSnapshot,
        status: doc.status,
        compliance: doc.compliance,
        createdAt: doc.createdAt,
        updatedAt: doc.updatedAt,
      })
    );
  }

  async findAllByConsultationIds(consultationIds: string[]): Promise<WorkoutPlan[]> {
    const raws = await WorkoutPlanModel.find({
      consultationId: {
        $in: consultationIds.map((id) => new mongoose.Types.ObjectId(id)),
      },
    }).lean();

    return raws.map((raw) => WorkoutPlanMapper.toDomain(raw));
  }

  async findById(id: string): Promise<WorkoutPlan | null> {
    const doc = await WorkoutPlanModel.findById(id);
    if (!doc) return null;

    return WorkoutPlan.fromPersistence({
      id: doc._id.toString(),
      consultationId: doc.consultationId.toString(),
      specialty: doc.specialty,
      patientId: doc.patientId.toString(),
      workoutId: doc.workoutId.toString(),
      parentId: doc.parentId?.toString() || null,
      startDate: doc.startDate,
      endDate: doc.endDate,
      workoutSnapshot: doc.workoutSnapshot,
      status: doc.status,
      compliance: doc.compliance,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
    });
  }

  async findByPatientId(patientId: string): Promise<WorkoutPlan[]> {
    const docs = await WorkoutPlanModel.find({ patientId }).sort({
      createdAt: -1,
    });

    return docs.map((doc) =>
      WorkoutPlan.fromPersistence({
        id: doc._id.toString(),
        consultationId: doc.consultationId.toString(),
        specialty: doc.specialty,
        patientId: doc.patientId.toString(),
        workoutId: doc.workoutId.toString(),
        parentId: doc.parentId?.toString() || null,
        startDate: doc.startDate,
        endDate: doc.endDate,
        workoutSnapshot: doc.workoutSnapshot,
        status: doc.status,
        compliance: doc.compliance,
        createdAt: doc.createdAt,
        updatedAt: doc.updatedAt,
      })
    );
  }

  async update(workoutPlan: WorkoutPlan): Promise<void> {
    const data = workoutPlan.toPersistence();

    await WorkoutPlanModel.findByIdAndUpdate(workoutPlan.getId(), {
      consultationId: data.consultationId,
      parentId: data.parentId,
      specialty: data.specialty,
      patientId: data.patientId,
      workoutId: data.workoutId,
      startDate: data.startDate,
      endDate: data.endDate,
      workoutSnapshot: data.workoutSnapshot,
      status: data.status,
      compliance: data.compliance,
      updatedAt: new Date(),
    });
  }

  async findActiveByPatientId(patientId: string): Promise<WorkoutPlan | null> {
    const doc = await WorkoutPlanModel.findOne({
      patientId,
      status: { $in: [WorkoutStatusEnum.ACTIVE, WorkoutStatusEnum.RENEWED] },
    }).sort({ createdAt: -1 });

    if (!doc) return null;
    return WorkoutPlanMapper.toDomain(doc);
  }

  async findHistoryByParentId(parentId: string): Promise<WorkoutPlan[]> {
    const docs = await WorkoutPlanModel.find({ parentId }).sort({ createdAt: 1 });
    return docs.map((doc) => WorkoutPlanMapper.toDomain(doc));
  }

  async saveEvolution(supersededPlan: WorkoutPlan, newPlan: WorkoutPlan): Promise<void> {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      const supersededData = supersededPlan.toPersistence();
      await WorkoutPlanModel.findByIdAndUpdate(
        supersededPlan.getId(),
        {
          status: supersededData.status,
          compliance: supersededData.compliance,
          updatedAt: supersededData.updatedAt,
        },
        { session }
      );

      const newData = newPlan.toPersistence();
      await WorkoutPlanModel.create(
        [
          {
            ...newData,
            parentId: supersededPlan.getId(),
          },
        ],
        { session }
      );

      await session.commitTransaction();
    } catch (error) {
      await session.abortTransaction();
      throw error;
    } finally {
      session.endSession();
    }
  }
}
