import { LatestConsultationResponseDTOPresentation } from '@/presentation/types/consultation.types';
import { useQuery } from '@tanstack/react-query';

/**
 * Hook para obtener la última consulta registrada de un paciente
 * @param patientId ID del paciente
 */
export const useGetLatestConsultation = (patientId: string | undefined) => {
  return useQuery<LatestConsultationResponseDTOPresentation>({
    queryKey: ['latest-consultation', patientId],
    queryFn: async () => {
      const response = await fetch(`/api/users/${patientId}/consultation/latest`);

      if (response.status === 404) {
        throw new Error('No se encontró ninguna consulta');
      }

      if (!response.ok) {
        throw new Error('Error al obtener la última consulta');
      }

      return response.json();
    },
    enabled: !!patientId,
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
    gcTime: 1000 * 60 * 60 * 24, // 24 hours
  });
};

// Usage example:
// const { data, error, isLoading } = useGetLatestConsultation(patientId);
