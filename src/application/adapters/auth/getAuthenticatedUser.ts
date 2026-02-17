import { CurrentUserFromAuthStoreType } from '@/presentation/store/authStore';

// Auth Adapter to get authenticated user
export async function getAuthenticatedUser(): Promise<CurrentUserFromAuthStoreType | null> {
  try {
    // Try /me
    const meRes = await fetch('/api/auth/me', {
      credentials: 'include',
    });

    if (meRes.ok) {
      const data = await meRes.json();

      return {
        id: data.user.id,
        email: data.user.email,
        name: data.user.name,
        lastName: data.user.lastName,
        role: data.user.role,
        specialty: data.user.specialty,
        phone: data.user.phone,
        avatar: data.user.avatar || null,
        updatedAt: data.user.updatedAt,
      };
    }

    // If unauthorized, try refresh
    if (meRes.status === 401) {
      const refreshRes = await fetch('/api/auth/refresh', {
        method: 'POST',
        credentials: 'include',
      });

      if (!refreshRes.ok) {
        return null;
      }

      // Retry /me
      const retryMe = await fetch('/api/auth/me', {
        credentials: 'include',
      });

      if (!retryMe.ok) {
        return null;
      }

      const data = await retryMe.json();

      return {
        id: data.user.id,
        email: data.user.email,
        name: data.user.name,
        lastName: data.user.lastName,
        role: data.user.role,
        specialty: data.user.specialty,
        phone: data.user.phone,
        avatar: data.user.avatar || null,
        updatedAt: data.user.updatedAt,
      };
    }

    return null;
  } catch {
    return null;
  }
}
