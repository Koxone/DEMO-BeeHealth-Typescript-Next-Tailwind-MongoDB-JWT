import { QuestionType } from '@/domain/enums/';

export interface ClinicalHistoryAnswerDTOApplication {
  questionId: number;
  questionText: string;
  questionType: QuestionType;
  value: any;
}
