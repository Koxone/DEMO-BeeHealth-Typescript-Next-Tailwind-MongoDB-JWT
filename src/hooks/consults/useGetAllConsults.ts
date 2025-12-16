import { useQuery } from '@tanstack/react-query';

export function useGetAllConsults({ speciality = null } = {}) {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['consults', speciality],
    queryFn: async () => {
      const res = await fetch('/api/consults');
      if (!res.ok) throw new Error('Failed to fetch consults');
      return res.json();
    },
  });

  const filteredConsults = speciality
    ? (data?.filter((c) => c.speciality === speciality) ?? [])
    : (data ?? []);

  return {
    consults: filteredConsults,
    isLoading,
    error: error?.message ?? null,
    refetch,
  };
}
