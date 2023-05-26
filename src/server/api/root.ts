import { createTRPCRouter } from "./trpc";
import { stripeRouter } from "./routers/stripe";
import { userRouter } from "./routers/user";
import { portalRouter } from "./routers/portal";
import { organizationRouter } from "./routers/organization";
import { groupRouter } from "./routers/group";
import { datasetRouter } from "./routers/dataset";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here
 */
export const appRouter = createTRPCRouter({
  stripe: stripeRouter,
  user: userRouter,
  portal: portalRouter,
  organization: organizationRouter,
  group: groupRouter,
  dataset: datasetRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
