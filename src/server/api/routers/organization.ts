import { TRPCError } from "@trpc/server";
import { match, P } from "ts-pattern";
import { z } from "zod";
import { protectedProcedure, createTRPCRouter, publicProcedure } from "../trpc";
import { OrganizationSchema } from "@schema/organization.schema";

export const organizationRouter = createTRPCRouter({
  getAllOrganizations: publicProcedure
    .meta({
      openapi: {
        method: "GET",
        path: "/{portalName}/organization",
        tags: ["organizations"],
        summary: "Get a list of all the organizations inside a portal",
      },
    })
    .input(z.object({ portalName: z.string() }))
    .output(z.array(OrganizationSchema))
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
      return await ctx.prisma.organization.findMany({
        where: { portalId: portal.id, private: false },
      });
    }),
  getAllOrganizationsAdmin: protectedProcedure
    .input(z.void())
    .query(async ({ ctx }) => {
      const portal = await ctx.prisma.portal.findFirst({
        where: { sysAdminId: ctx.session.user.id },
        include: {
          organizations: true,
        },
      });
      if (!portal) {
        throw new TRPCError({
          message: "Portal not found",
          code: "NOT_FOUND",
        });
      }
      return portal.organizations;
    }),
  getOrganizationByName: publicProcedure
    .meta({
      openapi: {
        method: "GET",
        path: "/{portalName}/organization/{organizationName}",
        tags: ["organizations"],
        summary: "Get a organization object inside a portal by name",
      },
    })
    .input(z.object({ portalName: z.string(), organizationName: z.string() }))
    .output(OrganizationSchema)
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
      const organization = await ctx.prisma.organization.findFirst({
        where: { portalId: portal.id, name: input.organizationName },
      });
      if (!organization) {
        throw new TRPCError({
          message: "Organization not found",
          code: "NOT_FOUND",
        });
      }
      return { ...organization };
    }),
  getOrganizationById: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      return await ctx.prisma.organization.findFirst({
        where: { id: input.id },
      });
    }),
  createOrganization: protectedProcedure
    .input(OrganizationSchema)
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
            await ctx.prisma.organization.create({
              data: { ...input, portalId },
            })
        )
        .otherwise(() => {
          throw new Error(
            "You can't create an organization since you don't own any portal"
          );
        });
    }),
  editOrganization: protectedProcedure
    .input(OrganizationSchema)
    .mutation(async ({ ctx, input }) => {
      await ctx.prisma.organization.update({
        where: {
          id: input.id,
        },
        data: { ...input },
      });
    }),
});
