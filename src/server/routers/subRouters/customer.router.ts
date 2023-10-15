import {z} from "zod";
import { accountProcedure } from "../../procedures";
import { customerRoutesSchema } from "../../../helpers/validations/customerRoutesSchema";
import { router } from "server/trpc";

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


