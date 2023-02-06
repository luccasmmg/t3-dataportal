import { match, P } from 'ts-pattern'
import { PortalSchema } from '../../../schema/portal.schema'
import { protectedProcedure, createTRPCRouter } from '../trpc'

export const portalRouter = createTRPCRouter({
  createPortal: protectedProcedure
    .input(PortalSchema)
    .mutation(async ({ ctx, input }) => {
      const { session, prisma } = ctx
      const data = await prisma.user.findUnique({
        where: {
          id: session.user?.id,
        },
        select: {
          stripeSubscriptionStatus: true,
        },
      })

      return match(data)
        .with(
          { stripeSubscriptionStatus: 'active' },
          async () =>
            await ctx.prisma.portal.create({
              data: input,
            })
        )
        .with(null, () => {
          throw new Error('Could not find user')
        })
        .otherwise(() => {
          throw new Error(
            'You need to have a valid stripe subscription to access this'
          )
        })
    }),
})
