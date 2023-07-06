import { Tab } from '@headlessui/react';
import type { Resource } from '~/types';
import DataGrid from './Datagrid';
import { useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

export default function ResourceTabs({ resources }: { resources: Resource[] }) {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>
      {resources.map((resource) => (
        <div key={resource.url} className="py-8">
          <h2 className="text-xl font-bold text-sky-600">{resource.name}</h2>
          <DataGrid name={resource.name} url={resource.url} />
        </div>
      ))}
    </QueryClientProvider>
  );
}
