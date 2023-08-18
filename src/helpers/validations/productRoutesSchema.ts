import { z } from "zod";
import { LIMIT_SEARCH_INPUT } from "../../constants";

export const searchProductsSchema = z.object({
  search: z.string().max(LIMIT_SEARCH_INPUT),
  page: z.number(),
});

export const updateCartProductsInputSchema = z.object({
  customer_id: z.string().max(30),
  data: z.string(),
});

export type CartProductsInput = z.infer<typeof updateCartProductsInputSchema>;

export const createProductInputSchema = z.object({
  name: z.string().min(5).max(50),
  image: z.string().min(5).max(500),
  description: z.string().max(500).optional(),
  sizes: z.array(z.string().min(1).max(10)),
  quantity: z.number().min(10),
  price: z.number().min(100),
  categoryId: z.string(),
});

export type CreateProductsInput = z.infer<typeof createProductInputSchema>;
