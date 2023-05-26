import type { GetServerSideProps, NextPage } from "next";
import { getServerAuthSession } from "@server/auth";
import { Dashboard } from "@components/shared/dashboard/Dashboard";
import { CreateOrganizationForm } from "@components/organization/CreateOrganizationForm";
import Head from "next/head";

const CreateOrganizationDashboard: NextPage = () => {
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
          <div className="mt-8 flow-root">
            <CreateOrganizationForm />
          </div>
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
    },
  };
};

export default CreateOrganizationDashboard;
