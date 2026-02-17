import { UserSpecialty, QuestionType } from '@/domain/enums/';

export interface ClinicalHistoryTemplateTypeDomain {
  id: string;
  specialty: UserSpecialty;
  version: number;
  isActive: boolean;
  sections: ClinicalHistoryTemplateSectionTypeDomain[];
  createdAt: string;
  updatedAt: string;
}

export interface ClinicalHistoryTemplateSectionTypeDomain {
  order: number;
  category: string;
  questions: ClinicalHistoryTemplateQuestionTypeDomain[];
}

export interface ClinicalHistoryTemplateQuestionTypeDomain {
  questionId: string;
  text: string;
  type: QuestionType;
  required: boolean;
  isMetric?: boolean;
  options?: { label: string; value: string }[];
  placeholder?: string;
}
