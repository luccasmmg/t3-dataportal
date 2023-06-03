import { api } from "@utils/api";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Loading from "@components/shared/Loading";
import { Fragment, ReactNode, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import {
  Bars3Icon,
  BuildingOfficeIcon,
  CircleStackIcon,
  DocumentMagnifyingGlassIcon,
  HomeIcon,
  RectangleGroupIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { classNames } from "@utils/classnames";
import Link from "next/link";

export const Dashboard: React.FC<{
  children?: ReactNode;
  current?: string;
}> = ({ children, current }) => {
  const navigation = [
    { id: "initial", name: "Dashboard", href: "/dashboard", icon: HomeIcon },
    {
      id: "datasets",
      name: "Datasets",
      href: "/dashboard/datasets",
      icon: CircleStackIcon,
    },
    {
      id: "orgs",
      name: "Organizations",
      href: "/dashboard/orgs",
      icon: BuildingOfficeIcon,
    },
    {
      id: "groups",
      name: "Groups",
      href: "/dashboard/groups",
      icon: RectangleGroupIcon,
    },
    {
      id: "docs",
      name: "Docs",
      href: "/docs",
      icon: DocumentMagnifyingGlassIcon,
    },
  ];

  const { push } = useRouter();
  const { data: sessionData } = useSession();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { data: portalData, isLoading: portalLoading } =
    api.portal.getPortalBySysAdminId.useQuery(
      { sysAdminId: sessionData?.user.id },
      { enabled: !!sessionData?.user?.id }
    );
  if (portalLoading || !sessionData) return <Loading />;
  if (portalData === null) void push("/newportal");

  if (!portalData) return <Loading />;
  return (
    <>
      {/*
        This example requires updating your template:

        ```
        <html class="h-full bg-white">
        <body class="h-full">
        ```
      */}
      <div>
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-50 lg:hidden"
            onClose={setSidebarOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-900/80" />
            </Transition.Child>

            <div className="fixed inset-0 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                      <button
                        type="button"
                        className="-m-2.5 p-2.5"
                        onClick={() => setSidebarOpen(false)}
                      >
                        <span className="sr-only">Close sidebar</span>
                        <XMarkIcon
                          className="h-6 w-6 text-white"
                          aria-hidden="true"
                        />
                      </button>
                    </div>
                  </Transition.Child>
                  {/* Sidebar component, swap this element with another sidebar if you like */}
                  <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-lime-600 px-6 pb-2">
                    <div className="flex h-16 shrink-0 items-center">
                      <Link href="/">
                        <img
                          className="h-8 w-auto"
                          src="https://tailwindui.com/img/logos/mark.svg?color=white"
                          alt="Your Company"
                        />
                      </Link>
                    </div>
                    <nav className="flex flex-1 flex-col">
                      <ul role="list" className="flex flex-1 flex-col gap-y-7">
                        <li>
                          <ul role="list" className="-mx-2 space-y-1">
                            {navigation.map((item) => (
                              <li key={item.name}>
                                <Link
                                  href={item.href}
                                  className={classNames(
                                    item.id === current
                                      ? "bg-lime-700 text-white"
                                      : "text-lime-200 hover:bg-lime-700 hover:text-white",
                                    "group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6"
                                  )}
                                >
                                  <item.icon
                                    className={classNames(
                                      item.id === current
                                        ? "text-white"
                                        : "text-lime-200 group-hover:text-white",
                                      "h-6 w-6 shrink-0"
                                    )}
                                    aria-hidden="true"
                                  />
                                  {item.name}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </li>
                      </ul>
                    </nav>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>

        {/* Static sidebar for desktop */}
        <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-lime-600 px-6">
            <div className="flex h-16 shrink-0 items-center">
              <Link href="/">
                <img
                  className="h-8 w-auto"
                  src="https://tailwindui.com/img/logos/mark.svg?color=white"
                  alt="Your Company"
                />
              </Link>
            </div>
            <nav className="flex flex-1 flex-col">
              <ul role="list" className="flex flex-1 flex-col gap-y-7">
                <li>
                  <ul role="list" className="-mx-2 space-y-1">
                    {navigation.map((item) => (
                      <li key={item.name}>
                        <Link
                          href={item.href}
                          className={classNames(
                            item.id === current
                              ? "bg-lime-700 text-white"
                              : "text-lime-200 hover:bg-lime-700 hover:text-white",
                            "group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6"
                          )}
                        >
                          <item.icon
                            className={classNames(
                              item.id === current
                                ? "text-white"
                                : "text-lime-200 group-hover:text-white",
                              "h-6 w-6 shrink-0"
                            )}
                            aria-hidden="true"
                          />
                          {item.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
                <li className="-mx-6 mt-auto">
                  <Link
                    href="#"
                    className="flex items-center gap-x-4 px-6 py-3 text-sm font-semibold leading-6 text-white hover:bg-lime-700"
                  >
                    {sessionData.user.image && (
                      <img
                        className="h-8 w-8 rounded-full bg-lime-700"
                        src={sessionData.user.image}
                        alt=""
                      />
                    )}
                    <span className="sr-only">Your profile</span>
                    <span aria-hidden="true">{sessionData.user.name}</span>
                  </Link>
                  <button
                    className="flex items-center gap-x-4 px-6 pb-3 text-sm font-semibold leading-6 text-white"
                    onClick={() => signOut()}
                  >
                    Sign out
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        <div className="sticky top-0 z-40 flex items-center gap-x-6 bg-lime-600 px-4 py-4 shadow-sm sm:px-6 lg:hidden">
          <button
            type="button"
            className="-m-2.5 p-2.5 text-lime-200 lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
          <div className="flex-1 text-sm font-semibold leading-6 text-white">
            Dashboard
          </div>
          <a href="#">
            <span className="sr-only">Your profile</span>
            {sessionData.user.image && (
              <img
                className="h-8 w-8 rounded-full bg-lime-700"
                src={sessionData.user.image}
                alt=""
              />
            )}
          </a>
        </div>

        <main className="py-10 lg:pl-72">{children}</main>
      </div>
    </>
  );
};
