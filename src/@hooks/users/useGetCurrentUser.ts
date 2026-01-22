import { useQuery } from '@tanstack/react-query';
import { CurrentUserData } from '@/@types/user/user.types';

async function fetchCurrentUser(): Promise<CurrentUserData | null> {
  const res = await fetch('/api/auth/me', { credentials: 'include' });
  if (!res.ok) return null;
  const data = await res.json();
  return data.user;
}

export function useGetCurrentUser() {
  const query = useQuery({
    queryKey: ['current-user'],
    queryFn: fetchCurrentUser,
    staleTime: 1000 * 60 * 10,
    retry: false,
  });

  return {
    user: query.data ?? null,
    isLoading: query.isLoading,
    refetch: query.refetch,
  };
}

// Usage Example:
// Get current user
// const {
//   user: currentUser,
//   isLoading: isLoadingCurrentUser,
//   refetch: refetchCurrentUser,
// } = useGetCurrentUser();
