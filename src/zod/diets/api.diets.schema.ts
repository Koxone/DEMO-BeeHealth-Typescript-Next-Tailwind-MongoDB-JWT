import { z } from 'zod';
import { dietSchema } from './diet.schema';

export const dietsResponseSchema = z.object({
  diets: z.array(dietSchema),
});

export type DietsResponse = z.infer<typeof dietsResponseSchema>;
