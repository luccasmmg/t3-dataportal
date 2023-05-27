import { z } from "zod";
import { protectedProcedure, createTRPCRouter, publicProcedure } from "../trpc";
import { ResourceSchema } from "@schema/resource.schema";

export const resourceRouter = createTRPCRouter({
  getResourceById: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      return await ctx.prisma.resource.findFirst({
        where: { id: input.id },
      });
    }),
  createResource: protectedProcedure
    .input(ResourceSchema)
    .mutation(async ({ ctx, input }) => {
      await ctx.prisma.resource.create({
        data: input,
      });
    }),
  editResource: protectedProcedure
    .input(ResourceSchema)
    .mutation(async ({ ctx, input }) => {
      await ctx.prisma.resource.update({
        where: {
          id: input.id,
        },
        data: { ...input },
      });
    }),
  deleteResources: protectedProcedure
    .input(z.object({ ids: z.array(z.string()) }))
    .mutation(async ({ ctx, input }) => {
      await ctx.prisma.resource.deleteMany({
        where: {
          id: { in: input.ids },
        },
      });
    }),
});
