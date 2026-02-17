import { useAuthStore } from '@/presentation/store/authStore';

// Auth hook
export function useAuth() {
  const currentUser = useAuthStore((s) => s.user);
  const isLoading = useAuthStore((s) => s.loading);
  const refreshSession = useAuthStore((s) => s.refreshSession);
  const clearSession = useAuthStore((s) => s.clearSession);

  return {
    currentUser,
    specialty: currentUser?.specialty,
    role: currentUser?.role,
    isLoading,
    refreshSession,
    clearSession,
  };
}
