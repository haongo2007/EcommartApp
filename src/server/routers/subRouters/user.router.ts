import { accountProcedure } from "server/procedures";
import { router } from "server/trpc";

export const userRouter = router({
  profile: accountProcedure.query(async ({ ctx }) => {
    return ctx.prisma.user.findFirst({
      where: {
        id: ctx.session.user.id,
      },
    });
  }),
});
