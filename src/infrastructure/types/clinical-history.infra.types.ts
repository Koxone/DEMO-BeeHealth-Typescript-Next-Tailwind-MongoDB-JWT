import { QuestionType } from '@/domain/enums/';

export interface ClinicalHistoryAnswerDTOInfraestructure {
  questionId: number;
  questionText: string;
  questionType: QuestionType;
  value: any;
}
