import { TimelineEventTypeEnum, UserSpecialty } from '@/domain/enums/';
import { TimelineCategoryEnum } from '@/domain/enums/patient-timeline/TimelineCategoryEnum';
import { PatientTimelineRepository } from '@/domain/repositories/patient-timeline/PatientTimelineRepository';

export interface PatientTimelineResponseDTO {
  id: string;
  consultationId: string;
  patientId: string;
  eventType: TimelineEventTypeEnum;
  category: TimelineCategoryEnum;
  specialty: UserSpecialty;
  resourceId: string;
  snapshot: any;
  createdAt: Date;
}

export class GetPatientTimelineUseCase {
  constructor(private readonly timelineRepository: PatientTimelineRepository) {}

  async execute(patientId: string): Promise<PatientTimelineResponseDTO[]> {
    const events = await this.timelineRepository.findAllByPatientId(patientId);

    if (!events || events.length === 0) return [];

    return events
      .sort((a, b) => b.getCreatedAt().getTime() - a.getCreatedAt().getTime())
      .map((event) => ({
        id: event.getId(),
        consultationId: event.getConsultationId(),
        patientId: event.getPatientId(),
        eventType: event.getEventType(),
        specialty: event.getSpecialty(),
        resourceId: event.getResourceId(),
        snapshot: event.getSnapshot(),
        createdAt: event.getCreatedAt(),
        category: event.getCategory(),
      }));
  }
}
