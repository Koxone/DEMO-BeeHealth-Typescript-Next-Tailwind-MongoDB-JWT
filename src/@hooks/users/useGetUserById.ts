import { useQuery } from '@tanstack/react-query';
import { z } from 'zod';

// Schema para el usuario
const userSchema = z.object({
  _id: z.string(),
  fullName: z.string(),
  email: z.string(),
  phone: z.string(),
  avatar: z.string().optional(),
  isActive: z.boolean(),
  hasRecord: z.boolean(),
  role: z.enum(['patient', 'doctor', 'admin', 'employee']),
  specialty: z.enum(['weight', 'dental', 'stetic', 'none']),
  diets: z.array(z.any()).optional(),
  workouts: z.array(z.any()).optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

const userResponseSchema = z.object({
  user: userSchema,
});

export type ZUser = z.infer<typeof userSchema>;

export function useGetUserById(userId: string) {
  const { data, isLoading, error, refetch } = useQuery<ZUser>({
    queryKey: ['user', userId],
    queryFn: async () => {
      const res = await fetch(`/api/users/${userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      if (!res.ok) throw new Error('Failed to fetch user');

      const json = await res.json();
      const result = userResponseSchema.safeParse(json);

      if (!result.success) {
        console.error(result.error.format());
        throw new Error('Invalid user data');
      }

      return result.data.user;
    },
  });

  return {
    userData: data || null,
    isLoading,
    error: error?.message ?? null,
    refetch,
  };
}

// Usage Example:
// const { userData, isLoading, error, refetch } = useGetUserById(userId);
