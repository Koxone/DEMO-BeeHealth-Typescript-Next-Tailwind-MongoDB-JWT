import { useQuery } from '@tanstack/react-query';
import { z } from 'zod';

// Schema for Goal
const GoalSchema = z.object({
  _id: z.string(),
  patient: z.string(),
  initialWeight: z.number().optional(),
  goal: z.number(),
  comply: z.boolean().optional().nullable(),
  notes: z.string().optional(),
  isActive: z.boolean(),
  createdAt: z.string(),
});

// Schema for Goals Response
const GoalsResponseSchema = z.object({
  goals: z.array(GoalSchema),
});

export type ZGoal = z.infer<typeof GoalSchema>;

export function useGetPatientGoals(patientId: string) {
  const { data, isLoading, error, refetch } = useQuery<ZGoal[], Error>({
    queryKey: ['patient-goals', patientId],
    enabled: !!patientId,
    queryFn: async () => {
      const response = await fetch(`/api/users/${patientId}/goals/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      if (!response.ok) throw new Error('Failed to fetch patient goals');

      const json = await response.json();
      const parsed = GoalsResponseSchema.safeParse(json);
      if (!parsed.success) {
        console.error('Zod validation error:', parsed.error.format());
        throw new Error('Invalid data format for patient goals');
      }
      return parsed.data.goals;
    },
  });
  return { data, isLoading, error, refetch };
}

// Usage Example:
// Get Patient Goals with Custom Hook
//   const {
//     data: goalsData,
//     isLoading: goalsLoading,
//     error: goalsError,
//     refetch: refetchGoals,
//   } = useGetPatientGoals(id);
