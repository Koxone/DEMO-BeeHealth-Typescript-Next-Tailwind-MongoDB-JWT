import { WorkoutPlanDTOPresentation } from './../../types/';
import { useQuery } from '@tanstack/react-query';

export const useGetPatientWorkoutPlans = (patientId: string) => {
  return useQuery<WorkoutPlanDTOPresentation[]>({
    queryKey: ['workouts', patientId],
    queryFn: async () => {
      const response = await fetch(`/api/users/${patientId}/workouts`);
      if (!response.ok) throw new Error('Error al obtener entrenamientos');
      const result = await response.json();
      return result.data;
    },
    enabled: !!patientId,
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
    gcTime: 1000 * 60 * 60 * 24, // 24 hours
  });
};
// Usage Example:
// const { data: workouts, isLoading, error } = useGetPatientWorkoutPlans(patientId);
