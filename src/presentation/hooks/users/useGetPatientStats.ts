import { PatientClinicalStatsDTOPresentation } from '@/presentation/types';
import { useQuery } from '@tanstack/react-query';

export const useGetPatientStats = (patientId: string | undefined) => {
  return useQuery<PatientClinicalStatsDTOPresentation>({
    queryKey: ['patient-stats', patientId],
    queryFn: async () => {
      const response = await fetch(`/api/users/${patientId}/stats`);

      if (!response.ok) {
        throw new Error('Error al obtener las estadísticas del paciente');
      }

      return response.json();
    },
    enabled: !!patientId,
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
    gcTime: 1000 * 60 * 60 * 24, // 24 hours
  });
};

// Usage Example:
// const { data, error, isLoading } = useGetPatientStats('some-patient-id');

// How to invalidate the cache after updating stats:
// import { useQueryClient } from '@tanstack/react-query';
// const queryClient = useQueryClient();
//  queryClient.invalidateQueries({queryKey: ['patient-stats', patientId],});
