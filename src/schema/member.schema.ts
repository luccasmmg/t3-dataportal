import z from "zod";

export const InvitationSchemaCreate = z.object({
  portalId: z.string(),
  email: z.string(),
  type: z.enum(["sysadmin", "editor"]),
});

export const InvitationSchema = InvitationSchemaCreate.extend({
  id: z.string(),
});

export type InvitationSchemaCreateInputs = z.infer<
  typeof InvitationSchemaCreate
>;
