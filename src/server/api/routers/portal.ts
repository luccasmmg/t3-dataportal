import { TRPCError } from "@trpc/server";
import { match, P } from "ts-pattern";
import { z } from "zod";
import { PortalSchema } from "../../../schema/portal.schema";
import { protectedProcedure, createTRPCRouter, publicProcedure } from "../trpc";

export const portalRouter = createTRPCRouter({
  getPortalBySysAdminId: publicProcedure
    .input(z.object({ sysAdminId: z.string().optional() }))
    .query(async ({ ctx, input }) => {
      const portal = await ctx.prisma.portal.findFirst({
        where: { sysAdminId: input.sysAdminId },
      });
      if (!portal) {
        return null
      }
      return { ...portal };
    }),
  getPortalByName: publicProcedure
    .meta({ openapi: { method: "GET", path: "/portal" } })
    .input(z.object({ name: z.string() }))
    .output(PortalSchema)
    .query(async ({ ctx, input }) => {
      const portal = await ctx.prisma.portal.findFirst({
        where: { name: input.name },
      });
      if (!portal) {
        throw new TRPCError({
          message: "Portal not found",
          code: "NOT_FOUND",
        });
      }
      return { ...portal };
    }),
  createPortal: protectedProcedure
    .input(PortalSchema)
    .mutation(async ({ ctx, input }) => {
      const { session, prisma } = ctx;
      const data = await prisma.user.findUnique({
        where: {
          id: session.user?.id,
        },
        select: {
          stripeSubscriptionStatus: true,
        },
      });

      return match(data)
        .with(
          { stripeSubscriptionStatus: "active" },
          async () =>
            await ctx.prisma.portal.create({
              data: input,
            })
        )
        .with(null, () => {
          throw new Error("Could not find user");
        })
        .otherwise(() => {
          throw new Error(
            "You need to have a valid stripe subscription to access this"
          );
        });
    }),
});
