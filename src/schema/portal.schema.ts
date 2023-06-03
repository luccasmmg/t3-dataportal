import { Portal } from "@headlessui/react";
import { Prisma } from "@prisma/client";
import z from "zod";

export const PortalSchema = z.object({
  name: z
    .string()
    .regex(
      /^[^\(\) +]+$/,
      "The name cant have spaces nor the dot(.) character, it needs to be URL Compatible"
    ),
  title: z.string(),
  private: z.boolean().default(false),
  description: z.string().nullable(),
  sysAdminId: z.string(),
});

export type PortalInputs = z.infer<typeof PortalSchema>;

export type PortalFull = Prisma.PortalGetPayload<{
  include: {
    organizations: true;
    groups: true;
    datasets: true;
  };
}>;
