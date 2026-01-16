// block: imports
import { useQuery } from '@tanstack/react-query';

// block: fetcher
async function fetchUserTimeline(userId: string) {
  const res = await fetch(`/api/users/${userId}/timeline/get`, {
    method: 'GET',
    credentials: 'include',
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error || 'Failed to fetch timeline');
  }

  return res.json();
}

// block: hook
export function useGetUserEvents(userId: string) {
  const query = useQuery({
    queryKey: ['user-timeline', userId],
    queryFn: () => fetchUserTimeline(userId),
    enabled: Boolean(userId),
  });

  return {
    events: query.data?.events ?? [],
    isLoading: query.isLoading,
    error: query.error?.message ?? null,
    refetch: query.refetch,
  };
}

// Usage Example:
// const { events, isLoading, error, refetch } = useGetUserEvents('userId123');
