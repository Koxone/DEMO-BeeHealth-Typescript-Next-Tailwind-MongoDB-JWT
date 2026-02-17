'use client';

import { useEffect } from 'react';
import { useAuthStore } from '@/presentation/store/authStore';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const refreshSession = useAuthStore((s) => s.refreshSession);

  useEffect(() => {
    refreshSession();
  }, [refreshSession]);

  return children;
}
