'use client';

import { useQuery } from '@tanstack/react-query';
import { z } from 'zod';

/* Schemas */
const workoutEntitySchema = z.object({
  _id: z.string(),
  name: z.string(),
  type: z.string(),
  difficulty: z.enum(['Beginner', 'Intermediate', 'Advanced']),
  duration: z.number(),
  about: z.string(),
  instructions: z.array(z.string()),
  benefits: z.array(z.string()),
  cautions: z.array(z.string()),
  images: z.array(z.string()),
  video: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

const userWorkoutSchema = z.object({
  workout: workoutEntitySchema,
  isActive: z.boolean(),
  assignedAt: z.string(),
  finishedAt: z.string().optional(),
});

const workoutsResponseSchema = z.object({
  success: z.boolean(),
  data: z.array(userWorkoutSchema),
});

export function useGetAllWorkoutsFromPatient(patientId: string) {
  const query = useQuery({
    queryKey: ['patient-workouts', patientId],
    enabled: Boolean(patientId),
    queryFn: async () => {
      const res = await fetch(`/api/users/${patientId}/workouts/get`, {
        credentials: 'include',
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Failed to fetch patient workouts');
      }

      const json = await res.json();
      const parsed = workoutsResponseSchema.safeParse(json);

      if (!parsed.success) {
        console.error(parsed.error.format());
        throw new Error('Invalid workouts response');
      }

      return parsed.data.data;
    },
  });

  return {
    workoutsData: query.data ?? [],
    isLoading: query.isLoading,
    error: query.error?.message ?? null,
    refetch: query.refetch,
  };
}

// Usage Example:
// const { workoutsData, isLoading, error, refetch } = useGetAllWorkoutsFromPatient('patientId123');