import { createTRPCRouter } from "./trpc";
import { memberRouter } from "./routers/member";
import { portalRouter } from "./routers/portal";
import { organizationRouter } from "./routers/organization";
import { groupRouter } from "./routers/group";
import { datasetRouter } from "./routers/dataset";
import { resourceRouter } from "./routers/resource";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here
 */
export const appRouter = createTRPCRouter({
  member: memberRouter,
  portal: portalRouter,
  organization: organizationRouter,
  group: groupRouter,
  dataset: datasetRouter,
  resource: resourceRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
