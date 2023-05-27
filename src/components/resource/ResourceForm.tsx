import { ErrorMessage } from "@hookform/error-message";
import type { UseFormReturn } from "react-hook-form";
import { inputStyle, selectStyle } from "../../styles/formStyles";
import { CustomSwitch } from "@components/shared/CustomSwitch";
import { ResourceInputs } from "@schema/resource.schema";
import { UploadButton } from "@uploadthing/react";
import { OurFileRouter } from "@server/uploadthing";

export const ResourceForm: React.FC<{
  formObj: UseFormReturn<ResourceInputs>;
  datasetId: string;
}> = ({ formObj, datasetId }) => {
  const {
    register,
    formState: { errors },
    watch,
    control,
  } = formObj;
  console.log(errors);
  return (
    <div className="grid grid-cols-1 items-start gap-2 sm:grid-cols-2">
      <input
        type="text"
        className="hidden"
        {...register("datasetId")}
        defaultValue={datasetId}
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
      <div className="sm:col-span-2">
        <UploadButton<OurFileRouter>
          endpoint="resourceUploader"
          onClientUploadComplete={(res) => {
            if (res && res[0]) {
              formObj.setValue("url", res[0]?.fileUrl);
              formObj.clearErrors("url");
            }
            console.log("Files: ", res);
          }}
          onUploadError={(error: Error) => {
            formObj.setError("url", {
              type: "string",
              message:
                "Couldn't upload file, make sure you are uploading resources below 16MB and try again",
            });
          }}
        />
        <div className="sm:col-span-2">
          <p className="text-sm text-gray-500">{watch().url}</p>
        </div>
      </div>
      <div className="sm:col-span-2">
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
                Checking this will mean that this resource will not be available
                for the public consumption
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
