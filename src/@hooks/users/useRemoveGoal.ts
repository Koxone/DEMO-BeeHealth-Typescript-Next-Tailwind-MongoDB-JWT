import { useMutation } from '@tanstack/react-query';

// Remove single patient goal
export function useRemovePatientGoal() {
  return useMutation({
    // Mutation function
    mutationFn: async ({
      patientId,
      goalId,
      comply,
    }: {
      patientId: string;
      goalId: string;
      comply: boolean;
    }) => {
      const res = await fetch(`/api/users/${patientId}/goals/remove`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          goalId,
          comply,
        }),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error?.message || 'Failed to finalize goal');
      }

      return res.json();
    },
  });
}

// Usage example:
// const removeGoalMutation = useRemovePatientGoals();
// removeGoalMutation.mutate({ patientId: '123', goalId: '456', comply: true });
