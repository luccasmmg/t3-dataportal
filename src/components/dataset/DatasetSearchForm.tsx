import { useForm } from "react-hook-form";
import {
  SearchDatasetInputs,
  SearchDatasetSchema,
} from "../../schema/dataset.schema";
import { inputStyle, selectStyle } from "../../styles/formStyles";
import { Dispatch, SetStateAction } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { PortalFull } from "@schema/portal.schema";

export const SearchDatasetForm: React.FC<{
  setDatasetSearch: Dispatch<SetStateAction<SearchDatasetInputs>>;
  portal: PortalFull;
}> = ({ setDatasetSearch, portal }) => {
  const { register, watch } = useForm<SearchDatasetInputs>({
    defaultValues: { portalId: portal.id },
    resolver: zodResolver(SearchDatasetSchema),
  });
  return (
    <form
      className="my-2 grid grid-cols-1 items-end gap-2 sm:grid-cols-2"
      onChange={() => setDatasetSearch(watch())}
    >
      <div>
        <label
          htmlFor="queryString"
          className="block w-fit text-sm font-medium text-gray-700"
        >
          Search datasets
        </label>
        <div className="mt-1 w-full">
          <input className={inputStyle} {...register("queryString")} />
        </div>
      </div>
      <div className="mt-1 w-full">
        <label
          htmlFor="orgs"
          className="block w-fit text-sm font-medium text-gray-700"
        >
          Organizations
        </label>
        <select className={selectStyle} {...register("orgs")}>
          <option value={undefined}>Filter by org</option>
          {portal.organizations.map((org) => (
            <option key={org.id} value={org.name}>
              {org.title}
            </option>
          ))}
        </select>
      </div>
    </form>
  );
};
