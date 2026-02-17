import { WorkoutDifficultyEnum } from '@/domain/enums/';

export const WorkoutDifficultyLabelMap: Record<WorkoutDifficultyEnum, string> = {
  [WorkoutDifficultyEnum.BEGINNER]: 'Principiante',
  [WorkoutDifficultyEnum.INTERMEDIATE]: 'Intermedio',
  [WorkoutDifficultyEnum.ADVANCED]: 'Avanzado',
};
