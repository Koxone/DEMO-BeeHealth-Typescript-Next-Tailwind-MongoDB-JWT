import { useMutation, useQueryClient } from '@tanstack/react-query';
import { z } from 'zod';

/* Response schema */
const assignWorkoutResponseSchema = z.object({
  message: z.string(),
  user: z.object({
    id: z.string(),
    fullName: z.string(),
    email: z.string(),
    phone: z.string(),
    avatar: z.string().optional(),
    role: z.enum(['patient', 'doctor', 'admin', 'employee']),
    specialty: z.enum(['weight', 'dental', 'stetic', 'none']),
    workouts: z.array(z.any()),
    updatedAt: z.string(),
  }),
});

export type AssignWorkoutResponse = z.infer<typeof assignWorkoutResponseSchema>;

export function useAssignWorkout() {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending, error } = useMutation({
    /* Mutation */
    mutationFn: async ({
      patientId,
      workoutId,
      assignedAt,
    }: {
      patientId: string;
      workoutId: string;
      assignedAt?: string;
    }) => {
      const res = await fetch(`/api/users/${patientId}/workouts/assign`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          workoutId,
          assignedAt,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Failed to assign workout');
      }

      const json = await res.json();
      const result = assignWorkoutResponseSchema.safeParse(json);

      if (!result.success) {
        console.error(result.error.format());
        throw new Error('Invalid response data');
      }

      return result.data;
    },

    /* Cache */
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['user', variables.patientId] });
      queryClient.invalidateQueries({ queryKey: ['patient-workouts', variables.patientId] });
    },
  });

  return {
    assignWorkout: mutateAsync,
    isLoading: isPending,
    error: error?.message ?? null,
  };
}

// Usage Example:
// const { assignWorkout, isLoading, error } = useAssignWorkout();
// await assignWorkout({ patientId: '123', workoutId: '456' });
