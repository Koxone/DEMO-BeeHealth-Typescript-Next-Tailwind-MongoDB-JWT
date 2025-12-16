import { useMutation } from '@tanstack/react-query';

export interface WorkoutPayload {
  patients?: string[];
  name?: string;
  type?: string;
  difficulty?: 'Beginner' | 'Intermediate' | 'Advanced';
  duration?: number;
  about?: string;
  instructions?: string[];
  benefits?: string[];
  cautions?: string[];
  images?: string[];
  video?: string;
}

export function useEditWorkout() {
  const mutation = useMutation({
    mutationFn: async ({ workoutId, payload }: { workoutId: string; payload: WorkoutPayload }) => {
      const res = await fetch(`/api/workouts/${workoutId}/edit`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || 'Failed to edit workout');
      }

      return res.json();
    },
  });

  return {
    isLoading: mutation.isPending,
    error: mutation.error?.message || null,
    editWorkout: (workoutId: string, payload: WorkoutPayload) =>
      mutation.mutateAsync({ workoutId, payload }),

    refetch: mutation.reset,
  };
}
