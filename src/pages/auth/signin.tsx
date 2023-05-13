import { GetServerSideProps, NextPage } from 'next'
import type { BuiltInProviderType } from 'next-auth/providers'
import { ClientSafeProvider, getProviders, signIn } from 'next-auth/react'
import type { LiteralUnion } from 'next-auth/react'

export const getServerSideProps: GetServerSideProps = async () => {
  const providers = await getProviders()
  return {
    props: { providers },
  }
}

const SignInPage: NextPage<{
  providers: Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  > | null
}> = ({ providers }) => {
  return (
    <div className='flex min-h-full'>
      <div className='flex flex-1 flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24'>
        <div className='mx-auto w-full max-w-sm lg:w-96'>
          <div>
            <img
              className='h-12 w-auto'
              src='https://tailwindui.com/img/logos/mark.svg?color=lime&shade=600'
              alt='Your Company'
            />
            <h2 className='mt-6 text-3xl font-bold tracking-tight text-gray-900'>
              Sign in to your account
            </h2>
          </div>

          <div className='mt-8'>
            <div>
              <div>
                <p className='mb-2 text-sm font-medium text-gray-700'>
                  Sign in with
                </p>

                <div className='mt-1 grid grid-cols-3 gap-3'>
                  {providers ? (
                    Object.values(providers).map((provider) => (
                      <button
                        key={provider.id}
                        onClick={() =>
                          signIn(provider.id, { callbackUrl: '/' })
                        }
                        className='inline-flex w-full justify-center gap-1.5 rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-500 shadow-sm hover:bg-gray-50'
                      >
                        <span className='sr-only'>Sign in with Github</span>
                        <span>Github</span>
                        <svg
                          role='img'
                          className='h-5 w-5'
                          aria-hidden='true'
                          fill='currentColor'
                          viewBox='0 0 24 24'
                          xmlns='http://www.w3.org/2000/svg'
                        >
                          <title>GitHub</title>
                          <path d='M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12' />
                        </svg>
                      </button>
                    ))
                  ) : (
                    <span>
                      Houve um problema, por favor contactar os administradores
                      do sistema
                    </span>
                  )}
                  <div>
                    <a
                      href='#'
                      className='inline-flex w-full justify-center gap-1.5 rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-500 shadow-sm hover:bg-gray-50'
                    >
                      <span className='sr-only'>Sign in with Google</span>
                      <span>Google</span>
                      <svg
                        role='img'
                        className='h-5 w-5'
                        aria-hidden='true'
                        fill='currentColor'
                        viewBox='0 0 24 24'
                        xmlns='http://www.w3.org/2000/svg'
                      >
                        <title>Google</title>
                        <path d='M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z' />
                      </svg>
                    </a>
                  </div>
                  <div>
                    <a
                      href='#'
                      className='inline-flex w-full justify-center gap-1.5 rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-500 shadow-sm hover:bg-gray-50'
                    >
                      <span className='sr-only'>Sign in with Linkedin</span>
                      <span>Linkedin</span>
                      <svg
                        role='img'
                        className='h-5 w-5'
                        aria-hidden='true'
                        fill='currentColor'
                        viewBox='0 0 24 24'
                        xmlns='http://www.w3.org/2000/svg'
                      >
                        <title>Linkedin</title>
                        <path d='M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z' />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='relative hidden w-0 flex-1 lg:block'>
        <img
          className='absolute inset-0 h-full w-full object-cover'
          src='/images/LoginPageImage.webp'
          alt=''
        />
      </div>
    </div>
  )
}

export default SignInPage
