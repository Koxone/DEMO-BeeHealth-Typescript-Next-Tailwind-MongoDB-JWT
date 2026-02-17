import { useQuery } from '@tanstack/react-query';
import { GetAllWorkoutTemplatesResponse } from '@/application/use-cases/workout/GetAllWorkoutTemplatesUseCase';

export const useGetAllWorkouts = () => {
  return useQuery<GetAllWorkoutTemplatesResponse>({
    queryKey: ['workouts'],
    queryFn: async () => {
      const response = await fetch('/api/workouts/all-workouts');

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      return response.json();
    },

    staleTime: 1000 * 60 * 60 * 24, // 24 hours
    gcTime: 1000 * 60 * 60 * 24, // 24 hours
  });
};
