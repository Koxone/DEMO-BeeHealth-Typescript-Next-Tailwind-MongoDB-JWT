import mongoose, { Schema, Document, Types } from 'mongoose';

export type TimelineEventType =
  | 'diet_assigned'
  | 'diet_completed'
  | 'diet_removed'
  | 'diet_renewed'
  | 'workout_assigned'
  | 'workout_removed'
  | 'workout_completed'
  | 'workout_renewed'
  | 'record_created'
  | 'record_edited'
  | 'record_deleted';

export type ComplianceStatus = 'pending' | 'completed' | 'partial' | 'not_completed';

export interface IPatientTimeline extends Document {
  patient: Types.ObjectId;
  doctor: Types.ObjectId;
  eventType: TimelineEventType;

  // Optional references to related entities
  diet?: Types.ObjectId;
  workout?: Types.ObjectId;
  clinicalRecord?: Types.ObjectId;

  // Snapshot of relevant data at the time of the event
  snapshot?: {
    dietName?: string;
    workoutName?: string;
    weight?: number;
    size?: number;
    [key: string]: any;
  };

  // Compliance tracking
  compliance: {
    status: ComplianceStatus;
    rating?: number;
    doctorNotes?: string;
    reviewedAt?: Date;
    reviewedBy?: Types.ObjectId;
  };

  isActive: boolean;
  startDate?: Date;
  completedDate?: Date;
}

const PatientTimelineSchema: Schema<IPatientTimeline> = new Schema(
  {
    patient: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    doctor: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    eventType: {
      type: String,
      enum: [
        'diet_assigned',
        'diet_removed',
        'diet_completed',
        'diet_renewed',
        'workout_assigned',
        'workout_removed',
        'workout_completed',
        'workout_renewed',
        'record_created',
        'record_edited',
        'record_deleted',
      ],
      required: true,
    },

    diet: { type: Schema.Types.ObjectId, ref: 'Diet' },
    workout: { type: Schema.Types.ObjectId, ref: 'Workout' },
    clinicalRecord: { type: Schema.Types.ObjectId, ref: 'ClinicalRecord' },

    snapshot: { type: Schema.Types.Mixed },

    compliance: {
      status: {
        type: String,
        enum: ['pending', 'completed', 'partial', 'not_completed'],
        default: 'pending',
      },
      rating: { type: Number, min: 1, max: 5 },
      doctorNotes: { type: String },
      reviewedAt: { type: Date },
      reviewedBy: { type: Schema.Types.ObjectId, ref: 'User' },
    },

    isActive: { type: Boolean, default: true },
    startDate: { type: Date, default: Date.now },
    completedDate: { type: Date },
  },
  { timestamps: true }
);

// Indexes for frequent queries
PatientTimelineSchema.index({ patient: 1, createdAt: -1 });
PatientTimelineSchema.index({ patient: 1, eventType: 1, createdAt: -1 });
PatientTimelineSchema.index({ doctor: 1, createdAt: -1 });
PatientTimelineSchema.index({ patient: 1, 'compliance.status': 1, createdAt: -1 });
PatientTimelineSchema.index({ patient: 1, isActive: 1, createdAt: -1 });

export const PatientTimeline =
  mongoose.models.PatientTimeline ||
  mongoose.model<IPatientTimeline>('PatientTimeline', PatientTimelineSchema);

export default PatientTimeline;
