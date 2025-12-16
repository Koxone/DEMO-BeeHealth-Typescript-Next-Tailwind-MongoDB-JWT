// Custom hook
import { useMutation } from '@tanstack/react-query';

// Types
interface RemoveWorkoutParams {
  userId: string;
  workoutId: string;
  clinicalRecord: string;
}

interface RemoveWorkoutResponse {
  message: string;
  user: {
    id: string;
    fullName: string;
    email: string;
    phone?: string;
    avatar?: string;
    role: string;
    specialty: string;
    workouts: any[];
    updatedAt: string;
  };
}

export function useRemoveWorkout() {
  // Mutation
  const mutation = useMutation({
    mutationFn: async ({ userId, workoutId, clinicalRecord }: RemoveWorkoutParams) => {
      const res = await fetch(`/api/users/${userId}/workouts/remove`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ workoutId, clinicalRecord }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Failed to remove workout');
      }

      return (await res.json()) as RemoveWorkoutResponse;
    },
  });

  return {
    removeWorkout: mutation.mutateAsync,
    isLoading: mutation.isPending,
    error: mutation.error?.message ?? null,
  };
}

// Usage:
// const { removeWorkout, isLoading, error } = useRemoveWorkout();
// await removeWorkout({ userId: '123', workoutId: '456', clinicalRecord: '789' });
