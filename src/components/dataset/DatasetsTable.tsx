import { Dataset, Portal } from "@prisma/client";
import { SearchDatasetInputs } from "@schema/dataset.schema";
import { api } from "@utils/api";
import { useLayoutEffect, useRef, useState } from "react";
import Link from "next/link";
import { SearchDatasetForm } from "./DatasetSearchForm";
import { PortalFull } from "@schema/portal.schema";

export const DatasetTable: React.FC<{ portal: PortalFull }> = ({ portal }) => {
  const checkbox = useRef<HTMLInputElement>(null);
  const [checked, setChecked] = useState(false);
  const [indeterminate, setIndeterminate] = useState(false);
  const [selectedDatasets, setSelectedDatasets] = useState<Dataset[]>([]);
  const [datasetSearch, setDatasetSearch] = useState<SearchDatasetInputs>({
    portalId: portal.id,
  });
  const { data: datasets, isLoading: isLoadingDatasets } =
    api.dataset.searchDatasets.useQuery(datasetSearch);

  const utils = api.useContext();
  const deleteDatasets = api.dataset.deleteDatasets.useMutation({
    onSuccess: async () => {
      await utils.portal.getPortalBySysAdminId.invalidate();
    },
  });

  useLayoutEffect(() => {
    if (datasets) {
      const isIndeterminate =
        selectedDatasets.length > 0 &&
        selectedDatasets.length < datasets.length;
      setChecked(selectedDatasets.length === datasets.length);
      setIndeterminate(isIndeterminate);
      if (checkbox.current) checkbox.current.indeterminate = isIndeterminate;
    }
  }, [selectedDatasets]);

  function toggleAll() {
    if (datasets) {
      setSelectedDatasets(checked || indeterminate ? [] : datasets);
      setChecked(!checked && !indeterminate);
      setIndeterminate(false);
    }
  }
  console.log(datasetSearch)
  return (
    <>
      <SearchDatasetForm
        setDatasetSearch={setDatasetSearch}
        portal={portal}
      />
      <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
          <div className="relative">
            {selectedDatasets.length > 0 && (
              <div className="absolute left-14 top-0 flex h-12 items-center space-x-3 bg-white sm:left-12">
                {!deleteDatasets.isLoading ? (
                  <button
                    type="button"
                    onClick={() => {
                      deleteDatasets.mutate({
                        ids: selectedDatasets.map((dataset) => dataset.id),
                      });
                    }}
                    className="inline-flex items-center rounded bg-white px-2 py-1 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-white"
                  >
                    Delete all
                  </button>
                ) : (
                  <div className="loader mb-4 h-4 w-4 rounded-full border-4 border-t-4 border-gray-200 ease-linear"></div>
                )}
              </div>
            )}
            <div className="ring-1 ring-gray-300 sm:mx-0 sm:rounded-lg">
              <table className="min-w-full table-fixed divide-y divide-gray-300">
                <thead>
                  <tr>
                    <th scope="col" className="relative px-7 sm:w-12 sm:px-6">
                      <input
                        type="checkbox"
                        className="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-lime-600 focus:ring-lime-600"
                        ref={checkbox}
                        checked={checked}
                        onChange={toggleAll}
                      />
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Title
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Description
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Visibility
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Last Updated
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Created at
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Resources
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Edit
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {datasets && (
                    <>
                      {datasets.map((dataset) => (
                        <tr
                          key={dataset.name}
                          className={
                            selectedDatasets.includes(dataset)
                              ? "bg-gray-50"
                              : undefined
                          }
                        >
                          <td className="relative px-7 sm:w-12 sm:px-6">
                            {selectedDatasets.includes(dataset) && (
                              <div className="absolute inset-y-0 left-0 w-0.5 bg-lime-600" />
                            )}
                            <input
                              type="checkbox"
                              className="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-lime-600 focus:ring-lime-600"
                              value={dataset.name}
                              checked={selectedDatasets.includes(dataset)}
                              onChange={(e) =>
                                setSelectedDatasets(
                                  e.target.checked
                                    ? [...selectedDatasets, dataset]
                                    : selectedDatasets.filter(
                                        (p) => p !== dataset
                                      )
                                )
                              }
                            />
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {dataset.name}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {dataset.title}
                          </td>
                          <td className="px-3 py-4 text-sm text-gray-500">
                            {dataset.description}
                          </td>
                          <td className="px-3 py-4 text-sm text-gray-500">
                            {dataset.private ? "Private" : "Public"}
                          </td>
                          <td className="px-3 py-4 text-sm text-gray-500">
                            {dataset.updatedAt.toLocaleString()}
                          </td>
                          <td className="px-3 py-4 text-sm text-gray-500">
                            {dataset.createdAt.toLocaleString()}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm font-medium">
                            <Link
                              href={`/dashboard/datasets/${dataset.id}/resources`}
                              className="text-lime-600 hover:text-lime-900"
                            >
                              Resources
                              <span className="sr-only">, {dataset.name}</span>
                            </Link>
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm font-medium">
                            <Link
                              href={`/dashboard/datasets/edit/${dataset.id}`}
                              className="text-lime-600 hover:text-lime-900"
                            >
                              Edit
                              <span className="sr-only">, {dataset.name}</span>
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DatasetTable;
