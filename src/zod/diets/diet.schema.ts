import { z } from 'zod';
import { doctorSchema } from './diets.doctor.schema';

export const dietSchema = z.object({
  _id: z.string(),

  doctor: z.string().or(doctorSchema),

  name: z.string(),
  category: z.string().optional(),

  description: z.string().optional(),
  recommendations: z.string().optional(),
  benefits: z.string().optional(),
  instructions: z.string().optional(),

  ingredients: z.array(z.string()).optional(),

  allowedLiquids: z
    .object({
      items: z.array(z.string()),
      note: z.string().optional(),
    })
    .optional(),

  allowedFoods: z
    .object({
      items: z.array(z.string()),
      note: z.string().optional(),
    })
    .optional(),

  forbiddenFoods: z
    .object({
      items: z.array(z.string()),
      note: z.string().optional(),
    })
    .optional(),

  forbiddenLiquids: z
    .object({
      items: z.array(z.string()),
      note: z.string().optional(),
    })
    .optional(),

  duration: z.string().optional(),

  isActive: z.boolean().default(true),
  images: z.array(z.string()).optional(),
  notes: z.string().optional(),

  createdAt: z.string(),
  updatedAt: z.string(),
});

export type ZDiet = z.infer<typeof dietSchema>;
