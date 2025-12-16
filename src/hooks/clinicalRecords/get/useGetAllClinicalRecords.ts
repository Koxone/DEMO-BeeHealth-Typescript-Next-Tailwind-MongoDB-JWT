/* TanStack */
import { useQuery } from '@tanstack/react-query';
import { keepPreviousData } from '@tanstack/react-query';

/* Types */
type Filters = {
  patient?: string;
  doctor?: string;
  specialty?: string;
  version?: string | number;
  page?: string | number;
  limit?: string | number;
  sort?: string;
};

type ClinicalRecord = any;

export function useGetAllClinicalRecords(filters: Filters = {}) {
  /* Build query string */
  const buildQuery = () => {
    const params = new URLSearchParams();

    // Add filters
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        params.append(key, String(value));
      }
    });

    return params.toString();
  };

  /* Fetcher */
  const fetchRecords = async (): Promise<ClinicalRecord[]> => {
    // Build URL
    const query = buildQuery();
    const url = query ? `/api/clinicalRecords?${query}` : `/api/clinicalRecords`;

    // Fetch request
    const res = await fetch(url);
    const json = await res.json();

    if (!res.ok) throw new Error(json.error || 'Error fetching records');

    // Return list
    return json.data;
  };

  /* Query */
  const query = useQuery({
    queryKey: ['clinical-records-all', filters],
    queryFn: fetchRecords,
    staleTime: 1000 * 60 * 2,
    retry: 1,
    placeholderData: keepPreviousData,
  });

  return {
    data: query.data ?? [],
    loading: query.isLoading,
    error: query.error ? query.error.message : null,
    refetch: query.refetch,
  };
}
