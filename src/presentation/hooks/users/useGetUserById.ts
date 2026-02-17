// User query
import { useQuery } from '@tanstack/react-query';

// Types
import { UserDTOPresentation } from '@/presentation/types';

export function useGetUserById(userId: string | undefined) {
  return useQuery<UserDTOPresentation | null>({
    queryKey: ['user', userId],
    queryFn: async () => {
      const res = await fetch(`/api/users/${userId}`);
      if (!res.ok) return null;
      return res.json();
    },
    enabled: !!userId,
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
    gcTime: 1000 * 60 * 60 * 24, // 24 hours
  });
}

// Usage example:
// const { userData, isLoading, error } = useGetUserById(patientId);
