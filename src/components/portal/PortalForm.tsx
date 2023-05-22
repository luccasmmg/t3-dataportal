import { ErrorMessage } from "@hookform/error-message";
import { useSession } from "next-auth/react";
import type { UseFormReturn } from "react-hook-form";
import { useController, UseControllerProps } from "react-hook-form";
import { Switch } from "@headlessui/react";
import { PortalInputs } from "../../schema/portal.schema";
import { useState } from "react";
import { inputStyle } from "../../styles/formStyles";
import { classNames } from "../../utils/classnames";
import { CustomSwitch } from "../shared/CustomSwitch";

export const PortalForm: React.FC<{
  formObj: UseFormReturn<PortalInputs>;
}> = ({ formObj }) => {
  const [agreed, setAgreed] = useState(false);
  const { data: sessionData } = useSession();
  const {
    register,
    formState: { errors },
    watch,
    control,
  } = formObj;
  return (
    <div className="grid grid-cols-1 items-start gap-2 sm:grid-cols-2">
      <div>
        {sessionData && sessionData.user.id && (
          <input
            type="text"
            className="hidden"
            defaultValue={sessionData.user.id}
            {...register("sysAdminId")}
          />
        )}
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
        <div className="mt-1">
          <textarea
            id="description"
            rows={4}
            className={inputStyle}
            defaultValue={""}
            {...register("description")}
          />
        </div>
      </div>
      <div className="sm:col-span-2">
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
            <p className="text-base text-gray-500">
              Checking this will mean that only people with credentials will be
              able to access the data in your potal
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
