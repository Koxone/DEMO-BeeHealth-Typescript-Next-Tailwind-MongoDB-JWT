import {
  ComplianceStatusEnum,
  UserSpecialty,
  WorkoutDifficultyEnum,
  WorkoutStatusEnum,
} from '@/domain/enums';

export interface WorkoutPlanSnapshotDTOPresentation {
  originalWorkoutId: string;
  name: string;
  type: string;
  category: string;
  difficulty: WorkoutDifficultyEnum;
  duration: number;
  about: string;
  instructions: string[];
  benefits: string[];
  cautions: string[];
  images: string[];
  video: string;
}

export interface WorkoutPlanDTOPresentation {
  id: string;
  parentId: string | null;
  specialty: UserSpecialty;
  patientId: string;
  workoutId: string;
  consultationId: string;
  startDate: Date;
  endDate: Date;
  workoutSnapshot: WorkoutPlanSnapshotDTOPresentation;
  status: WorkoutStatusEnum;
  compliance: {
    status: ComplianceStatusEnum;
    rating: number;
    doctorNotes: string;
  };
  createdAt: Date;
  updatedAt: Date;
}
