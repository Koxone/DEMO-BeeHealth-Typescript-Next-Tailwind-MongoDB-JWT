import { UserSpecialty, TimelineEventTypeEnum, TimelineCategoryEnum } from '@/domain/enums/';

export interface PatientTimelineEventDTOPresentation {
  id: string;
  consultationId: string;
  patientId: string;
  eventType: TimelineEventTypeEnum;
  category: TimelineCategoryEnum;
  specialty: UserSpecialty;
  resourceId?: string;
  snapshot: any;
  createdAt: string;
}
