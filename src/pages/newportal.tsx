import Head from "next/head";
import { CreatePortalForm } from "../components/portal/CreatePortalForm";

export default function CreatePortal() {
  return (
    <>
      <Head>
        <title>T3 DataPortal - Create portal</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
        <div className="rounded-xl bg-white">
          <div className="z-20 mx-auto w-full py-12 px-4 text-center sm:px-6 lg:py-16 lg:px-8">
            <h2 className="text-3xl font-extrabold text-black dark:text-white sm:text-4xl">
              <span className="block">Portal</span>
              <span className="block text-lime-500">Create a new portal</span>
            </h2>
            <div className="lg:mt-0 lg:flex-shrink-0">
              <div className="my-8 mx-auto max-w-5xl">
                <CreatePortalForm />
              </div>
            </div>
          </div>
        </div>
    </>
  );
}
