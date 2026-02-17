import { PatientTimeline } from '@/domain/entities/patient-timeline/PatientTimeline';
import { TimelineCategoryEnum } from '@/domain/enums';
import { TimelineEventTypeEnum } from '@/domain/enums/patient-timeline/TimelineEventTypeEnum';

export interface PatientTimelineRepository {
  findById(id: string): Promise<PatientTimeline | null>;
  findByConsultationId(consultationId: string): Promise<PatientTimeline[]>;
  update(event: PatientTimeline): Promise<void>;
  save(event: PatientTimeline): Promise<void>;
  findByPatientId(patientId: string): Promise<PatientTimeline[]>;
  findAllByPatientId(patientId: string): Promise<PatientTimeline[]>;
  findAllByPatientIdAndEventType(
    patientId: string,
    eventType: TimelineEventTypeEnum
  ): Promise<PatientTimeline[]>;

  findAllByPatientIdAndCategory(
    patientId: string,
    category: TimelineCategoryEnum
  ): Promise<PatientTimeline[]>;
}
