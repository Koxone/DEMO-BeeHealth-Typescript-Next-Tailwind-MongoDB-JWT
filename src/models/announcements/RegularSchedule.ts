import mongoose, { Document, Schema } from 'mongoose';

interface ITimeRange {
  start: string;
  end: string;
}

interface IDaySchedule {
  day: 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday';
  timeRanges: ITimeRange[];
  isActive: boolean;
}

export interface IRegularSchedule extends Document {
  specialty: 'weight' | 'stetic' | 'dental';
  week: IDaySchedule[];
}

const timeRangeSchema = new Schema<ITimeRange>({
  start: { type: String, required: true },
  end: { type: String, required: true },
});

const dayScheduleSchema = new Schema<IDaySchedule>({
  day: {
    type: String,
    required: true,
    enum: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'],
  },

  timeRanges: {
    type: [timeRangeSchema],
    required: true,
  },

  isActive: {
    type: Boolean,
    default: true,
  },
});

const regularScheduleSchema = new Schema<IRegularSchedule>(
  {
    specialty: {
      type: String,
      required: true,
      enum: ['weight', 'stetic', 'dental'],
      unique: true,
    },

    week: {
      type: [dayScheduleSchema],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IRegularSchedule>('RegularSchedule', regularScheduleSchema);
