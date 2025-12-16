import { create } from 'zustand';
import { CurrentUserData } from '@/types/user/user.types';
import { persist, createJSONStorage } from 'zustand/middleware';

/* Store shape */
interface AuthState {
  user: CurrentUserData | null;
  token: string | null;
  isAuthenticated: boolean;

  setUser: (user: CurrentUserData | null) => void;
  setToken: (token: string | null) => void;
  clearAuth: () => void;
  loadUser: () => Promise<void>;
}

/* Store */
const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      // State
      user: null,
      token: null,
      isAuthenticated: false,

      // Set user
      setUser: (userData) =>
        set({
          user: userData,
          isAuthenticated: !!userData,
        }),

      // Set token
      setToken: (token) => set({ token }),

      // Clear auth
      clearAuth: () =>
        set({
          user: null,
          token: null,
          isAuthenticated: false,
        }),

      // Load current user
      loadUser: async () => {
        try {
          const res = await fetch('/api/auth/me', { credentials: 'include' });
          if (!res.ok) throw new Error('No session');
          const data = await res.json();

          set({
            user: data.user,
            isAuthenticated: true,
          });
        } catch {
          set({
            user: null,
            isAuthenticated: false,
          });
        }
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

export default useAuthStore;
