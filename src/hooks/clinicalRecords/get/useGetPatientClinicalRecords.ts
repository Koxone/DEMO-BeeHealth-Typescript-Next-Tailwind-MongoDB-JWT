import { useQuery } from '@tanstack/react-query';

/* Types */
import { IClinicalRecord, IClinicalRecordResponse } from '@/types';

export function useGetPatientClinicalRecords(id: string) {
  /* Fetcher */
  const fetchRecords = async (): Promise<IClinicalRecord[]> => {
    const res = await fetch(`/api/clinicalRecords/${id}`);
    if (!res.ok) throw new Error('Error fetching clinical records');

    // Parse json
    const json: IClinicalRecordResponse = await res.json();

    // Sort newest first
    return [...json.data].sort(
      (a, b) => new Date(b.recordDate).getTime() - new Date(a.recordDate).getTime()
    );
  };

  /* Query */
  const query = useQuery({
    queryKey: ['clinical-records', id],
    queryFn: fetchRecords,
    staleTime: 1000 * 60 * 2,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    enabled: Boolean(id),
    retry: 1,
  });

  return {
    data: query.data ?? null,
    isLoading: query.isLoading,
    error: query.error ?? null,
    refetch: query.refetch,
  };
}
