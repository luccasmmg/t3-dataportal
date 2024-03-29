import type { GetServerSideProps, NextPage } from "next";
import { useSession } from "next-auth/react";
import { api } from "@utils/api";
import { useRouter } from "next/router";
import { getServerAuthSession } from "@server/auth";

import Loading from "@components/shared/Loading";
import { Dashboard } from "@components/shared/dashboard/Dashboard";
import Head from "next/head";
import { ShowcaseCard } from "@components/showcase/ShowcaseCard";

const showcases = [
  {
    title: "Basic portal",
    description:
      "A basic portal buitl with AstroJS, its main focus is sending as few JS as possible to the end user",
    image: "/images/showcases/basic_portal.png",
    link: "https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fluccasmmg%2Ft3-dataportal%2Ftree%2Fmain%2Ffrontends%2Fbasic-portal&env=PUBLIC_PORTAL_NAME&envDescription=Name%20of%20your%20data%20portal%2C%20should%20be%20the%20same%20as%20you%20setup%20in%20the%20creation%20form%20&redirect-url=https%3A%2F%2Ft3-dataportal.vercel.app%2Fdashboard",
    technology: "astrojs" as const,
  },
];

const ShowcasesDashboard: NextPage = () => {
  const { push } = useRouter();
  const { data: sessionData } = useSession();
  const { data: portalData, isLoading: portalLoading } =
    api.portal.getPortalBySysAdminId.useQuery(
      { sysAdminId: sessionData?.user.id },
      { enabled: !!sessionData?.user?.id }
    );
  if (portalLoading) return <Loading />;
  if (portalData === null) void push("/newportal");
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
            Frontends
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            Here you can select a frontend for your portal, this will require a
            Github and Vercel account, just click on the image and everything
            should be handled relatively easy for you
          </p>
          <div className="grid max-w-7xl grid-cols-1 py-4 md:grid-cols-3 xl:grid-cols-4">
            {showcases.map((showcase) => (
              <ShowcaseCard
                key={showcase.link}
                {...showcase}
                link={
                  showcase.link +
                  `&project-name=${portalData.name}-frontend&repository-name=${portalData.name}-frontend`
                }
              />
            ))}
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

export default ShowcasesDashboard;
