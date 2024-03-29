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
        include: {
          organizations: true,
          groups: true,
          datasets: true,
        },
      });
      if (!portal) {
        return null;
      }
      return { ...portal };
    }),
  getAllPortals: publicProcedure
    .meta({
      openapi: {
        method: "GET",
        path: "/portal",
        tags: ["portals"],
        summary: "Get a list of all the portals inside the system",
      },
    })
    .input(z.void())
    .output(z.array(PortalSchema))
    .query(async ({ ctx, input }) => {
      return await ctx.prisma.portal.findMany();
    }),
  getPortalByName: publicProcedure
    .meta({
      openapi: {
        method: "GET",
        path: "/portal/{portalName}",
        tags: ["portals"],
        summary: "Get a portal object by the name",
      },
    })
    .input(z.object({ portalName: z.string() }))
    .output(PortalSchema)
    .query(async ({ ctx, input }) => {
      const portal = await ctx.prisma.portal.findFirst({
        where: { name: input.portalName },
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
      const data = await prisma.portal.findFirst({
        where: {
          sysAdminId: session.user?.id,
        },
      });

      return match(data)
        .with(
          null,
          async () =>
            await ctx.prisma.portal.create({
              data: input,
            })
        )
        .otherwise(({ name }) => {
          throw new Error(
            `You cant create another portal since you are already the owner of the "${name}" portal`
          );
        });
    }),
});
