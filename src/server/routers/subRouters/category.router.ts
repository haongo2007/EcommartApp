import { fetchChildCategory } from "../../handlers/categories/fetchChildCategory";
import { procedure, router } from "../../trpc";
import {z} from "zod";

export const categoryRouter = router({
  getChilds: procedure
    .input(z.string())
    .query(async ({ ctx, input }) => {
      return fetchChildCategory(input, ctx.prisma);
    }),
});
