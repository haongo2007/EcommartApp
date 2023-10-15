import { inferRouterOutputs } from "@trpc/server";
import { updateCartProductsInputSchema } from "../../../helpers/validations/productRoutesSchema";
import { router } from "server/trpc";
import { accountProcedure } from "server/procedures";


export const cartsRouter = router({
  updateCart: accountProcedure
    .input(updateCartProductsInputSchema)
    .mutation(async ({ ctx, input }) => {
      const { customer_id, data } = input;
      const dataParse = JSON.parse(data).map(item => {
        return {
          customer_id,
          product_id: item.id,
          store_id: item.store_id,
          qty: item.qty,
          variant: JSON.stringify(item.variant)
        };
      });
      await ctx.prisma.shopCustomerCart.deleteMany({
        where:{
          customer_id
        }
      });
      return ctx.prisma.shopCustomerCart.createMany({
        data:dataParse
      });
    }),
});

type CartsRouterOutput = inferRouterOutputs<typeof cartsRouter>;
export type updateCartResponse = CartsRouterOutput["updateCart"];
