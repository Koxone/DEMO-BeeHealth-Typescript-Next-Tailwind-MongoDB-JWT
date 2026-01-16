// @/@hooks/clinicalRecords/get/useGetTotalWeightLost.ts
import { useQuery } from '@tanstack/react-query';

interface TotalWeightLostResponse {
  totalLost: number;
}

const fetchTotalWeightLost = async (): Promise<TotalWeightLostResponse> => {
  const res = await fetch('/api/clinicalRecords/weight-logs/total');
  if (!res.ok) {
    throw new Error('Error fetching total weight lost');
  }
  return res.json();
};

export const useGetTotalWeightLost = () => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['totalWeightLost'],
    queryFn: fetchTotalWeightLost,
    staleTime: 1000 * 60 * 5, // 5 minutos
  });

  return {
    totalLost: data?.totalLost ?? 0,
    loading: isLoading,
    error,
    refetch,
  };
};

// Usage Example:
// const { totalLost, loading, error, refetch } = useGetTotalWeightLost();