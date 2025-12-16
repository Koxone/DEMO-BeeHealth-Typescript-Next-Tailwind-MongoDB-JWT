import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IWeightLog extends Document {
  patient: Types.ObjectId;
  clinicalRecord: Types.ObjectId;

  originalWeight: number;
  previousWeight: number;
  currentWeight: number;

  differenceFromPrevious: number;
  differenceFromOriginal: number;

  originalSize: number;
  previousSize: number;
  currentSize: number;

  differenceSizeFromPrevious: number;
  differenceSizeFromOriginal: number;
}

const WeightLogSchema: Schema<IWeightLog> = new Schema(
  {
    patient: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    clinicalRecord: { type: Schema.Types.ObjectId, ref: 'ClinicalRecord', required: true },

    originalWeight: { type: Number, required: true },
    previousWeight: { type: Number },
    currentWeight: { type: Number },

    differenceFromPrevious: { type: Number },
    differenceFromOriginal: { type: Number },

    originalSize: { type: Number, required: true },
    previousSize: { type: Number },
    currentSize: { type: Number },

    differenceSizeFromPrevious: { type: Number },
    differenceSizeFromOriginal: { type: Number },
  },
  { timestamps: true }
);

WeightLogSchema.index({ patient: 1, createdAt: -1 });

WeightLogSchema.pre('save', function (next) {
  this.differenceFromPrevious = this.currentWeight - this.previousWeight;
  this.differenceFromOriginal = this.currentWeight - this.originalWeight;
  
  this.differenceSizeFromPrevious = this.currentSize - this.previousSize;
  this.differenceSizeFromOriginal = this.currentSize - this.originalSize;
});

export default WeightLogSchema;
export const WeightLog =
  mongoose.models.WeightLog || mongoose.model<IWeightLog>('WeightLog', WeightLogSchema);
