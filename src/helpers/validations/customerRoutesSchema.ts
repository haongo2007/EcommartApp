import { z } from "zod";

export const customerRoutesSchema = z.object({
    id: z.string(), 
    avatar: z.string().max(500).optional(), 
    first_name: z.string(), 
    last_name: z.string(), 
    email: z.string(), 
    store_id: z.number(), 
    birthday: z.date(), 
    phone: z.string().max(500).optional()
});