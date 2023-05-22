import { Menu, Disclosure, Transition, Dialog } from "@headlessui/react";
import {
  Bars3Icon,
  ChevronDownIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { Fragment, useState } from "react";

const navigation = [
  { name: "Home", href: "/" },
  { name: "Docs", href: "/docs" },
];

export function NavBar({ dashboard = false }: { dashboard?: boolean }) {
  const { data: sessionData } = useSession();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  return (
    <header className="absolute inset-x-0 top-0 z-50">
      <nav
        className="flex items-center justify-between p-6 lg:px-8"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <a href="#" className="-m-1.5 p-1.5">
            <span className="sr-only">Your Company</span>
            <img
              className="h-8 w-auto"
              src="https://tailwindui.com/img/logos/mark.svg?color=lime&shade=600"
              alt=""
            />
          </a>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          {navigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              {item.name}
            </a>
          ))}
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          {sessionData && sessionData.user && sessionData.user.name ? (
            <LoginDropdown
              username={sessionData.user.name}
              avatar={sessionData.user.image}
            />
          ) : (
            <button
              onClick={() => signIn()}
              className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900"
            >
              Log in
            </button>
          )}
        </div>
      </nav>
      <Dialog
        as="div"
        className="lg:hidden"
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
      >
        <div className="fixed inset-0 z-50" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <img
                className="h-8 w-auto"
                src="https://tailwindui.com/img/logos/mark.svg?color=lime&shade=600"
                alt=""
              />
            </a>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            {sessionData && sessionData.user && sessionData.user.name ? (
              <LoginMobile
                username={sessionData.user.name}
                avatar={sessionData.user.image}
              />
            ) : (
              <div className="border-t border-gray-200 pb-3 pt-4">
                <div className="flex items-center">
                  <div className="text-base font-medium text-gray-800">
                    <button
                      onClick={() => signIn()}
                      className="block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800"
                    >
                      Logar
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  );
}

export function LoginMobile({
  username,
  avatar,
}: {
  username: string;
  avatar?: string | null;
}) {
  return (
    <div className="border-t border-gray-200 pb-3 pt-4">
      <div className="flex items-center px-4">
        <div className="flex-shrink-0">
          {avatar ? (
            <img
              className="inline-block h-8 w-8 rounded-full"
              src={avatar}
              alt={"Avatar of" + username}
            />
          ) : (
            <></>
          )}
        </div>
        <div className="ml-3">
          <div className="text-base font-medium text-gray-800">{username}</div>
        </div>
      </div>
      <div className="mt-3 space-y-1">
        <Link
          href="/dashboard"
          className="block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800"
        >
          Dashboard
        </Link>
        <button
          onClick={() => signOut()}
          className="block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export function LoginDropdown({
  username,
  avatar,
}: {
  username: string;
  avatar?: string | null;
}) {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex w-full items-center justify-center gap-x-2 rounded-full border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-lime-500 focus:ring-offset-2 focus:ring-offset-gray-100">
          {avatar ? (
            <img
              className="inline-block h-8 w-8 rounded-full"
              src={avatar}
              alt={"Avatar of" + username}
            />
          ) : (
            <></>
          )}
          {username}
          <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <Link
                  href="/dashboard"
                  className={`${
                    active ? "text-gray-900" : "text-gray-700"
                  } block px-4 py-2 text-sm`}
                >
                  Dashboard
                </Link>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={() => signOut()}
                  className={`${
                    active ? "text-gray-900" : "text-gray-700"
                  } block px-4 py-2 text-sm`}
                >
                  Logout
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
