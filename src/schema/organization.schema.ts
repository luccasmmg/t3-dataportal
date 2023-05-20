import z from "zod";

export const OrganizationSchema = z.object({
  name: z.string().regex(
      /^[^\(\) +]+$/,
      "The name cant have spaces nor the dot(.) character, it needs to be URL Compatible"
    ),
  title: z.string(),
  image: z.string().url().optional().nullable(),
  description: z.string().optional().nullable(),
})

export type OrganizationInputs = z.infer<typeof OrganizationSchema>;