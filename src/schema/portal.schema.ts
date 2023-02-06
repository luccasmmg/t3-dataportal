import z from "zod";

export const PortalSchema = z.object({
  name: z.string().regex(
      /^[^\(\) +]+$/,
      "The name cant have spaces nor the dot(.) character, it needs to be URL Compatible"
    ),
  title: z.string(),
  sysAdminId: z.string(), 
})

export type PortalInputs = z.infer<typeof PortalSchema>;