import { create } from 'zustand';
import { getAuthenticatedUser } from '@/application/adapters/auth/getAuthenticatedUser';

// Enums
import { UserSpecialty, UserRole } from '@/domain/enums/';

// Types
export type CurrentUserFromAuthStoreType = {
  id: string;
  email: string;
  name: string;
  lastName: string;
  role: UserRole;
  specialty: UserSpecialty;
  phone: string;
  avatar: string | null;
  updatedAt: Date;
};

// State
interface AuthState {
  user: CurrentUserFromAuthStoreType | null;
  loading: boolean;
  refreshSession: () => Promise<void>;
  clearSession: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  // Initial state
  user: null,
  loading: true,

  // Load session
  refreshSession: async () => {
    set({ loading: true });

    try {
      const user = await getAuthenticatedUser();

      set({
        user,
        loading: false,
      });
    } catch {
      set({
        user: null,
        loading: false,
      });
    }
  },

  // Clear session
  clearSession: () => {
    set({
      user: null,
      loading: false,
    });
  },
}));

// Usage example:
// const { user, loading, refreshSession, clearSession } = useAuthStore();
