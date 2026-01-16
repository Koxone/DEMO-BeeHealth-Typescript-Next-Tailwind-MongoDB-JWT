import mongoose, { Document, Schema } from 'mongoose';

interface ITimeRange {
  start: string;
  end: string;
}

interface ISpecialSchedule extends Document {
  specialty: 'weight' | 'stetic' | 'dental';
  date: Date;
  title: string;
  description?: string;
  type: 'closed' | 'modified';
  timeRanges?: ITimeRange[];
  isActive: boolean;
}

const timeRangeSchema = new Schema<ITimeRange>(
  {
    start: { type: String, required: true },
    end: { type: String, required: true },
  },
  { _id: false }
);

const specialScheduleSchema = new Schema<ISpecialSchedule>(
  {
    specialty: {
      type: String,
      required: true,
      enum: ['weight', 'stetic', 'dental'],
    },

    date: {
      type: Date,
      required: true,
    },

    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
    },

    type: {
      type: String,
      required: true,
      enum: ['closed', 'modified'],
    },

    timeRanges: {
      type: [timeRangeSchema],
      default: [],
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes
specialScheduleSchema.index({ specialty: 1, date: 1 });
specialScheduleSchema.index({ isActive: 1 });

export default mongoose.model<ISpecialSchedule>('SpecialSchedule', specialScheduleSchema);
