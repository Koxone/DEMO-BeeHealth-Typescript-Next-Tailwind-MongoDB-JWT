import { PatientTimeline } from '@/domain/entities/patient-timeline/PatientTimeline';
import { TimelineCategoryEnum, TimelineEventTypeEnum } from '@/domain/enums';
import { PatientTimelineRepository } from '@/domain/repositories/patient-timeline/PatientTimelineRepository';
import { PatientTimelineModel } from '@/infrastructure/database/models/patient-timeline/PatientTimelineModel';

export class MongoosePatientTimelineRepository implements PatientTimelineRepository {
  async save(event: PatientTimeline): Promise<void> {
    const data = event.toPersistence();

    await PatientTimelineModel.create({
      consultationId: data.consultationId,
      patientId: data.patientId,
      specialty: data.specialty.toLowerCase(),
      eventType: data.eventType,
      resourceId: data.resourceId,
      snapshot: data.snapshot,
      createdAt: data.createdAt,
    });
  }

  async findById(id: string): Promise<PatientTimeline | null> {
    const doc = await PatientTimelineModel.findById(id);

    if (!doc) return null;

    return PatientTimeline.fromPersistence({
      id: doc._id.toString(),
      consultationId: doc.consultationId,
      patientId: doc.patientId.toString(),
      specialty: doc.specialty,
      eventType: doc.eventType,
      resourceId: doc.resourceId?.toString(),
      snapshot: doc.snapshot,
      createdAt: doc.createdAt,
    });
  }

  async findByConsultationId(consultationId: string): Promise<PatientTimeline[]> {
    const docs = await PatientTimelineModel.find({ consultationId }).sort({
      createdAt: -1,
    });

    return docs.map((doc) =>
      PatientTimeline.fromPersistence({
        id: doc._id.toString(),
        consultationId: doc.consultationId,
        patientId: doc.patientId.toString(),
        specialty: doc.specialty,
        eventType: doc.eventType,
        resourceId: doc.resourceId?.toString(),
        snapshot: doc.snapshot,
        createdAt: doc.createdAt,
      })
    );
  }

  async update(event: PatientTimeline): Promise<void> {
    await this.save(event);
  }

  async findByPatientId(patientId: string): Promise<PatientTimeline[]> {
    const docs = await PatientTimelineModel.find({ patientId }).sort({
      createdAt: -1,
    });

    return docs.map((doc) =>
      PatientTimeline.fromPersistence({
        id: doc._id.toString(),
        consultationId: doc.consultationId,
        patientId: doc.patientId.toString(),
        specialty: doc.specialty,
        eventType: doc.eventType,
        resourceId: doc.resourceId?.toString(),
        snapshot: doc.snapshot,
        createdAt: doc.createdAt,
      })
    );
  }

  async findAllByPatientId(patientId: string): Promise<PatientTimeline[]> {
    const docs = await PatientTimelineModel.find({ patientId }).sort({
      createdAt: -1,
    });

    return docs.map((doc) =>
      PatientTimeline.fromPersistence({
        id: doc._id.toString(),
        consultationId: doc.consultationId,
        patientId: doc.patientId.toString(),
        specialty: doc.specialty,
        eventType: doc.eventType,
        resourceId: doc.resourceId?.toString(),
        snapshot: doc.snapshot,
        createdAt: doc.createdAt,
      })
    );
  }

  async findAllByPatientIdAndEventType(
    patientId: string,
    eventType: TimelineEventTypeEnum
  ): Promise<PatientTimeline[]> {
    const docs = await PatientTimelineModel.find({
      patientId,
      eventType,
    }).sort({
      createdAt: -1,
    });

    return docs.map((doc) =>
      PatientTimeline.fromPersistence({
        id: doc._id.toString(),
        consultationId: doc.consultationId,
        patientId: doc.patientId.toString(),
        specialty: doc.specialty,
        eventType: doc.eventType,
        resourceId: doc.resourceId?.toString(),
        snapshot: doc.snapshot,
        createdAt: doc.createdAt,
      })
    );
  }

  async findAllByPatientIdAndCategory(
    patientId: string,
    category: TimelineCategoryEnum
  ): Promise<PatientTimeline[]> {
    const regex = new RegExp(`^${category}_`);

    const docs = await PatientTimelineModel.find({
      patientId,
      eventType: { $regex: regex },
    }).sort({
      createdAt: -1,
    });

    return docs.map((doc) =>
      PatientTimeline.fromPersistence({
        id: doc._id.toString(),
        consultationId: doc.consultationId,
        patientId: doc.patientId.toString(),
        specialty: doc.specialty,
        eventType: doc.eventType,
        resourceId: doc.resourceId?.toString(),
        snapshot: doc.snapshot,
        createdAt: doc.createdAt,
      })
    );
  }
}
