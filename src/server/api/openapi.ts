import { generateOpenApiDocument } from "trpc-openapi";
import { env } from "../../env/server.mjs";
import { appRouter } from "./root";

// Generate OpenAPI schema document
export const openApiDocument = generateOpenApiDocument(appRouter, {
  title: "Example CRUD API",
  description: "OpenAPI compliant REST API built using tRPC with Next.js",
  version: "1.0.0",
  baseUrl: `${env.NEXTAUTH_URL}/api`,
  docsUrl: "https://github.com/jlalmes/trpc-openapi",
  tags: ["portals", "organizations"],
});
