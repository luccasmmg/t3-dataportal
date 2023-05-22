import { TRPCError } from "@trpc/server";
import { match, P } from "ts-pattern";
import { z } from "zod";
import { protectedProcedure, createTRPCRouter, publicProcedure } from "../trpc";
import { GroupSchema } from "@schema/group.schema";

export const groupRouter = createTRPCRouter({
  getAllGroups: publicProcedure
    .meta({
      openapi: {
        method: "GET",
        path: "/{portalName}/group",
        tags: ["groups"],
        summary: "Get a list of all the groups inside a portal",
      },
    })
    .input(z.object({ portalName: z.string() }))
    .output(z.array(GroupSchema))
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
      return await ctx.prisma.group.findMany({
        where: { portalId: portal.id },
      });
    }),
  getAllGroupsAdmin: protectedProcedure
    .input(z.void())
    .query(async ({ ctx }) => {
      const portal = await ctx.prisma.portal.findFirst({
        where: { sysAdminId: ctx.session.user.id },
        include: {
          groups: true,
        },
      });
      if (!portal) {
        throw new TRPCError({
          message: "Portal not found",
          code: "NOT_FOUND",
        });
      }
      return portal.groups;
    }),
  getGroupByName: publicProcedure
    .meta({
      openapi: {
        method: "GET",
        path: "/{portalName}/group/{groupName}",
        tags: ["groups"],
        summary: "Get a group object inside a portal by name",
      },
    })
    .input(z.object({ portalName: z.string(), groupName: z.string() }))
    .output(GroupSchema)
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
      const group = await ctx.prisma.group.findFirst({
        where: { portalId: portal.id, name: input.groupName },
      });
      if (!group) {
        throw new TRPCError({
          message: "Group not found",
          code: "NOT_FOUND",
        });
      }
      return { ...group };
    }),
  getGroupById: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      return await ctx.prisma.group.findFirst({
        where: { id: input.id },
      });
    }),
  createGroup: protectedProcedure
    .input(GroupSchema)
    .mutation(async ({ ctx, input }) => {
      const { session, prisma } = ctx;
      const portal = await prisma.portal.findFirst({
        where: {
          sysAdminId: session.user?.id,
        },
      });

      return match(portal)
        .with(
          { id: P.select() },
          async (portalId) =>
            await ctx.prisma.group.create({
              data: { ...input, portalId },
            })
        )
        .otherwise(() => {
          throw new Error(
            "You can't create an group since you don't own any portal"
          );
        });
    }),
  editGroup: protectedProcedure
    .input(GroupSchema)
    .mutation(async ({ ctx, input }) => {
      await ctx.prisma.group.update({
        where: {
          id: input.id,
        },
        data: { ...input },
      });
    }),
});
