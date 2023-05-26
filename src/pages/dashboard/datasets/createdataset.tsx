import type { GetServerSideProps, NextPage } from "next";
import { getServerAuthSession } from "@server/auth";
import { Dashboard } from "@components/shared/dashboard/Dashboard";
import { CreateDatasetForm } from "@components/dataset/CreateDatasetForm";
import Head from "next/head";

const CreateDatasetDashboard: NextPage = () => {
  return (
    <>
      <Head>
        <title>T3-Dataportal - Create Dataset</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Dashboard current="datasets">
        <div className="max-w-xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
            Create datasets
          </h1>
          <div className="sm:flex sm:items-center">
            <div className="sm:flex-auto">
              <p className="mt-2 text-sm text-gray-700">
                Datasets are the main object in your data portal they are going
                to have a number metadata about one or more resources
              </p>
            </div>
          </div>
          <div className="mt-8 flow-root">
            <CreateDatasetForm />
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

export default CreateDatasetDashboard;
