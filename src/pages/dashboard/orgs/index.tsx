import type { GetServerSideProps, NextPage } from "next";
import { useSession } from "next-auth/react";
import { api } from "@utils/api";
import { getServerAuthSession } from "@server/auth";

import Loading from "@components/shared/Loading";
import { Dashboard } from "@components/shared/dashboard/Dashboard";
import { useLayoutEffect, useRef, useState } from "react";
import { classNames } from "@utils/classnames";
import Link from "next/link";

const orgs = [
  {
    slug: "my-organization",
    title: "My Organization",
    description: "The description that is describing the stuff inside the organization that is being described by this description",
    updatedAt: new Date(),
    image:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    slug: "my-organization",
    title: "My Organization",
    description: "The description that is describing the stuff inside the organization that is being described by this description",
    updatedAt: new Date(),
    image:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    slug: "my-organization",
    title: "My Organization",
    description: "The description that is describing the stuff inside the organization that is being described by this description",
    updatedAt: new Date(),
    image:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    slug: "my-organization",
    title: "My Organization",
    description: "The description that is describing the stuff inside the organization that is being described by this description",
    updatedAt: new Date(),
    image:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    slug: "my-organization",
    title: "My Organization",
    description: "The description that is describing the stuff inside the organization that is being described by this description",
    updatedAt: new Date(),
    image:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
];

const OrgsDashboard: NextPage = () => {
  const { data: sessionData } = useSession();
  const { data: portalData, isLoading: portalLoading } =
    api.portal.getPortalBySysAdminId.useQuery(
      { sysAdminId: sessionData?.user.id },
      { enabled: !!sessionData?.user?.id }
    );
  const checkbox = useRef<HTMLInputElement>(null);
  const [checked, setChecked] = useState(false);
  const [indeterminate, setIndeterminate] = useState(false);
  const [selectedOrgs, setSelectedOrgs] = useState<{
    slug: string;
    title: string;
    description: string;
    updatedAt: Date;
    image: string;
  }[]>([]);

  useLayoutEffect(() => {
    const isIndeterminate =
      selectedOrgs.length > 0 && selectedOrgs.length < orgs.length;
    setChecked(selectedOrgs.length === orgs.length);
    setIndeterminate(isIndeterminate);
    if (checkbox.current) checkbox.current.indeterminate = isIndeterminate;
  }, [selectedOrgs]);

  function toggleAll() {
    setSelectedOrgs(checked || indeterminate ? [] : orgs);
    setChecked(!checked && !indeterminate);
    setIndeterminate(false);
  }
  if (!portalData) return <Loading />;
  return (
    <Dashboard current="orgs">
      <div className="px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
          Orgs
        </h1>
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <p className="mt-2 text-sm text-gray-700">
              A list of all the organizations in your portal including their
              slug, title, description and image.
            </p>
          </div>
          <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
            <button
              type="button"
              className="block rounded-md bg-lime-600 px-3 py-1.5 text-center text-sm font-semibold leading-6 text-white shadow-sm hover:bg-lime-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-600"
            >
              Add organization
            </button>
          </div>
        </div>
        <div className="mt-8 flow-root">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <div className="relative">
                {selectedOrgs.length > 0 && (
                  <div className="absolute left-14 top-0 flex h-12 items-center space-x-3 bg-white sm:left-12">
                    <button
                      type="button"
                      className="inline-flex items-center rounded bg-white px-2 py-1 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-white"
                    >
                      Bulk edit
                    </button>
                    <button
                      type="button"
                      className="inline-flex items-center rounded bg-white px-2 py-1 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-white"
                    >
                      Delete all
                    </button>
                  </div>
                )}
                <div className="ring-1 ring-gray-300 sm:mx-0 sm:rounded-lg">
                  <table className="min-w-full table-fixed divide-y divide-gray-300">
                    <thead>
                      <tr>
                        <th
                          scope="col"
                          className="relative px-7 sm:w-12 sm:px-6"
                        >
                          <input
                            type="checkbox"
                            className="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-lime-600 focus:ring-lime-600"
                            ref={checkbox}
                            checked={checked}
                            onChange={toggleAll}
                          />
                        </th>
                        <th
                          scope="col"
                          className="min-w-[12rem] py-3.5 pr-3 text-left text-sm font-semibold text-gray-900"
                        >
                          Slug
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                        >
                          Title
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                        >
                          Description
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                        >
                          Last Updated
                        </th>
                        <th
                          scope="col"
                          className="relative py-3.5 pl-3 pr-4 sm:pr-3"
                        >
                          <span className="sr-only">Edit</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                      {orgs.map((org) => (
                        <tr
                          key={org.slug}
                          className={
                            selectedOrgs.includes(org)
                              ? "bg-gray-50"
                              : undefined
                          }
                        >
                          <td className="relative px-7 sm:w-12 sm:px-6">
                            {selectedOrgs.includes(org) && (
                              <div className="absolute inset-y-0 left-0 w-0.5 bg-lime-600" />
                            )}
                            <input
                              type="checkbox"
                              className="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-lime-600 focus:ring-lime-600"
                              value={org.slug}
                              checked={selectedOrgs.includes(org)}
                              onChange={(e) =>
                                setSelectedOrgs(
                                  e.target.checked
                                    ? [...selectedOrgs, org]
                                    : selectedOrgs.filter((p) => p !== org)
                                )
                              }
                            />
                          </td>
                          <td
                            className={classNames(
                              "whitespace-nowrap py-4 pr-3 text-sm font-medium",
                              selectedOrgs.includes(org)
                                ? "text-lime-600"
                                : "text-gray-900"
                            )}
                          >
                            <div className="flex items-start">
                              <div className="h-11 w-11 flex-shrink-0">
                                <img
                                  className="h-11 w-11 rounded-full"
                                  src={org.image}
                                  alt=""
                                />
                              </div>
                              <div className="ml-4">
                                <div className="font-medium text-gray-900">
                                  {org.slug}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {org.title}
                          </td>
                          <td className="px-3 py-4 text-sm text-gray-500">
                            {org.description}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {org.updatedAt.toLocaleString()}
                          </td>
                          <td className="whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-3">
                            <Link
                              href={`/dashboard/orgs/${org.slug}/edit`}
                              className="text-lime-600 hover:text-lime-900"
                            >
                              Edit
                              <span className="sr-only">, {org.slug}</span>
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
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

export default OrgsDashboard;
