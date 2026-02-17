import { TimelineEventTypeEnum, UserSpecialty } from '@/domain/enums/';
import { TimelineCategoryEnum } from '@/domain/enums/patient-timeline/TimelineCategoryEnum';

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
