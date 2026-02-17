// React Query
import { useQuery } from '@tanstack/react-query';
 
// Types
import { DietPlanResponseDTOPresentation } from '@/presentation/types';

export const useGetPatientDietPlans = (patientId: string | undefined) => {
  return useQuery<DietPlanResponseDTOPresentation[]>({
    queryKey: ['patient-diets', patientId],
    queryFn: async () => {
      const response = await fetch(`/api/users/${patientId}/diets`);

      if (!response.ok) {
        throw new Error('Error fetching patient diet plans');
      }

      const json = await response.json();
      return json.data;
    },
    enabled: !!patientId,
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
    gcTime: 1000 * 60 * 60 * 24, // 24 hours
  });
};

// Usage example in a component
// const { data: dietPlans, isLoading, error } = useGetPatientDietPlans(patientId);
