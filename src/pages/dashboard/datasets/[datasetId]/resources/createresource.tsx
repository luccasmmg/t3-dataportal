import type { GetServerSideProps, NextPage } from "next";
import { getServerAuthSession } from "@server/auth";
import { Dashboard } from "@components/shared/dashboard/Dashboard";
import { CreateResourceForm } from "@components/resource/CreateResourceForm";
import Head from "next/head";

const CreateResourceDashboard: NextPage = () => {
  return (
    <>
      <Head>
        <title>T3-Dataportal - Create resource</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Dashboard current="datasets">
        <div className="max-w-xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
            Create resource
          </h1>
          <div className="mt-8 flow-root">
            <CreateResourceForm />
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

export default CreateResourceDashboard;