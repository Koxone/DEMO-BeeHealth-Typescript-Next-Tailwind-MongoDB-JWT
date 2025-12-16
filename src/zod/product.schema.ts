import { z } from 'zod';

/* Inventory schema */
export const ZInventory = z.object({
  _id: z.string(),
  quantity: z.number().optional(),
  salePrice: z.number().optional(),
});

/* Product schema */
export const ZMed = z.object({
  _id: z.string(),
  name: z.string(),
  type: z.string(),
  category: z.string(),
  inStock: z.boolean(),
  costPrice: z.number(),
  salePrice: z.number(),
  description: z.string().optional(),

  inventory: ZInventory.optional(),
});

export const ZMedArray = z.array(ZMed);
export type ZMed = z.infer<typeof ZMed>;
