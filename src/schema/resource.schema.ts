import z from "zod";

export const ResourceSchema = z.object({
  id: z.string().optional(),
  name: z
    .string()
    .regex(
      /^[^\(\) +]+$/,
      "The name cant have spaces nor the dot(.) character, it needs to be URL Compatible"
    ),
  url: z.string().url(),
  format: z.string().optional().nullable(),
  private: z.boolean().default(true),
  datasetId: z.string(),
});

export type ResourceInputs = z.infer<typeof ResourceSchema>;
