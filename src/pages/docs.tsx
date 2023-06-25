import Layout from "@components/shared/Layout";
import type { NextPage } from "next";
import dynamic from "next/dynamic";
import { env } from "src/env/server.mjs";
import "swagger-ui-react/swagger-ui.css";

const SwaggerUI = dynamic(() => import("swagger-ui-react"), { ssr: false });

const Home: NextPage = () => {
  // Serve Swagger UI with our OpenAPI schema
  return (
    <Layout>
      <div className="my-16 px-6 lg:px-8">
        <SwaggerUI url="/api/openapi.json" />;
      </div>
    </Layout>
  );
};

export default Home;
