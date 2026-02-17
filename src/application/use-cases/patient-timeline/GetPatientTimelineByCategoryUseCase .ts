// Domain
import { PatientTimelineRepository } from '@/domain/repositories/patient-timeline/PatientTimelineRepository';
import { PatientTimelineResponseDTO } from '@/application/dto/patient-timeline/PatientTimelineResponseDTO';
import { TimelineCategoryEnum } from '@/domain/enums';

export class GetPatientTimelineByCategoryUseCase {
  constructor(private readonly timelineRepository: PatientTimelineRepository) {}

  async execute(
    patientId: string,
    category: TimelineCategoryEnum
  ): Promise<PatientTimelineResponseDTO[]> {
    const events = await this.timelineRepository.findAllByPatientIdAndCategory(patientId, category);

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
