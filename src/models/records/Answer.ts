import mongoose, { Schema, Document, Types } from 'mongoose';
import { IQuestion } from './Question';

export interface IAnswer extends Document {
  question: Types.ObjectId | IQuestion;
  questionId: number;
  value: string | number | boolean | null;
}

const AnswerSchema: Schema<IAnswer> = new Schema({
  question: { type: Schema.Types.ObjectId, ref: 'Question', required: true },
  questionId: { type: Number, required: true },
  value: { type: Schema.Types.Mixed, default: null },
});

export default AnswerSchema;
export const Answer = mongoose.models.Answer || mongoose.model<IAnswer>('Answer', AnswerSchema);
