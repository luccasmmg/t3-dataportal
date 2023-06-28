import type { Dataset, SearchInputs } from '~/types';
import { useForm } from 'react-hook-form';
import DatasetCard from './DatasetCard';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query';
import { useState } from 'react';

export default function SearchPage({ datasets }: { datasets: Dataset[] }) {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>
      <SearchPageInner initialDatasets={datasets} />
    </QueryClientProvider>
  );
}

function SearchPageInner({ initialDatasets }: { initialDatasets: Dataset[] }) {
  const { register, watch } = useForm<SearchInputs>({ defaultValues: { queryString: '', portalName: 'my-portal' } });
  const {
    isLoading,
    error,
    data: datasets,
  } = useQuery({
    queryKey: ['search', watch('queryString'), watch('portalName')],
    initialData: initialDatasets,
    queryFn: async ({ queryKey }) => {
      const [_key, queryString, portalName] = queryKey;
      const res = await fetch(
        `https://t3-dataportal.vercel.app/api/${portalName}/datasets/search?queryString=${queryString}`
      );
      const datasets: Dataset[] = await res.json();
      return datasets;
    },
  });

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 h-[40rem] gap-6 max-w-7xl mx-auto px-3 md:px-4">
      <div className="col-span-full lg:col-span-1 py-4 flex flex-col gap-y-2">
        <div>
          <h1 className="text-2xl font-semibold">Search datasets</h1>
          <hr className="border border-black" />
          <div className="flex flex-col gap-y-2 py-6">
            <input
              className="dark:ring-slate-800 ring-gray-300 w-full shadow rounded p-2 dark:bg-slate-900 ring-1 border-0 ring-inset text-sm placeholder:text-sm"
              {...register('queryString')}
              type="text"
              placeholder="Search datasets"
            />
          </div>
        </div>
      </div>
      <div className="col-span-full lg:col-span-3 py-4 flex flex-col gap-y-2">
        <div className="pb-4">
          <h1 className="text-2xl font-semibold">
            {datasets && datasets?.length > 0 ? `${datasets.length} Datasets found` : 'No datasets found'}
          </h1>
          <hr className="border border-black" />
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
