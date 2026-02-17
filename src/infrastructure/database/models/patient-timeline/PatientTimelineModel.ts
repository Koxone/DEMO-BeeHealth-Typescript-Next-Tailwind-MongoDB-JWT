import { UserSpecialty, TimelineEventTypeEnum } from '@/domain/enums/';
import mongoose, { Schema, Document, Types } from 'mongoose';

// Prop Types
export interface IPatientTimeline extends Document {
  specialty: UserSpecialty;
  patientId: Types.ObjectId;
  eventType: TimelineEventTypeEnum;
  resourceId?: Types.ObjectId;
  snapshot?: Record<string, any>;
  createdAt: Date;
}

const PatientTimelineSchema: Schema<IPatientTimeline> = new Schema(
  {
    specialty: {
      type: String,
      required: true,
      enum: Object.values(UserSpecialty),
    },
    patientId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    eventType: {
      type: String,
      required: true,
      enum: [...Object.values(TimelineEventTypeEnum)],
    },
    resourceId: {
      type: Schema.Types.ObjectId,
    },
    snapshot: {
      type: Schema.Types.Mixed,
    },
    createdAt: {
      type: Date,
      required: true,
    },
  },
  {
    versionKey: false,
  }
);

PatientTimelineSchema.index({ patientId: 1, createdAt: -1 });
PatientTimelineSchema.index({ patientId: 1, eventType: 1 });

export const PatientTimelineModel =
  mongoose.models.PatientTimeline ||
  mongoose.model<IPatientTimeline>('PatientTimeline', PatientTimelineSchema);
