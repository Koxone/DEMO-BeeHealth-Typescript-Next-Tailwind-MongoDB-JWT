import { z } from 'zod';
import { dietSchema } from './diet.schema';

// Schema para el assignment de dieta a paciente
export const dietAssignmentSchema = z.object({
  diet: dietSchema,
  isActive: z.boolean(),
  assignedAt: z.string(),
  finishedAt: z.string().optional(),
  _id: z.string(),
});

export const dietsResponseSchema = z.object({
  diets: z.array(dietAssignmentSchema),
});

export type DietsResponse = z.infer<typeof dietsResponseSchema>;
export type ZDietAssignment = z.infer<typeof dietAssignmentSchema>;
