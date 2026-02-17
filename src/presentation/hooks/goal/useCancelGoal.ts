import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useCancelGoal = (patientId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (goalId: string) => {
      const response = await fetch(`/api/users/${patientId}/goal/cancel`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ goalId }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Error cancelling goal');
      }

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['goals', patientId] });
      queryClient.invalidateQueries({ queryKey: ['patient-timeline', patientId] });
    },
  });
};
