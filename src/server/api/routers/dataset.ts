import { TRPCError } from "@trpc/server";
import { match, P } from "ts-pattern";
import { z } from "zod";
import { protectedProcedure, createTRPCRouter, publicProcedure } from "../trpc";
import { DatasetSchema, SearchDatasetSchema } from "@schema/dataset.schema";
import { ResourceSchema } from "@schema/resource.schema";
import { OrganizationSchema } from "@schema/organization.schema";
import { GroupSchema } from "@schema/group.schema";

export const datasetRouter = createTRPCRouter({
  getAllDatasets: publicProcedure
    .meta({
      openapi: {
        method: "GET",
        path: "/{portalName}/datasets",
        tags: ["datasets"],
        summary: "Get a list of all the datasets inside a portal",
      },
    })
    .input(z.object({ portalName: z.string() }))
    .output(
      z.array(
        DatasetSchema.extend({ resources: z.array(ResourceSchema).optional() })
      )
    )
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
      return await ctx.prisma.dataset.findMany({
        where: { portalId: portal.id, private: false },
      });
    }),
  searchDatasetsPublic: publicProcedure
    .meta({
      openapi: {
        method: "GET",
        path: "/{portalName}/datasets/search",
        tags: ["datasets"],
        summary: "Search the datasets inside a portal",
      },
    })
    .input(
      z.object({
        queryString: z.preprocess(
          (arg) => (arg === "" ? undefined : arg),
          z.string().optional()
        ),
        portalName: z.string(),
        groups: z.string().optional(),
        orgs: z.preprocess(
          (arg) => (arg === "Filter by org" ? undefined : arg),
          z.string().optional()
        ),
      })
    )
    .output(
      z.array(
        DatasetSchema.extend({
          resources: z.array(ResourceSchema).optional(),
          Organization: OrganizationSchema,
          groups: z.array(GroupSchema).optional(),
        })
      )
    )
    .query(async ({ ctx, input }) => {
      const _groups = input.groups
        ? input.groups.split(",").map((group) => group.trim())
        : undefined;
      if (!input.queryString && (!input.groups || !_groups) && !input.orgs) {
        return ctx.prisma.dataset.findMany({
          where: {
            Portal: {
              name: input.portalName,
            },
          },
          include: {
            Organization: true,
            groups: true,
            resources: true,
          },
        });
      }
      if (!input.queryString) {
        return ctx.prisma.dataset.findMany({
          where: {
            Portal: {
              name: input.portalName,
            },
            groups: {
              some: {
                name: { in: _groups },
              },
            },
            Organization: {
              name: { in: input.orgs },
            },
          },
          include: {
            Organization: true,
            groups: true,
            resources: true,
          },
        });
      }
      return await ctx.prisma.dataset.findMany({
        where: {
          OR: [
            {
              name: {
                search: input.queryString,
              },
            },
            {
              title: {
                search: input.queryString,
              },
            },
            {
              description: {
                search: input.queryString,
              },
            },
            {
              url: {
                search: input.queryString,
              },
            },
            {
              authorEmail: {
                search: input.queryString,
              },
            },
          ],
          Portal: {
            name: input.portalName,
          },
          groups: {
            some: {
              name: { in: _groups },
            },
          },
          Organization: {
            name: { in: input.orgs },
          },
        },
        include: {
          Organization: true,
          groups: true,
          resources: true,
        },
      });
    }),
  searchDatasets: protectedProcedure
    .input(SearchDatasetSchema)
    .query(async ({ ctx, input }) => {
      if (
        !input.queryString &&
        (!input.groups || input.groups.length === 0) &&
        !input.orgs
      ) {
        return ctx.prisma.dataset.findMany({
          where: {
            Portal: {
              name: input.portalName,
            },
          },
        });
      }
      if (!input.queryString) {
        return ctx.prisma.dataset.findMany({
          where: {
            Portal: {
              name: input.portalName,
            },
            groups: {
              some: {
                name: { in: input.groups },
              },
            },
            Organization: {
              name: { in: input.orgs },
            },
          },
        });
      }
      return await ctx.prisma.dataset.findMany({
        where: {
          OR: [
            {
              name: {
                search: input.queryString,
              },
            },
            {
              title: {
                search: input.queryString,
              },
            },
            {
              description: {
                search: input.queryString,
              },
            },
            {
              url: {
                search: input.queryString,
              },
            },
            {
              authorEmail: {
                search: input.queryString,
              },
            },
          ],
          Portal: {
            name: input.portalName,
          },
          groups: {
            some: {
              name: { in: input.groups },
            },
          },
          Organization: {
            name: { in: input.orgs },
          },
        },
      });
    }),
  getAllDatasetsAdmin: protectedProcedure
    .input(z.void())
    .query(async ({ ctx }) => {
      const portal = await ctx.prisma.portal.findFirst({
        where: { sysAdminId: ctx.session.user.id },
        include: {
          datasets: true,
        },
      });
      if (!portal) {
        throw new TRPCError({
          message: "Portal not found",
          code: "NOT_FOUND",
        });
      }
      return portal.datasets;
    }),
  getDatasetByName: publicProcedure
    .meta({
      openapi: {
        method: "GET",
        path: "/{portalName}/dataset/{datasetName}",
        tags: ["datasets"],
        summary: "Get a dataset object inside a portal by name",
      },
    })
    .input(z.object({ portalName: z.string(), datasetName: z.string() }))
    .output(
      DatasetSchema.extend({ datasets: z.array(ResourceSchema).optional() })
    )
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
      const dataset = await ctx.prisma.dataset.findFirst({
        where: { portalId: portal.id, name: input.datasetName, private: false },
        include: {
          resources: { where: { private: false } },
        },
      });
      if (!dataset) {
        throw new TRPCError({
          message: "Dataset not found",
          code: "NOT_FOUND",
        });
      }
      return { ...dataset };
    }),
  getDatasetById: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      return await ctx.prisma.dataset.findFirst({
        where: { id: input.id },
        include: {
          resources: true,
          groups: true,
          Organization: true,
        },
      });
    }),
  createDataset: protectedProcedure
    .input(DatasetSchema)
    .mutation(async ({ ctx, input }) => {
      const { session, prisma } = ctx;
      const portal = await prisma.portal.findFirst({
        where: {
          sysAdminId: session.user?.id,
        },
      });

      const groupsId = input.groupsId;
      delete input.groupsId;
      return match(portal)
        .with(
          { id: P.select() },
          async (portalId) =>
            await ctx.prisma.dataset.create({
              data: {
                ...input,
                portalId,
                creatorId: session.user.id,
                groups: groupsId
                  ? {
                      connect: groupsId.map((id) => ({ id })),
                    }
                  : {},
              },
            })
        )
        .otherwise(() => {
          throw new Error(
            "You can't create an dataset since you don't own any portal"
          );
        });
    }),
  editDataset: protectedProcedure
    .input(DatasetSchema)
    .mutation(async ({ ctx, input }) => {
      const groupsId = input.groupsId;
      delete input.groupsId;
      await ctx.prisma.dataset.update({
        where: {
          id: input.id,
        },
        data: {
          ...input,
          groups: groupsId
            ? {
                set: groupsId.map((id) => ({ id })),
              }
            : {},
        },
      });
    }),
  deleteDatasets: protectedProcedure
    .input(z.object({ ids: z.array(z.string()) }))
    .mutation(async ({ ctx, input }) => {
      await ctx.prisma.dataset.deleteMany({
        where: {
          id: { in: input.ids },
        },
      });
    }),
});
