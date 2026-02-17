import { TimelineEventTypeEnum, UserSpecialty } from '@/domain/enums/';
import {
  getTimelineCategory,
  TimelineCategoryEnum,
} from '@/domain/enums/patient-timeline/TimelineCategoryEnum';

interface PatientTimelinePropsDomain {
  id: string;
  patientId: string;
  consultationId: string;
  specialty: UserSpecialty;
  eventType: TimelineEventTypeEnum;
  resourceId?: string; // ID from related resource (e.g DietPlan or WorkoutPlan)
  snapshot?: any;
  createdAt: Date;
}

// Entity
export class PatientTimeline {
  private id: string;
  private patientId: string;
  private consultationId: string;
  private specialty: UserSpecialty;
  private eventType: TimelineEventTypeEnum;
  private resourceId?: string;
  private snapshot?: any;
  private readonly createdAt: Date;

  private constructor(props: PatientTimelinePropsDomain) {
    this.id = props.id;
    this.patientId = props.patientId;
    this.consultationId = props.consultationId;
    this.specialty = props.specialty;
    this.eventType = props.eventType;
    this.resourceId = props.resourceId;
    this.snapshot = props.snapshot;
    this.createdAt = props.createdAt;
  }

  static create(props: {
    patientId: string;
    consultationId: string;
    specialty: UserSpecialty;
    eventType: TimelineEventTypeEnum;
    resourceId?: string;
    snapshot?: any;
  }): PatientTimeline {
    return new PatientTimeline({
      id: '', // Temporary placeholder, will be set by Infrastructure layer
      ...props,
      createdAt: new Date(),
    });
  }

  static fromPersistence(props: PatientTimelinePropsDomain): PatientTimeline {
    return new PatientTimeline(props);
  }

  // Getters
  getId(): string {
    return this.id;
  }

  getConsultationId(): string {
    return this.consultationId;
  }

  getPatientId(): string {
    return this.patientId;
  }

  getEventType(): TimelineEventTypeEnum {
    return this.eventType;
  }

  getCategory(): TimelineCategoryEnum {
    return getTimelineCategory(this.eventType);
  }

  getCreatedAt(): Date {
    return this.createdAt;
  }

  getSpecialty(): UserSpecialty {
    return this.specialty;
  }

  getResourceId(): string | undefined {
    return this.resourceId;
  }

  getSnapshot(): any {
    return this.snapshot;
  }

  toPersistence(): Omit<PatientTimelinePropsDomain, 'id'> {
    return {
      consultationId: this.consultationId,
      patientId: this.patientId,
      specialty: this.specialty,
      eventType: this.eventType,
      resourceId: this.resourceId,
      snapshot: this.snapshot,
      createdAt: this.createdAt,
    };
  }
}
