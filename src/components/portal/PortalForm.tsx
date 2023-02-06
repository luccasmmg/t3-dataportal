import { ErrorMessage } from "@hookform/error-message"; 
import { useSession } from "next-auth/react";
import type { UseFormReturn } from "react-hook-form";
import type { z } from "zod";
import { CreatePortalSchema, PortalInputs } from "../../schema/portal.schema";
import { inputStyle } from "../../styles/formStyles";

export const PortalForm: React.FC<{
  formObj: UseFormReturn<PortalInputs>;
}> = ({ formObj }) => {
  const { data: sessionData } = useSession();
  const {
    register,
    formState: { errors },
  } = formObj;
  return (
    <div
      className="grid grid-cols-1 items-start gap-2 sm:grid-cols-2"
      style={{ gridAutoRows: "1fr" }}
    >
      <div>
        {sessionData && sessionData.user.id &&
          <input
            type="text"
            className="hidden"
            defaultValue={sessionData.user.id}
            {...register("sysAdminId")}
          />
        }
        <label
          htmlFor="name"
          className="block w-fit text-sm font-medium text-gray-700"
        >
          Name
        </label>
        <div className="mt-1 w-full">
          <input
            type="text"
            className={inputStyle}
            {...register("name")}
          />
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
          <input
            type="text"
            className={inputStyle}
            {...register("title")}
          />
          <ErrorMessage
            errors={errors}
            name="title"
            render={({ message }) => (
              <p className="text-justify text-xs text-red-600">{message}</p>
            )}
          />
        </div>
      </div>
    </div>
  );
};
