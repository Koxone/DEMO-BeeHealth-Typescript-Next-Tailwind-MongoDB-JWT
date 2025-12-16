import { useQuery } from '@tanstack/react-query';
import { ZWorkout } from '@/zod/workouts/workout.schema';
import { workoutsResponseSchema } from '@/zod/workouts/api.workouts.schema';

export function useGetAllWorkouts() {
  const { data, isLoading, error, refetch } = useQuery<ZWorkout[]>({
    queryKey: ['workouts'],
    queryFn: async () => {
      const res = await fetch('/api/workouts');
      if (!res.ok) throw new Error('Failed to fetch workouts');

      const json = await res.json();
      const data = workoutsResponseSchema.parse(json);
      return data.workouts;
    },
  });

  return {
    workoutData: data ?? [],
    isLoading,
    error: error?.message ?? null,
    refetch,
  };
}

// Usage Example:
// const { workoutData, isLoading: workoutsLoading, error: workoutsError, refetch: refetchWorkouts } = useGetAllWorkouts();
