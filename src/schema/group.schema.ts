import z from "zod";

export const GroupSchema = z.object({
  name: z
    .string()
    .regex(
      /^[^\(\) +]+$/,
      "The name cant have spaces nor the dot(.) character, it needs to be URL Compatible"
    ),
  title: z.string(),
  image: z.string().url().optional().nullable(),
  description: z.string().optional().nullable(),
  id: z.string().optional(),
});

export type GroupInputs = z.infer<typeof GroupSchema>;
