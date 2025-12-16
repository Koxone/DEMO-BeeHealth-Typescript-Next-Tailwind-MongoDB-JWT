import { z } from 'zod';
import { workoutSchema } from './workout.schema';

export const workoutsResponseSchema = z.object({
  workouts: z.array(workoutSchema),
});

export type WorkoutsResponse = z.infer<typeof workoutsResponseSchema>;
