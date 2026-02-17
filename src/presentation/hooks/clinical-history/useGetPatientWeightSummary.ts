import { ClinicalHistoryMapper } from '@/presentation/services/clinicalHistoryMapper';
import { WeightClinicalSummaryDTOPresentation } from '@/presentation/types/clinical-history.types';
import { useQuery } from '@tanstack/react-query';

export const useGetPatientWeightSummary = (patientId: string) => {
  return useQuery<WeightClinicalSummaryDTOPresentation>({
    queryKey: ['clinical-history', 'weight-summary', patientId],

    queryFn: async () => {
      const response = await fetch(`/api/clinical-history/${patientId}/weight-summary`);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Error fetching summary');
      }

      const data = await response.json();

      return {
        ...data,
        metrics: {
          ...data.metrics,
          gender: ClinicalHistoryMapper.toDisplayGender(data.metrics.gender),
        },
      };
    },
    enabled: !!patientId,
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
    gcTime: 1000 * 60 * 60 * 24, // 24 hours
  });
};

// Usage example:
// const { data, error, isLoading } = useGetPatientWeightSummary('patient123');
// if (isLoading) return <div>Loading...</div>;
// if (error) return <div>Error: {error.message}</div>;
// return <div>Weight: {data.metrics.weight}</div>;
