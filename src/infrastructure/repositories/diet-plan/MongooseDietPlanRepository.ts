import { DietPlan } from '@/domain/entities/diet-plan/DietPlan';
import { DietPlanStatusEnum } from '@/domain/enums/';
import { DietPlanRepository } from '@/domain/repositories/diet-plan/DietPlanRepository';
import { DietPlanModel } from '@/infrastructure/database/models/diet-plan/DietPlanModel';
import { DietPlanMapper } from '@/infrastructure/mappers/diet-plan/DietPlanMapper';
import mongoose from 'mongoose';

export class MongooseDietPlanRepository implements DietPlanRepository {
  async save(dietPlan: DietPlan): Promise<void> {
    const data = dietPlan.toPersistence();

    // Create
    await DietPlanModel.create({
      consultationId: data.consultationId,
      parentId: data.parentId,
      specialty: data.specialty,
      patientId: data.patientId,
      dietId: data.dietId,
      startDate: data.startDate,
      endDate: data.endDate,
      dietSnapshot: data.dietSnapshot,
      status: data.status,
      compliance: data.compliance,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    });
  }

  async findByConsultationId(consultationId: string): Promise<DietPlan[]> {
    const docs = await DietPlanModel.find({ consultationId }).sort({
      createdAt: -1,
    });

    // Mapping list
    return docs.map((doc) =>
      DietPlan.fromPersistence({
        id: doc._id.toString(),
        consultationId: doc.consultationId,
        parentId: doc.parentId?.toString() || null,
        specialty: doc.specialty,
        patientId: doc.patientId.toString(),
        dietId: doc.dietId.toString(),
        startDate: doc.startDate,
        endDate: doc.endDate,
        dietSnapshot: doc.dietSnapshot,
        status: doc.status,
        compliance: doc.compliance,
        createdAt: doc.createdAt,
        updatedAt: doc.updatedAt,
      })
    );
  }

  async findAllByConsultationIds(consultationIds: string[]): Promise<DietPlan[]> {
    const raws = await DietPlanModel.find({
      consultationId: {
        $in: consultationIds.map((id) => new mongoose.Types.ObjectId(id)),
      },
    }).lean();

    return raws.map((raw) => DietPlanMapper.toDomain(raw));
  }

  async findById(id: string): Promise<DietPlan | null> {
    const doc = await DietPlanModel.findById(id);
    if (!doc) return null;

    // Mapping
    return DietPlan.fromPersistence({
      id: doc._id.toString(),
      consultationId: doc.consultationId,
      specialty: doc.specialty,
      patientId: doc.patientId.toString(),
      dietId: doc.dietId.toString(),
      parentId: doc.parentId?.toString() || null,
      startDate: doc.startDate,
      endDate: doc.endDate,
      dietSnapshot: doc.dietSnapshot,
      status: doc.status,
      compliance: doc.compliance,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
    });
  }

  async findByPatientId(patientId: string): Promise<DietPlan[]> {
    const docs = await DietPlanModel.find({ patientId }).sort({
      createdAt: -1,
    });

    // Mapping list
    return docs.map((doc) =>
      DietPlan.fromPersistence({
        id: doc._id.toString(),
        consultationId: doc.consultationId,
        specialty: doc.specialty,
        patientId: doc.patientId.toString(),
        dietId: doc.dietId.toString(),
        parentId: doc.parentId?.toString() || null,
        startDate: doc.startDate,
        endDate: doc.endDate,
        dietSnapshot: doc.dietSnapshot,
        status: doc.status,
        compliance: doc.compliance,
        createdAt: doc.createdAt,
        updatedAt: doc.updatedAt,
      })
    );
  }

  async update(dietPlan: DietPlan): Promise<void> {
    const data = dietPlan.toPersistence();

    // Update
    await DietPlanModel.findByIdAndUpdate(dietPlan.getId(), {
      consultationId: data.consultationId,
      parentId: data.parentId,
      specialty: data.specialty,
      patientId: data.patientId,
      dietId: data.dietId,
      startDate: data.startDate,
      endDate: data.endDate,
      dietSnapshot: data.dietSnapshot,
      status: data.status,
      compliance: data.compliance,
      updatedAt: new Date(),
    });
  }

  async findActiveByPatientId(patientId: string): Promise<DietPlan | null> {
    const doc = await DietPlanModel.findOne({
      patientId,
      status: { $in: [DietPlanStatusEnum.ACTIVE, DietPlanStatusEnum.RENEWED] },
    }).sort({ createdAt: -1 });

    if (!doc) return null;
    return DietPlanMapper.toDomain(doc);
  }

  async findHistoryByParentId(parentId: string): Promise<DietPlan[]> {
    const docs = await DietPlanModel.find({ parentId }).sort({ createdAt: 1 });
    return docs.map((doc) => DietPlanMapper.toDomain(doc));
  }

  async saveEvolution(supersededPlan: DietPlan, newPlan: DietPlan): Promise<void> {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      const supersededData = supersededPlan.toPersistence();
      await DietPlanModel.findByIdAndUpdate(
        supersededPlan.getId(),
        {
          status: supersededData.status,
          compliance: supersededData.compliance,
          updatedAt: supersededData.updatedAt,
        },
        { session }
      );

      const newData = newPlan.toPersistence();
      await DietPlanModel.create(
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
