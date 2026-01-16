import {
  IPatientTimeline,
  TimelineEventType,
  ComplianceStatus,
} from '../../models/records/PatientTimeline';

export interface TimelineEvent {
  _id: string;
  patient: {
    _id: string;
    fullName: string;
    email: string;
  };
  doctor: {
    _id: string;
    fullName: string;
    email: string;
  };
  eventType: TimelineEventType; 
  diet?: string;
  workout?: string;
  clinicalRecord?: string;
  snapshot?: Record<string, any>;
  compliance: {
    status: ComplianceStatus; 
    rating?: number;
    doctorNotes?: string;
    reviewedAt?: Date;
    reviewedBy?: string;
  };
  isActive: boolean;
  startDate: Date;
  completedDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface TimelineCreateRequest {
  eventType: TimelineEventType;
  diet?: string;
  workout?: string;
  clinicalRecord?: string;
  snapshot?: Record<string, any>;
  compliance?: {
    status: ComplianceStatus;
    rating?: number;
    doctorNotes?: string;
    reviewedAt?: Date;
    reviewedBy?: string;
  };
  startDate?: Date;
  completedDate?: Date;
}


export type TimelineCreateFormData = {
  eventType: TimelineEventType;
  diet?: string;
  workout?: string;
  clinicalRecord?: string;
  snapshot?: {
    dietName?: string;
    workoutName?: string;
    weight?: number;
    size?: number;
  };
  compliance?: {
    status: ComplianceStatus;
    rating?: number;
    doctorNotes?: string;
  };
  startDate?: Date;
  isActive?: boolean;
  dietId?: string;
};
