import { WeightHistoryPoint } from '@/presentation/types/consultation.types';
import { useQuery } from '@tanstack/react-query';

export interface WeightHistoryResponse {
  history: WeightHistoryPoint[];
}

export const useGetPatientWeightHistory = (patientId: string) => {
  return useQuery({
    queryKey: ['weight-history', patientId],
    queryFn: async (): Promise<WeightHistoryPoint[]> => {
      if (!patientId) throw new Error('Patient ID is required');

      const response = await fetch(`/api/users/${patientId}/consultation/weight-history`);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Error fetching weight history');
      }

      return response.json();
    },
    enabled: !!patientId,
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
    gcTime: 1000 * 60 * 60 * 24, // 24 hours
  });
};

// Usage example:
// const { data, error, isLoading } = useGetPatientWeightHistory('patientId123');
