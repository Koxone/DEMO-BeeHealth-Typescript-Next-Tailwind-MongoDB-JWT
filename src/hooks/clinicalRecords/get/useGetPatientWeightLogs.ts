import { useQuery } from '@tanstack/react-query';

export interface Log {
  _id: string;
  patient: {
    _id: string;
    fullName: string;
    phone: string;
    email: string;
  };
  clinicalRecord: {
    recordDate: Date;
  };

  originalWeight: number;
  currentWeight: number;
  differenceFromPrevious: number;
  differenceFromOriginal: number;

  createdAt: Date;
  updatedAt: Date;
}

export function useGetPatientWeightLogs(id?: string) {
  const fetchLogs = async (): Promise<Log[]> => {
    // Fetch request
    const res = await fetch(`/api/users/${id}/weight-logs`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || 'Failed to fetch weight logs');
    }

    // Sort weight logs by createdAt
    return [...data.weightLogs].sort(
      (b, a) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    );
  };

  /* Query */
  const query = useQuery({
    queryKey: ['weightLogs', id],
    queryFn: fetchLogs,
    enabled: !!id,
    staleTime: 1000 * 60 * 10,
    retry: 1,
  });

  return {
    weightLogs: query.data ?? [],
    loading: query.isLoading,
    error: query.error ? query.error.message : null,
    refetch: query.refetch,
  };
}

// How to use it?
// const {
//   weightLogs,
//   loading: weightLogsLoading,
//   error: weightLogsError,
//   refetch: refetchWeightLogs,
// } = useGetPatientWeightLogs(patient._id);
