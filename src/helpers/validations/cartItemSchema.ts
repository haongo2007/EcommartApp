import { z } from "zod";

export const cartItemSchema = z.object({
  id:z.number(),
  slug:z.string(),
  qty:z.number(),
  variant:z.any(),
  price:z.number(),
  promotion:z.any(),
  description:z.any(),
  finalPrice:z.number(),
  images:z.any()
});

export const cartsSchema = z.array(cartItemSchema)
