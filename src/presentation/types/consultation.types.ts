import { UserSpecialty, QuestionType } from '@/domain/enums/';

export interface WeightHistoryPoint {
  date: string;
  weight: number;
}

export interface ConsultationAnswerDTOPresentation {
  questionId: number;
  questionText: string;
  questionType: QuestionType;
  value: any;
}

export interface LatestConsultationResponseDTOPresentation {
  id: string;
  props: {
    patientId: string;
    specialty: UserSpecialty;
    answers: {
      answers: ConsultationAnswerDTOPresentation[];
    };
  };
  createdAt: string;
  updatedAt: string;
}

export interface DietPlanSummaryDTOPresentation {
  id: string; // DietPlan assignment ID
  dietId: string; // Original DietTemplate ID
  dietName: string;
  createdAt: string; // ISO String
}

export interface WorkoutPlanSummaryDTOPresentation {
  id: string; // WorkoutPlan assignment ID
  workoutId: string; // Original WorkoutTemplate ID
  workoutName: string;
  createdAt: string; // ISO String
}

export interface ConsultationWithDietPlanDTOPresentation {
  id: string;
  patientId: string;
  specialty: UserSpecialty;
  answers: ConsultationAnswerDTOPresentation[];
  dietPlan: DietPlanSummaryDTOPresentation;
  createdAt: string; // ISO String
  updatedAt: string; // ISO String
}

// MAIN SOURCE OF TRUTH: ConsultationDTO
export interface ConsultationDTOPresentation {
  id: string;
  patientId: string;
  specialty: UserSpecialty;
  answers: ConsultationAnswerDTOPresentation[];
  dietPlans: DietPlanSummaryDTOPresentation[] | null;
  workoutPlans: WorkoutPlanSummaryDTOPresentation[] | null;
  isActive: boolean;
  createdAt: string; // ISO String
  updatedAt: string; // ISO String
}
