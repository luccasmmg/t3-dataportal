import type { GetServerSideProps, NextPage } from "next";
import { useSession } from "next-auth/react";
import { api } from "@utils/api";
import { getServerAuthSession } from "@server/auth";

import Loading from "@components/shared/Loading";
import { Dashboard } from "@components/shared/dashboard/Dashboard";
import { useLayoutEffect, useRef, useState } from "react";
import { classNames } from "@utils/classnames";
import Link from "next/link";
import { CreateOrganizationForm } from "@components/organization/CreateOrganizationForm";

const CreateOrganizationDashboard: NextPage = () => {
  return (
    <Dashboard current="orgs">
      <div className="px-4 sm:px-6 lg:px-8 max-w-xl">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
          Create organization
        </h1>
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <p className="mt-2 text-sm text-gray-700">
              Organizations reflect the structure of your portal, every dataset must be assigned to an organization
            </p>
          </div>
        </div>
        <div className="mt-8 flow-root">
          <CreateOrganizationForm />
        </div>
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

export default CreateOrganizationDashboard;
