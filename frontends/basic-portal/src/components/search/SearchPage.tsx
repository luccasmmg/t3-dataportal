import type { Dataset, Group, Organization, SearchInputs } from '~/types';
import { useForm } from 'react-hook-form';
import DatasetCard from './DatasetCard';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query';
import { useState } from 'react';
import ky from 'ky';

export default function SearchPage({
  datasets,
  groups,
  organizations,
}: {
  datasets: Dataset[];
  groups: Group[];
  organizations: Organization[];
}) {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>
      <SearchPageInner initialDatasets={datasets} groups={groups} organizations={organizations} />
    </QueryClientProvider>
  );
}

function SearchPageInner({
  initialDatasets,
  groups,
  organizations,
}: {
  initialDatasets: Dataset[];
  groups: Group[];
  organizations: Organization[];
}) {
  const { register, watch } = useForm<SearchInputs>({
    defaultValues: { queryString: '', portalName: 'my-portal', groups: [] },
  });
  console.log(watch());
  const { data: datasets } = useQuery({
    queryKey: ['search', watch()],
    initialData: initialDatasets,
    queryFn: async ({ queryKey }) => {
      const [, watch] = queryKey;
      const { queryString, portalName, groups, organizations } = watch as SearchInputs;
      const _groups =
        groups?.length > 0
          ? `&groups=${groups.filter((group: string | boolean) => typeof group === 'string').join(',')}`
          : '';
      const _organizations =
        organizations && organizations?.length > 0
          ? `&orgs=${organizations
              .filter((organization: string | boolean) => typeof organization === 'string')
              .join(',')}`
          : '';
      const datasets: Dataset[] = await ky(
        `https://t3-dataportal.vercel.app/api/${portalName}/datasets/search?queryString=${encodeURIComponent(
          queryString
        )}${_groups}${_organizations}`
      ).json();
      return datasets;
    },
  });

  return (
    <div className="py-8 grid grid-cols-1 lg:grid-cols-4 h-[40rem] gap-6 max-w-7xl mx-auto px-3 md:px-4">
      <div className="col-span-full lg:col-span-1 py-4 flex flex-col gap-y-2">
        <div>
          <h1 className="text-4xl font-bold">Search datasets</h1>
          <hr className="border-2 border-blue-600" />
          <div className="flex flex-col gap-y-2 py-6">
            <input
              className="dark:ring-slate-800 ring-gray-300 w-full shadow rounded p-2 dark:bg-slate-900 ring-1 border-0 ring-inset text-sm placeholder:text-sm"
              {...register('queryString')}
              type="text"
              placeholder="Search datasets"
            />
          </div>
          <h1 className="text-xl font-semibold">Filter by group</h1>
          <hr className="border border-blue-600 w-4/5" />
          {groups && groups?.length > 0 ? (
            <div className="flex flex-col gap-y-2 py-6">
              {groups.map((group, index) => (
                <div key={group.id} className="flex items-center">
                  <input
                    id={group.id}
                    type="checkbox"
                    {...register(`groups.${index}`)}
                    value={group.name}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-400 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  ></input>
                  <label htmlFor={group.id} className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                    {group.title}
                  </label>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col gap-y-2 py-2">
              <p>No available groups found</p>
            </div>
          )}
          <h1 className="text-xl font-semibold">Filter by organization</h1>
          <hr className="border border-blue-600 w-4/5" />
          {organizations && organizations?.length > 0 ? (
            <div className="flex flex-col gap-y-2 py-6">
              {organizations.map((organization, index) => (
                <div key={organization.id} className="flex items-center">
                  <input
                    id={organization.id}
                    type="checkbox"
                    {...register(`organizations.${index}`)}
                    value={organization.name}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-400 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  ></input>
                  <label
                    htmlFor={organization.id}
                    className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    {organization.title}
                  </label>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col gap-y-2 py-2">
              <p>No available organizations found</p>
            </div>
          )}
        </div>
      </div>
      <div className="col-span-full lg:col-span-3 py-4 flex flex-col gap-y-2">
        <div className="pb-4">
          <h1 className="text-4xl font-bold">
            {datasets && datasets?.length > 0 ? `${datasets.length} Datasets found` : 'No datasets found'}
          </h1>
          <hr className="border-2 border-blue-600" />
        </div>
        <div className="flex flex-col gap-3">
          {datasets?.map((dataset) => (
            <DatasetCard key={dataset.id} dataset={dataset} />
          ))}
        </div>
      </div>
    </div>
  );
}
