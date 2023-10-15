import { procedure, router } from "server/trpc";
import { fetchChildCategory } from "../../handlers/categories/fetchChildCategory";
import {z} from "zod";

export const categoryRouter = router({
  getChilds: procedure
    .input(z.string())
    .query(async ({ ctx, input }) => {
      return fetchChildCategory(input, ctx.prisma);
    }),
});
