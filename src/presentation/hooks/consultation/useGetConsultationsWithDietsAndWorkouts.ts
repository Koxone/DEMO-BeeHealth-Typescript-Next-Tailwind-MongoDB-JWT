import { ConsultationDTOPresentation } from '@/presentation/types';
import { useQuery } from '@tanstack/react-query';

export const useGetConsultationsWithDietsAndWorkouts = (patientId: string) => {
  return useQuery<ConsultationDTOPresentation[]>({
    queryKey: ['patient-history', patientId], 
    queryFn: async () => {
      const response = await fetch(`/api/users/${patientId}/consultation/patient-history`);

      if (!response.ok) {
        throw new Error('Error al obtener el historial clínico');
      }

      return response.json();
    },
    enabled: !!patientId, 
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
    gcTime: 1000 * 60 * 60 * 24, // 24 hours
  });
};

// Usage example:
// const { data: consultationsWithDiets, isLoading, error } = useGetConsultationsWithDietPlans(patientId);
