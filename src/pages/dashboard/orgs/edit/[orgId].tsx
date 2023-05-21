import type { GetServerSideProps, NextPage } from "next";
import { getServerAuthSession } from "@server/auth";
import { Dashboard } from "@components/shared/dashboard/Dashboard";
import Head from "next/head";
import { api } from "@utils/api";
import { EditOrganizationForm } from "@components/organization/EditOrganizationFormt";

const CreateOrganizationDashboard: NextPage<{ orgId: string }> = ({
  orgId,
}) => {
  const { data: orgData, isLoading: orgLoading } =
    api.organization.getOrganizationById.useQuery({
      id: orgId,
    });
  return (
    <>
      <Head>
        <title>T3-Dataportal - Create Org</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Dashboard current="orgs">
        <div className="max-w-xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
            Create organization
          </h1>
          <div className="sm:flex sm:items-center">
            <div className="sm:flex-auto">
              <p className="mt-2 text-sm text-gray-700">
                Organizations reflect the structure of your portal, every
                dataset must be assigned to an organization
              </p>
            </div>
          </div>
          {orgData && (
            <div className="mt-8 flow-root">
              <EditOrganizationForm org={orgData} />
            </div>
          )}
        </div>
      </Dashboard>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getServerAuthSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
      orgId:
        context.params && typeof context.params.orgId === "string"
          ? context.params.orgId
          : "",
    },
  };
};

export default CreateOrganizationDashboard;
