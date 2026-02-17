import { ClinicalHistoryMapper } from '@/presentation/services/clinicalHistoryMapper';
import { WeightClinicalSummaryDTOPresentation } from '@/presentation/types/clinical-history.types';
import { useQuery } from '@tanstack/react-query';

export const useGetMyWeightSummary = () => {
  return useQuery<WeightClinicalSummaryDTOPresentation>({
    queryKey: ['clinical-history', 'my-weight-summary'],

    queryFn: async () => {
      const response = await fetch('/api/clinical-history/my-weight-summary', {
        credentials: 'include',
      });

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

    staleTime: 1000 * 60 * 60 * 24, // 24 hours
    gcTime: 1000 * 60 * 60 * 24, // 24 hours
  });
};
