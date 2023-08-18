import { router } from "../trpc";
// import { adminRouter } from "./subRouters/admin.router";
import { orderRouter } from "./subRouters/order.router";
import { paymentRouter } from "./subRouters/payment.router";
import { productRouter } from "./subRouters/product.router";
// import { userRouter } from "./subRouters/user.router";
import { categoryRouter } from "./subRouters/category.router";
import { customerRouter } from "./subRouters/customer.router";
import { cartsRouter } from "./subRouters/carts.router";

export const appRouter = router({
  // user: userRouter,
  // admin: adminRouter,
  // product: productRouter,
  // payment: paymentRouter,
  // order: orderRouter,
  category: categoryRouter,
  customer: customerRouter,
  carts: cartsRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
