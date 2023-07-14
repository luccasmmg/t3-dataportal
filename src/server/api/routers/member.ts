import { InvitationSchemaCreate } from "@schema/member.schema";
import { protectedProcedure, createTRPCRouter } from "../trpc";
import { env } from "../../../env/server.mjs";
import { Resend } from "resend";
import InviteMemberEmail from "@components/email/InviteTemplate";

export const memberRouter = createTRPCRouter({
  inviteMember: protectedProcedure
    .input(InvitationSchemaCreate)
    .mutation(async ({ ctx, input }) => {
      const { session, prisma } = ctx;
      const portal = await prisma.portal.findFirst({
        where: {
          sysAdminId: session.user?.id,
        },
      });
      if (!portal || portal.id != input.portalId) {
        throw new Error("You can't invite a user to a portal you don't own");
      }
      if (!session.user || !session.user.email) {
        throw new Error("You must be logged in to invite a user");
      }
      const resend = new Resend(env.RESEND_API_KEY);
      try {
        const invitation = await prisma.invitationToBeMember.create({
          data: { ...input },
        });
        await resend.emails.send({
          from: "T3-Dataportal <invite@t3dataportal.luccasmateus.com>",
          to: [input.email],
          subject: `Welcome to ${portal.name}!`,
          react: InviteMemberEmail({
            invitedByEmail: session.user.email,
            portalName: portal.name,
            inviteLink: `https://t3-dataportal.vercel.app/auth/signin?callbackUrl=https%3A%2F%2Ft3-dataportal.vercel.app?invitationId=${invitation.id}`,
            userImage:
              session.user.image !== null ? session.user.image : undefined,
          }),
        });
        return invitation;
      } catch (error) {
        throw new Error("Something went wrong while sending the email");
      }
    }),
});
