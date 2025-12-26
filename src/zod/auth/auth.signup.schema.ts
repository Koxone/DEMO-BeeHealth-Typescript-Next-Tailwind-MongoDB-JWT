import { z } from 'zod';

export const signupSchema = z.object({
  fullName: z.string().min(2).max(100),
  email: z.string().email().max(250),
  phone: z.string().min(7).max(20),
  password: z.string().min(8).max(128),
  role: z.enum(['patient', 'doctor', 'employee', 'admin']).optional(),
  specialty: z.string().optional(),
});
