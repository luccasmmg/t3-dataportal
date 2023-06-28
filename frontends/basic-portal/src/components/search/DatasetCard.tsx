import type { Dataset } from '~/types';

export default function DatasetCard({ dataset }: { dataset: Dataset }) {
  return (
    <div className="dark:bg-slate-900 bg-light shadow rounded border border-gray-300 dark:border-slate-800 dark:hover:border-slate-600 p-4 hover:border-slate-600 cursor-pointer flex justify-between gap-x-2">
      <div>
        <h2 className="text-lg font-semibold dark:text-white text-slate-900 ">{dataset.title}</h2>
        <div className="flex gap-x-2">
          <dl className="flex flex-col">
            <dt className="text-xs whitespace-nowrap flex gap-x-0.5 items-center">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                <path
                  fillRule="evenodd"
                  d="M4.5 2.25a.75.75 0 000 1.5v16.5h-.75a.75.75 0 000 1.5h16.5a.75.75 0 000-1.5h-.75V3.75a.75.75 0 000-1.5h-15zM9 6a.75.75 0 000 1.5h1.5a.75.75 0 000-1.5H9zm-.75 3.75A.75.75 0 019 9h1.5a.75.75 0 010 1.5H9a.75.75 0 01-.75-.75zM9 12a.75.75 0 000 1.5h1.5a.75.75 0 000-1.5H9zm3.75-5.25A.75.75 0 0113.5 6H15a.75.75 0 010 1.5h-1.5a.75.75 0 01-.75-.75zM13.5 9a.75.75 0 000 1.5H15A.75.75 0 0015 9h-1.5zm-.75 3.75a.75.75 0 01.75-.75H15a.75.75 0 010 1.5h-1.5a.75.75 0 01-.75-.75zM9 19.5v-2.25a.75.75 0 01.75-.75h4.5a.75.75 0 01.75.75v2.25a.75.75 0 01-.75.75h-4.5A.75.75 0 019 19.5z"
                  clipRule="evenodd"
                />
              </svg>
              <span>{dataset.Organization?.title}</span>
            </dt>
          </dl>
        </div>
        <p className="text-sm pt-2 font-light text-slate-700 dark:text-slate-400">{dataset.description}</p>
      </div>
    </div>
  );
}
