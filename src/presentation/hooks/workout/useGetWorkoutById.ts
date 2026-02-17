import { useQuery } from '@tanstack/react-query';
import { WorkoutTemplateDTOPresentation } from '@/presentation/types/workout.types';

export const useGetWorkoutById = (id: string) => {
  return useQuery<WorkoutTemplateDTOPresentation>({
    queryKey: ['workouts', id],
    queryFn: async () => {
      const response = await fetch(`/api/workouts/${id}`);

      if (!response.ok) {
        throw new Error('Workout not found');
      }

      return response.json();
    },
    enabled: !!id,
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
    gcTime: 1000 * 60 * 60 * 24, // 24 hours
  });
};
