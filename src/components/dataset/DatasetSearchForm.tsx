import { Controller, useForm } from "react-hook-form";
import {
  SearchDatasetInputs,
  SearchDatasetSchema,
} from "../../schema/dataset.schema";
import { inputStyle, selectStyle } from "../../styles/formStyles";
import { Dispatch, SetStateAction, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { PortalFull } from "@schema/portal.schema";
import MultiSelect from "@components/shared/MultiSelect";
import { classNames } from "@utils/classnames";

export const SearchDatasetForm: React.FC<{
  setDatasetSearch: Dispatch<SetStateAction<SearchDatasetInputs>>;
  portal: PortalFull;
}> = ({ setDatasetSearch, portal }) => {
  const { register, watch, control, trigger } = useForm<SearchDatasetInputs>({
    defaultValues: { portalName: portal.name },
    resolver: zodResolver(SearchDatasetSchema),
  });

  const groupOptions = portal.groups.map((group) => ({
    value: group.name,
    label: group.title,
  }));

  return (
    <form
      className="my-2 grid grid-cols-1 items-end gap-2 sm:grid-cols-3"
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
          <input
            className={classNames(inputStyle, "pl-3 placeholder:text-gray-900")}
            placeholder="Search text"
            {...register("queryString")}
          />
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
      <div className="mt-1 w-full">
        <label
          htmlFor="groups"
          className="block w-fit text-sm font-medium text-gray-700"
        >
          Groups
        </label>
        <Controller
          control={control}
          name="groups"
          render={({ field: { onChange, value } }) => (
            <MultiSelect
              onChange={(values) => {
                onChange(values);
                setDatasetSearch(watch());
              }}
              options={groupOptions}
              value={value}
            />
          )}
        />
      </div>
    </form>
  );
};
