import { generateOpenApiDocument } from "trpc-openapi";
import { env } from "../../env/server.mjs";
import { appRouter } from "./root";

// Generate OpenAPI schema document
export const openApiDocument = generateOpenApiDocument(appRouter, {
  title: "T3-Dataportal Read API",
  description: "OpenAPI compliant REST API built using tRPC with Next.js",
  version: "1.0.0",
  baseUrl: "/api",
  docsUrl: "https://github.com/jlalmes/trpc-openapi",
  tags: ["portals", "organizations"],
});
