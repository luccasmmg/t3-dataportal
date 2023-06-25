import { ErrorMessage } from "@hookform/error-message";
import type { UseFormReturn } from "react-hook-form";
import { Controller } from "react-hook-form";
import { DatasetInputs } from "../../schema/dataset.schema";
import { inputStyle, selectStyle } from "../../styles/formStyles";
import { api } from "@utils/api";
import { CustomSwitch } from "@components/shared/CustomSwitch";
import { useSession } from "next-auth/react";
import Loading from "@components/shared/Loading";
import MultiSelect from "@components/shared/MultiSelect";

export type IOption = {
  value: string;
  label: string;
};

export const DatasetForm: React.FC<{
  formObj: UseFormReturn<DatasetInputs>;
}> = ({ formObj }) => {
  const { data: sessionData } = useSession();
  const { data: orgsData, isLoading: orgsAreLoading } =
    api.organization.getAllOrganizationsAdmin.useQuery();
  const { data: portalData, isLoading: portalLoading } =
    api.portal.getPortalBySysAdminId.useQuery(
      { sysAdminId: sessionData?.user.id },
      { enabled: !!sessionData?.user?.id }
    );
  const {
    register,
    formState: { errors },
    control,
    watch,
  } = formObj;

  if (!portalData || portalData === null) return <Loading />;

  const groupOptions = portalData.groups.map((group) => ({
    value: group.id,
    label: group.title,
  }));

  return (
    <div className="grid grid-cols-1 items-end gap-2 sm:grid-cols-2">
      {sessionData && (
        <input
          type="text"
          className="hidden"
          defaultValue={sessionData.user.id}
          {...register("creatorId")}
        />
      )}
      <input
        type="text"
        className="hidden"
        defaultValue={portalData.id}
        {...register("portalId")}
      />
      <div>
        <label
          htmlFor="name"
          className="block w-fit text-sm font-medium text-gray-700"
        >
          Name
        </label>
        <div className="mt-1 w-full">
          <input type="text" className={inputStyle} {...register("name")} />
          <ErrorMessage
            errors={errors}
            name="name"
            render={({ message }) => (
              <p className="text-justify text-xs text-red-600">{message}</p>
            )}
          />
        </div>
      </div>
      <div>
        <label
          htmlFor="title"
          className="block w-fit text-sm font-medium text-gray-700"
        >
          Title
        </label>
        <div className="mt-1 w-full">
          <input type="text" className={inputStyle} {...register("title")} />
          <ErrorMessage
            errors={errors}
            name="title"
            render={({ message }) => (
              <p className="text-justify text-xs text-red-600">{message}</p>
            )}
          />
        </div>
      </div>{" "}
      <div className="sm:col-span-2">
        <label
          htmlFor="message"
          className="block text-sm font-medium text-gray-700"
        >
          Description
        </label>
        <div className="mb-3 mt-1">
          <textarea
            id="description"
            rows={4}
            className={inputStyle}
            defaultValue={""}
            {...register("description")}
          />
        </div>
      </div>
      <div>
        <label
          htmlFor="url"
          className="block w-fit text-sm font-medium text-gray-700"
        >
          Url
        </label>
        <div className="mt-1 w-full">
          <input type="text" className={inputStyle} {...register("url")} />
          <ErrorMessage
            errors={errors}
            name="url"
            render={({ message }) => (
              <p className="text-justify text-xs text-red-600">{message}</p>
            )}
          />
        </div>
      </div>
      <div>
        <label
          htmlFor="authorEmail"
          className="block w-fit text-sm font-medium text-gray-700"
        >
          Email of the author
        </label>
        <div className="mt-1 w-full">
          <input
            type="text"
            className={inputStyle}
            {...register("authorEmail")}
          />
          <ErrorMessage
            errors={errors}
            name="authorEmail"
            render={({ message }) => (
              <p className="text-justify text-xs text-red-600">{message}</p>
            )}
          />
        </div>
      </div>
      <div>
        <label
          htmlFor="orgId"
          className="block w-fit text-sm font-medium text-gray-700"
        >
          Organization
        </label>
        <div className="mt-1 w-full">
          {orgsData && (
            <select className={selectStyle} {...register("orgId")}>
              {orgsData.map((org) => (
                <option key={org.id} value={org.id}>
                  {org.title}
                </option>
              ))}
            </select>
          )}
          <ErrorMessage
            errors={errors}
            name="orgId"
            render={({ message }) => (
              <p className="text-justify text-xs text-red-600">{message}</p>
            )}
          />
        </div>
      </div>
      <div>
        <label
          htmlFor="groupsId"
          className="block w-fit text-sm font-medium text-gray-700"
        >
          Groups
        </label>
        <Controller
          control={control}
          name="groupsId"
          render={({ field: { onChange, value } }) => (
            <MultiSelect
              onChange={onChange}
              options={groupOptions}
              value={value}
            />
          )}
        />
      </div>
      <div className="py-2 sm:col-span-2">
        <label
          htmlFor="private"
          className="block text-sm font-medium text-gray-700"
        >
          Private
        </label>
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <CustomSwitch
              defaultValue={false}
              control={control}
              name="private"
            />
          </div>
          <div className="ml-3">
            <p className="text-sm text-gray-500">
              Checking this will mean that this organization and all its
              children will not be available for the public consumption
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
