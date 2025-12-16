import { z } from 'zod';

export const doctorSchema = z.object({
  _id: z.string(),
  fullName: z.string(),
  email: z.email(),
});

export type ZDoctor = z.infer<typeof doctorSchema>;
