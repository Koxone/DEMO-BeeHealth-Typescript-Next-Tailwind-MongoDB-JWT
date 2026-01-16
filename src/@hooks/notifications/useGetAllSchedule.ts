import { useQuery } from '@tanstack/react-query';

// fetch
const fetchSchedules = async () => {
  const res = await fetch('/api/schedule', {
    method: 'GET',
    credentials: 'include',
  });

  if (!res.ok) {
    throw new Error('Failed to fetch schedules');
  }

  return res.json();
};

export function useGetAllSchedule() {
  // query
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['schedules'],
    queryFn: fetchSchedules,
  });

  return {
    regularSchedules: data?.regularSchedules ?? [],
    specialSchedules: data?.specialSchedules ?? [],
    loading: isLoading,
    error: isError ? (error as Error).message : null,
  };
}

// Usage example:
// const { regularSchedules, specialSchedules, loading, error } = useGetAllSchedule();
