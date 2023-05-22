import type { GetServerSideProps, NextPage } from "next";
import { useSession } from "next-auth/react";
import { api } from "@utils/api";
import { useRouter } from "next/router";
import { getServerAuthSession } from "@server/auth";

import Loading from "@components/shared/Loading";
import { Dashboard } from "@components/shared/dashboard/Dashboard";
import Head from "next/head";

const InitialDashboard: NextPage = () => {
  const { push } = useRouter();
  const { data: sessionData } = useSession();
  const { data: portalData, isLoading: portalLoading } =
    api.portal.getPortalBySysAdminId.useQuery(
      { sysAdminId: sessionData?.user.id },
      { enabled: !!sessionData?.user?.id }
    );
  if (portalLoading) return <Loading />;
  if (portalData === null) push("/newportal");
  if (!portalData) return <Loading />;
  return (
    <>
      <Head>
        <title>T3-Dataportal - Dashboard</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Dashboard current="initial">
        <div className="px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
            {portalData.title}
          </h1>
          <p className="mt-2 text-sm text-gray-500">{portalData.description}</p>
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

export default InitialDashboard;
