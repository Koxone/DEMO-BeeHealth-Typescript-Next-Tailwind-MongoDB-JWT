import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useCompleteGoal = (patientId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: { goalId: string; consultationId: string }) => {
      const response = await fetch(`/api/users/${patientId}/goal/complete`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(input),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Error completing goal');
      }

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['goals', patientId] });
      queryClient.invalidateQueries({ queryKey: ['patient-timeline', patientId] });
    },
  });
};
