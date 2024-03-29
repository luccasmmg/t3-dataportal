import type { GetServerSideProps, NextPage } from "next";
import { getServerAuthSession } from "@server/auth";
import { Dashboard } from "@components/shared/dashboard/Dashboard";
import Head from "next/head";
import { api } from "@utils/api";
import { EditDatasetForm } from "@components/dataset/EditDatasetForm";
import Loading from "@components/shared/Loading";

const CreateOrganizationDashboard: NextPage<{ datasetId: string }> = ({
  datasetId,
}) => {
  const { data: datasetData, isLoading: datasetLoading } =
    api.dataset.getDatasetById.useQuery({
      id: datasetId,
    });
  if (datasetLoading) return <Loading />;
  if (!datasetData)
    return (
      <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
        Group not found
      </h1>
    );
  return (
    <>
      <Head>
        <title>T3-Dataportal - Create Org</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Dashboard current="datasets">
        <div className="max-w-xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold tracking-tight text-emerald-900 sm:text-3xl">
            {datasetData.title}
          </h1>
          <div className="sm:flex sm:items-center">
            <div className="sm:flex-auto">
              <p className="mt-2 text-sm text-gray-700">
                Organizations reflect the structure of your portal, every
                dataset must be assigned to an dataset
              </p>
            </div>
          </div>
          {datasetData && (
            <div className="mt-8 flow-root">
              <EditDatasetForm dataset={datasetData} />
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
      datasetId:
        context.params && typeof context.params.datasetId === "string"
          ? context.params.datasetId
          : "",
    },
  };
};

export default CreateOrganizationDashboard;
