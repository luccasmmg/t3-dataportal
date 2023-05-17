import type { GetServerSideProps, NextPage } from "next";
import { useSession } from "next-auth/react";
import { api } from "@utils/api";
import { getServerAuthSession } from "@server/auth";

import Loading from "@components/shared/Loading";
import { Dashboard } from "@components/shared/dashboard/Dashboard";

const GroupsDashboard: NextPage = () => {
  const { data: sessionData } = useSession();
  const { data: portalData, isLoading: portalLoading } =
    api.portal.getPortalBySysAdminId.useQuery(
      { sysAdminId: sessionData?.user.id },
      { enabled: !!sessionData?.user?.id }
    );
  if (!portalData) return <Loading />;
  return (
    <Dashboard current="groups">
        <div className="px-4 sm:px-6 lg:px-8">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              Groups
            </h1>
        </div>
    </Dashboard>
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

export default GroupsDashboard;
