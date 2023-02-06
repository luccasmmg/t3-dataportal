import { createTRPCRouter } from "./trpc";
import { exampleRouter } from "./routers/example";
import { stripeRouter } from "./routers/stripe";
import { userRouter } from "./routers/user";
import { portalRouter } from "./routers/portal";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here
 */
export const appRouter = createTRPCRouter({
  example: exampleRouter,
  stripe: stripeRouter,
  user: userRouter,
  portal: portalRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
