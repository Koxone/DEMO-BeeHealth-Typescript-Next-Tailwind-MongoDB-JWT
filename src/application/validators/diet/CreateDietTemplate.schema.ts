import { z } from 'zod';

export const CreateDietTemplateSchema = z.object({
  name: z.string().min(1, 'El nombre es indispensable'),
  category: z.string().min(1, 'Debes elegir una categoría'),

  allowedFoods: z.object({
    items: z.array(z.string()),
    note: z.string().optional(),
  }),
  forbiddenFoods: z.object({
    items: z.array(z.string()),
    note: z.string().optional(),
  }),

  description: z.string().optional().default(''),
  instructions: z.string().optional().default('Consulte con su médico las porciones.'),
  benefits: z.string().optional(),

  allowedLiquids: z
    .object({
      items: z.array(z.string()).default([]),
      note: z.string().optional(),
    })
    .optional(),

  forbiddenLiquids: z
    .object({
      items: z.array(z.string()).default([]),
      note: z.string().optional(),
    })
    .optional(),

  ingredients: z.array(z.string()).default([]),
  images: z.array(z.string()).default([]),
  notes: z.string().optional(),
});

export type CreateDietTemplateDTO = z.infer<typeof CreateDietTemplateSchema>;
