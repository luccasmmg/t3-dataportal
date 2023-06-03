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
  url: z.preprocess(
    (arg) => (arg === "" ? undefined : arg),
    z.string().url().optional().nullable()
  ),
  authorEmail: z.preprocess(
    (arg) => (arg === "" ? undefined : arg),
    z.string().email().optional().nullable()
  ),
  licenseId: z.string().optional().nullable(),
  licenseTitle: z.string().optional().nullable(),
  licenseUrl: z.string().optional().nullable(),
  private: z.boolean().default(true),
  portalId: z.string(),
  orgId: z.string(),
  creatorId: z.string(),
});

export const SearchDatasetSchema = z.object({
  queryString: z.preprocess(
    (arg) => (arg === "" ? undefined : arg),
    z.string().optional()
  ),
  portalId: z.string(),
  groups: z.array(z.string()).optional(),
  orgs: z.preprocess((arg) => (arg === 'Filter by org' ? undefined : arg), z.string().optional()),
});

export type SearchDatasetInputs = z.infer<typeof SearchDatasetSchema>;
export type DatasetInputs = z.infer<typeof DatasetSchema>;
