import { useQuery } from '@tanstack/react-query';

// Enums, Types and Interfaces
import { ConsultationDTOPresentation } from '@/presentation/types';

export const useGetPatientConsultations = (patientId: string) => {
  return useQuery<ConsultationDTOPresentation[] | null, Error>({
    queryKey: ['consultation', 'weight', patientId],
    queryFn: async () => {
      if (!patientId) return null;

      const response = await fetch(
        `/api/consultation/patient-consultations?patientId=${patientId}`
      );

      if (response.status === 404) {
        return null;
      }

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Error al obtener la consulta');
      }

      return response.json();
    },
    enabled: !!patientId,
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
    gcTime: 1000 * 60 * 60 * 24, // 24 hours
  });
};

// Usage Example:
// const { data: consultation, isLoading, error } = useGetPatientConsultations(patientId);
