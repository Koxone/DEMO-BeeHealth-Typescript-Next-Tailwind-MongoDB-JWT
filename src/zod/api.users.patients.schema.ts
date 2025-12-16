import { z } from 'zod';
import { userSchema } from './user.schema';

export const patientResponseSchema = z.object({
  patients: z.array(userSchema),
});

export type PatientsResponse = z.infer<typeof patientResponseSchema>;
