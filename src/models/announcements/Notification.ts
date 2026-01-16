import mongoose, { Document, Schema } from 'mongoose';

type NotificationScope = 'personal' | 'massive';

type MassiveCategory = 'schedule' | 'promotion' | 'announcement';
type PersonalCategory = 'appointment' | 'treatment' | 'followup';

type MassiveType =
  // Schedule related types
  | 'early_closure'
  | 'shift_closed'
  | 'day_closed'
  | 'holiday'
  | 'maintenance'

  // Promotion related types
  | 'discount'
  | 'package_deal'
  | 'seasonal_offer'

  // Announcement related types
  | 'massive_general'
  | 'health_tip'
  | 'deals_news';

type PersonalType =
  // Appointment-related types
  | 'new_appointment_created'
  | 'missed_appointment'
  | 'coming_appointment_reminder'
  | 'today_appointment_reminder'
  | 'appointment_needed'

  // Treatment-related types
  | 'diet_assigned'
  | 'diet_completed'
  | 'workout_assigned'
  | 'workout_completed'
  | 'results_ready'
  | 'order_ready'

  // Goal-related types
  | 'new_goal_assigned'
  | 'goal_completed'
  | 'goal_not_completed'

  // Miscellaneous types can be added here
  | 'personal_general';

type NotificationCategory = MassiveCategory | PersonalCategory;
type NotificationType = MassiveType | PersonalType;

export interface INotification extends Document {
  user?: mongoose.Types.ObjectId[];
  scope: NotificationScope;
  category: NotificationCategory;
  type: NotificationType;
  title?: string;
  message: string;
  notes?: string;
  relatedDate?: Date;
  relatedAppointment?: mongoose.Types.ObjectId;
  readBy?: mongoose.Types.ObjectId[];
  isActive: boolean;
  scheduledAt?: Date;
  expiresAt?: Date;
  createdBy: mongoose.Types.ObjectId;
}

const notificationSchema = new Schema<INotification>(
  {
    user: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],

    scope: {
      type: String,
      required: true,
      enum: ['personal', 'massive'],
    },

    category: {
      type: String,
      required: true,
      enum: ['schedule', 'promotion', 'announcement', 'appointment', 'treatment', 'followup'],
    },

    type: {
      type: String,
      required: true,
      enum: [
        'early_closure',
        'shift_closed',
        'day_closed',
        'holiday',
        'maintenance',
        'discount',
        'package_deal',
        'seasonal_offer',
        'massive_general',
        'personal_general',
        'health_tip',
        'deals_news',
        'new_appointment_created',
        'missed_appointment',
        'coming_appointment_reminder',
        'today_appointment_reminder',
        'appointment_needed',
        'diet_assigned',
        'diet_completed',
        'workout_assigned',
        'workout_completed',
        'results_ready',
        'order_ready',
        'new_goal_assigned',
        'goal_completed',
        'goal_not_completed',
      ],
    },

    title: {
      type: String,
      required: false,
    },

    message: {
      type: String,
      required: true,
    },

    notes: {
      type: String,
    },

    relatedDate: {
      type: Date,
    },

    relatedAppointment: {
      type: Schema.Types.ObjectId,
      ref: 'Appointment',
    },

    readBy: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],

    isActive: {
      type: Boolean,
      default: true,
    },

    scheduledAt: {
      type: Date,
    },

    expiresAt: {
      type: Date,
    },

    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

notificationSchema.index({ user: 1 });
notificationSchema.index({ scope: 1 });
notificationSchema.index({ scheduledAt: 1 });
notificationSchema.index({ expiresAt: 1 });

export default mongoose.model<INotification>('Notification', notificationSchema);
