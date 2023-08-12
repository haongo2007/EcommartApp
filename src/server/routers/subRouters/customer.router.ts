import { router } from "../../trpc";
import {z} from "zod";
import { accountProcedure } from "../../procedures";
import { customerRoutesSchema } from "../../../helpers/validations/customerRoutesSchema";

export const customerRouter = router({
    updateCustomer: accountProcedure
    .input( customerRoutesSchema.extend({
            id: z.string(),
        })
    )
    .mutation(async ({ ctx, input }) => {
        const { id, ...updateData } = input;
        return ctx.prisma.shopCustomer.update({
            where: {
                id,
            },
            data: {
                ...updateData,
            },
        });
    }),
});


