import { useMutation, useQueryClient } from '@tanstack/react-query';

export function useToggleDiet() {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending, error } = useMutation({
    mutationFn: async ({
      patientId,
      dietId,
      clinicalRecord,
      isActive,
      action,
    }: {
      patientId: string;
      dietId: string;
      clinicalRecord: string;
      isActive: boolean;
      action?: string;
    }) => {
      const res = await fetch(`/api/users/${patientId}/diets/toggle`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          dietId,
          isActive,
          clinicalRecord,
          action,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Failed to toggle diet');
      }

      return res.json();
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['user', variables.patientId] });
      queryClient.invalidateQueries({ queryKey: ['patient-diets', variables.patientId] });
    },
  });

  return {
    toggleDiet: mutateAsync,
    isLoading: isPending,
    error: error?.message ?? null,
  };
}

// Usage Example:
// const { toggleDiet, isLoading, error } = useToggleDiet();
// await toggleDiet({ patientId: '123', dietId: '456', isActive: false });

// const { toggleDiet, isLoading, error } = useToggleDiet();

// const handleToggle = async () => {
//   try {
//     await toggleDiet({ patientId: userId, dietId: dietId, isActive: false });
//   } catch (err) {
//     console.error(err);
//   }
// };
