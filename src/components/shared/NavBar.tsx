import { Menu, Disclosure, Transition } from '@headlessui/react'
import {
  Bars3Icon,
  ChevronDownIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import { signIn, signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import { Fragment } from 'react'

export function NavBar({ dashboard = false }: { dashboard?: boolean }) {
  const { data: sessionData } = useSession()
  return (
    <Disclosure as='nav' className='bg-white shadow'>
      {({ open }) => (
        <>
          <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
            <div className='flex h-16 justify-between'>
              {!dashboard && (
                <div className='flex'>
                  <div className='flex flex-shrink-0 items-center'>
                    <Link className='block lg:hidden' href='/'>
                      <img
                        className='block h-8 w-auto lg:hidden'
                        src='https://tailwindui.com/img/logos/mark.svg?color=lime&shade=600'
                        alt='Your Company'
                      />
                    </Link>
                    <Link className='hidden lg:block' href='/'>
                      <img
                        className='hidden h-8 w-auto lg:block'
                        src='https://tailwindui.com/img/logos/mark.svg?color=lime&shade=600'
                        alt='Your Company'
                      />
                    </Link>
                  </div>
                </div>
              )}
              <div className='hidden sm:ml-6 sm:flex sm:items-center'>
                {/* Profile dropdown */}
                <Menu as='div' className='relative ml-3'>
                  <div>
                    {sessionData &&
                    sessionData.user &&
                    sessionData.user.name ? (
                      <LoginDropdown
                        username={sessionData.user.name}
                        avatar={sessionData.user.image}
                      />
                    ) : (
                      <button
                        onClick={() => signIn()}
                        className='whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900'
                      >
                        Logar
                      </button>
                    )}
                  </div>
                </Menu>
              </div>
              <div className='-mr-2 flex items-center sm:hidden'>
                {/* Mobile menu button */}
                <Disclosure.Button className='inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-lime-500'>
                  <span className='sr-only'>Open main menu</span>
                  {open ? (
                    <XMarkIcon className='block h-6 w-6' aria-hidden='true' />
                  ) : (
                    <Bars3Icon className='block h-6 w-6' aria-hidden='true' />
                  )}
                </Disclosure.Button>
              </div>
            </div>
          </div>
          {sessionData && sessionData.user && sessionData.user.name ? (
            <LoginMobile
              username={sessionData.user.name}
              avatar={sessionData.user.image}
            />
          ) : (
            <Disclosure.Panel className='sm:hidden'>
              <div className='border-t border-gray-200 pt-4 pb-3'>
                <div className='flex items-center'>
                  <div className='text-base font-medium text-gray-800'>
                    <Disclosure.Button
                      onClick={() => signIn()}
                      className='block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800'
                    >
                      Logar
                    </Disclosure.Button>
                  </div>
                </div>
              </div>
            </Disclosure.Panel>
          )}
        </>
      )}
    </Disclosure>
  )
}

export function LoginMobile({
  username,
  avatar,
}: {
  username: string
  avatar?: string | null
}) {
  return (
    <Disclosure.Panel className='sm:hidden'>
      <div className='border-t border-gray-200 pt-4 pb-3'>
        <div className='flex items-center px-4'>
          <div className='flex-shrink-0'>
            {avatar ? (
              <img
                className='inline-block h-8 w-8 rounded-full'
                src={avatar}
                alt={'Avatar of' + username}
              />
            ) : (
              <></>
            )}
          </div>
          <div className='ml-3'>
            <div className='text-base font-medium text-gray-800'>
              {username}
            </div>
          </div>
        </div>
        <div className='mt-3 space-y-1'>
          <Disclosure.Button
            onClick={() => signOut()}
            className='block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800'
          >
            Logout
          </Disclosure.Button>
        </div>
      </div>
    </Disclosure.Panel>
  )
}

export function LoginDropdown({
  username,
  avatar,
}: {
  username: string
  avatar?: string | null
}) {
  return (
    <Menu as='div' className='relative inline-block text-left'>
      <div>
        <Menu.Button className='inline-flex w-full items-center justify-center gap-x-2 rounded-full border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-lime-500 focus:ring-offset-2 focus:ring-offset-gray-100'>
          {avatar ? (
            <img
              className='inline-block h-8 w-8 rounded-full'
              src={avatar}
              alt={'Avatar of' + username}
            />
          ) : (
            <></>
          )}
          {username}
          <ChevronDownIcon className='-mr-1 ml-2 h-5 w-5' aria-hidden='true' />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter='transition ease-out duration-100'
        enterFrom='transform opacity-0 scale-95'
        enterTo='transform opacity-100 scale-100'
        leave='transition ease-in duration-75'
        leaveFrom='transform opacity-100 scale-100'
        leaveTo='transform opacity-0 scale-95'
      >
        <Menu.Items className='absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
          <div className='py-1'>
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={() => signOut()}
                  className={`${
                    active ? 'text-gray-900' : 'text-gray-700'
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
  )
}
