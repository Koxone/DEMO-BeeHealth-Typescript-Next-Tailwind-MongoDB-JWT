import { z } from 'zod';
import { ZMed } from './product.schema';

export const productsResponseSchema = z.object({
  products: z.array(ZMed),
});

export type ProductsResponse = z.infer<typeof productsResponseSchema>;
