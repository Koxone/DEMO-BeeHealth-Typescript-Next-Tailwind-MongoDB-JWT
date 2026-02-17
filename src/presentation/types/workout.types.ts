import { WorkoutDifficultyEnum, WorkoutCategoryEnum, UserSpecialty } from '@/domain/enums/';

export interface WorkoutTemplateDTOPresentation {
  patients: string[];
  name: string;
  type: WorkoutCategoryEnum | '';
  category: WorkoutCategoryEnum;
  difficulty: WorkoutDifficultyEnum;
  duration: number;
  about: string;
  instructions: string[];
  benefits: string[];
  cautions: string[];
  images: string[];
  video: string;
}

export interface AssignWorkoutDTOPresentation {
  consultationId: string;
  patientId: string;
  specialty: UserSpecialty;
  workoutTemplateId: string;
  durationDays: number;
}
