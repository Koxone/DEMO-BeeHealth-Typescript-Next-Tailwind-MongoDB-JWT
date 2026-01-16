import { useMutation } from '@tanstack/react-query';

// Types
interface CreateGoalPayload {
  patientId: string;
  goal: number;
  notes?: string;
  initialWeight?: number;
}

// Hook
export function useCreatePatientGoal() {
  return useMutation({
    // Mutation
    mutationFn: async (payload: CreateGoalPayload) => {
      const response = await fetch(`/api/users/${payload.patientId}/goals/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          goal: payload.goal,
          notes: payload.notes,
          initialWeight: payload.initialWeight,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to create goal');
      }

      return response.json();
    },
  });
}

// Usage Example:
// const createGoalMutation = useCreatePatientGoal();
// createGoalMutation.mutate({ patientId, goal, notes, initialWeight });
