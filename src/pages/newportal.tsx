import Head from 'next/head'
import { CreatePortalForm } from '../components/portal/CreatePortalForm'
import Layout from '../components/shared/Layout'
export default function CreatePortal() {
  return (
    <>
      <Head>
        <title>T3 DataPortal - Create portal</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Layout>
        <div className='overflow-hidden bg-white py-16 px-6 lg:px-8 lg:py-24'>
          <div className='relative mx-auto max-w-xl'>
            <svg
              className='absolute left-full translate-x-1/2 transform'
              width={404}
              height={404}
              fill='none'
              viewBox='0 0 404 404'
              aria-hidden='true'
            >
              <defs>
                <pattern
                  id='85737c0e-0916-41d7-917f-596dc7edfa27'
                  x={0}
                  y={0}
                  width={20}
                  height={20}
                  patternUnits='userSpaceOnUse'
                >
                  <rect
                    x={0}
                    y={0}
                    width={4}
                    height={4}
                    className='text-gray-200'
                    fill='currentColor'
                  />
                </pattern>
              </defs>
              <rect
                width={404}
                height={404}
                fill='url(#85737c0e-0916-41d7-917f-596dc7edfa27)'
              />
            </svg>
            <svg
              className='absolute right-full bottom-0 -translate-x-1/2 transform'
              width={404}
              height={404}
              fill='none'
              viewBox='0 0 404 404'
              aria-hidden='true'
            >
              <defs>
                <pattern
                  id='85737c0e-0916-41d7-917f-596dc7edfa27'
                  x={0}
                  y={0}
                  width={20}
                  height={20}
                  patternUnits='userSpaceOnUse'
                >
                  <rect
                    x={0}
                    y={0}
                    width={4}
                    height={4}
                    className='text-gray-200'
                    fill='currentColor'
                  />
                </pattern>
              </defs>
              <rect
                width={404}
                height={404}
                fill='url(#85737c0e-0916-41d7-917f-596dc7edfa27)'
              />
            </svg>
            <div className='text-center'>
              <h2 className='text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl'>
                Create a new Portal
              </h2>
              <p className='mt-4 text-lg leading-6 text-gray-500'>
                This is the start of your data portal, you can setup a name
                which will be in the URL, a title and a description for the
                frontend and define the visibility
              </p>
            </div>
            <div className='mt-12'>
              <CreatePortalForm />
            </div>
          </div>
        </div>
      </Layout>
    </>
  )
}
