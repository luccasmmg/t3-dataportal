import z from "zod";
import { ResourceSchema } from "./resource.schema";

export const DatasetSchema = z.object({
  id: z.string().optional(),
  name: z
    .string()
    .regex(
      /^[^\(\) +]+$/,
      "The name cant have spaces nor the dot(.) character, it needs to be URL Compatible"
    ),
  title: z.string(),
  description: z.string().optional().nullable(),
  url: z.string().url().optional().nullable(),
  authorEmail: z.string().email().optional().nullable(),
  licenseId: z.string().optional().nullable(),
  licenseTitle: z.string().optional().nullable(),
  licenseUrl: z.string().optional().nullable(),
  private: z.boolean().default(true),
  portalId: z.string(),
  orgId: z.string(),
  creatorId: z.string(),
  
});

export type DatasetInputs = z.infer<typeof DatasetSchema>;
