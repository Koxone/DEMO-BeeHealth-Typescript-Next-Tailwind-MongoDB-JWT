import { useMutation, useQueryClient } from '@tanstack/react-query';

export function useToggleWorkout() {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending, error } = useMutation({
    mutationFn: async ({
      patientId,
      workoutId,
      clinicalRecord,
      isActive,
      action,
    }: {
      patientId: string;
      workoutId: string;
      clinicalRecord: string;
      isActive: boolean;
      action?: string;
    }) => {
      const res = await fetch(`/api/users/${patientId}/workouts/toggle`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          workoutId,
          isActive,
          clinicalRecord,
          action,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Failed to toggle workout');
      }

      return res.json();
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['user', variables.patientId] });
      queryClient.invalidateQueries({ queryKey: ['patient-workouts', variables.patientId] });
    },
  });

  return {
    toggleWorkout: mutateAsync,
    isLoading: isPending,
    error: error?.message ?? null,
  };
}

// Usage Example:
// const { toggleWorkout, isLoading, error } = useToggleWorkout();
// await toggleWorkout({ patientId: '123', workoutId: '456', isActive: false });

// const { toggleWorkout, isLoading, error } = useToggleWorkout();

// const handleToggle = async () => {
//   try {
//     await toggleWorkout({ patientId: userId, workoutId: workoutId, isActive: false });
//   } catch (err) {
//     console.error(err);
//   }
// };
