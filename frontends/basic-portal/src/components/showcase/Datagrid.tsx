import { AgGridReact } from 'ag-grid-react';
import Papa from 'papaparse';
import { useMemo } from 'react';
import { useQuery } from 'react-query';
import 'node_modules/ag-grid-community/styles/ag-grid.css';
import 'node_modules/ag-grid-community/styles/ag-theme-alpine.css';

interface DataGridProps {
  name: string;
  url: string;
}

export default function DataGrid({ name, url }: DataGridProps) {
  return <DatagridInner url={url} name={name} />;
}

function DatagridInner({ url, name }: DataGridProps) {
  const { data } = useQuery({
    queryKey: [name, url],
    queryFn: async ({ queryKey }) => {
      const [, url] = queryKey;
      return await papaPromise(url);
    },
  });
  const defaultColDef = useMemo(
    () => ({
      sortable: true,
      filter: true,
    }),
    []
  );
  if (!data) return null;
  const columnDefs = Object.keys(data.data[0]).map((key) => ({ field: key }));

  return (
    <div className="ag-theme-alpine-dark h-[500px]">
      <AgGridReact defaultColDef={defaultColDef} rowData={data.data} columnDefs={columnDefs} />
    </div>
  );
}

const papaPromise = (url: string) =>
  new Promise((resolve, reject) => {
    Papa.parse(url, {
      download: true,
      header: true,
      complete: function (results) {
        resolve(results);
      },
      error: function (error) {
        reject(error);
      },
    });
  });
