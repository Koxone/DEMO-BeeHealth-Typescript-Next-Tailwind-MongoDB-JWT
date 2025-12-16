import { z } from 'zod';
import { patientSchema } from '../patient.schema';

// schema
export const workoutSchema = z.object({
  // id
  _id: z.string(),

  // patients
  patients: z.array(
    z.object({
      patient: patientSchema,
      isActive: z.boolean(),
      assignedAt: z.string(),
      finishedAt: z.string().optional(),
    })
  ),

  // basic info
  name: z.string(),
  type: z.string(),
  difficulty: z.string(),
  duration: z.number(),

  // details
  about: z.string().optional(),
  instructions: z.array(z.string()).optional(),
  benefits: z.array(z.string()).optional(),
  cautions: z.array(z.string()).optional(),

  // media
  images: z.array(z.string()).optional(),
  video: z.string().optional(),

  // timestamps
  createdAt: z.string(),
  updatedAt: z.string(),
});

// type
export type ZWorkout = z.infer<typeof workoutSchema>;
