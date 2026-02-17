import { useQuery } from '@tanstack/react-query';
import { GoalDTOPresentation } from '@/presentation/types/goal.types';

export const useGetPatientGoals = (patientId: string, consultationId?: string | null) => {
  return useQuery<GoalDTOPresentation[]>({
    queryKey: ['goals', patientId, consultationId],
    queryFn: async () => {
      const url = new URL(`/api/users/${patientId}/goal/`, window.location.origin);
      if (consultationId) {
        url.searchParams.append('consultationId', consultationId);
      }

      const response = await fetch(url.toString());

      if (!response.ok) {
        throw new Error('Error fetching goals');
      }

      const result = await response.json();
      return result.data;
    },
    enabled: !!patientId,
    staleTime: 1000 * 60 * 5,
  });
};
