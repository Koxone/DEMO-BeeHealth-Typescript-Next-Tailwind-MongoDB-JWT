import { z } from 'zod';

export const patientSchema = z.object({
  _id: z.string(),
  fullName: z.string(),
  email: z.email(),
});

export type ZPatient = z.infer<typeof patientSchema>;
