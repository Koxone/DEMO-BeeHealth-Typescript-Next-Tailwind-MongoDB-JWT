import { WorkoutDifficultyEnum } from '@/domain/enums/';

export const workoutGetDifficultyColor = (nivel: WorkoutDifficultyEnum) => {
  const map = {
    [WorkoutDifficultyEnum.BEGINNER]:
      'bg-beehealth-green-secondary-light text-beehealth-green-secondary-dark',
    [WorkoutDifficultyEnum.INTERMEDIATE]:
      'bg-beehealth-yellow-secondary-light text-beehealth-yellow-secondary-dark',
    [WorkoutDifficultyEnum.ADVANCED]:
      'bg-beehealth-orange-secondary-light text-beehealth-orange-secondary-dark',
  };
  return map[nivel] || 'bg-gray-100 text-gray-800';
};
