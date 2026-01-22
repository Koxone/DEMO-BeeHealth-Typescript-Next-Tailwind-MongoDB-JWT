import { z } from 'zod';

/* User schema for API response */
export const userSchema = z.object({
  _id: z.string(),
  fullName: z.string(),
  email: z.email(),
  phone: z.string(),
  avatar: z.string().optional(),
  isActive: z.boolean(),
  hasRecord: z.boolean(),
  initialWeight: z.number().optional(),
  initialSize: z.number().optional(),
  resetToken: z.string().nullable().optional(),
  role: z.enum(['patient', 'doctor', 'admin', 'employee']),
  specialty: z.enum(['weight', 'dental', 'stetic', 'none']),
  lastVisit: z.string().nullable().optional(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
});

export type ZUser = z.infer<typeof userSchema>;
