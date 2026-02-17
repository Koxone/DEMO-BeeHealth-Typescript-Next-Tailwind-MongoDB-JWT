import { UserSpecialty, QuestionType } from '@/domain/enums/';

export interface WeightClinicalMetricsDTOPresentation {
  age: string | number;
  gender: string;
  initialWeight: string | number;
  weightGoal: string | number;
  initialHeight: string | number;
  initialSize: string | number;
}

export interface WeightClinicalSummaryDTOPresentation {
  patientId: string;
  specialty: UserSpecialty;
  lastUpdate: string; // ISO String
  metrics: WeightClinicalMetricsDTOPresentation;
}

export interface ClinicalHistoryAnswerDTOPresentation {
  questionId: number;
  questionText: string;
  questionType: QuestionType;
  value: any;
}

export interface ClinicalHistoryDTOPresentation {
  id: string;
  patientId: string;
  specialty: UserSpecialty;
  answers: ClinicalHistoryAnswerDTOPresentation[];
  isActive: boolean;
  createdAt: string; // ISO String
  updatedAt: string; // ISO String
}

export interface ClinicalHistoryQuestionOptionDTOPresentation {
  label: string;
  value: string;
}

export interface ClinicalHistoryQuestionDTOPresentation {
  questionId: number;
  text: string;
  type: QuestionType;
  category: string;
  required: boolean;
  isMetric?: boolean;
  options?: ClinicalHistoryQuestionOptionDTOPresentation[];
  placeholder?: string;
}

export interface ClinicalHistoryTemplateSectionDTOPresentation {
  order: number;
  category: string;
  questions: ClinicalHistoryQuestionDTOPresentation[];
}
