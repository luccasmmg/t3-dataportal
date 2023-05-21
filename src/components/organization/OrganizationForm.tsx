import { ErrorMessage } from "@hookform/error-message";
import type { UseFormReturn } from "react-hook-form";
import { OrganizationInputs } from "../../schema/organization.schema";
import { inputStyle } from "../../styles/formStyles";
import { UploadButton } from "@uploadthing/react";
import { OurFileRouter } from "@server/uploadthing";

export const OrganizationForm: React.FC<{
  formObj: UseFormReturn<OrganizationInputs>;
}> = ({ formObj }) => {
  const {
    register,
    formState: { errors },
  } = formObj;
  return (
    <div className="grid grid-cols-1 items-start gap-2 sm:grid-cols-2">
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
        <div className="mt-1 mb-3">
          <textarea
            id="description"
            rows={4}
            className={inputStyle}
            defaultValue={""}
            {...register("description")}
          />
        </div>
        <UploadButton<OurFileRouter>
          endpoint="imageUploader"
          onClientUploadComplete={(res) => {
            if (res) {
              formObj.setValue('image', res[0]?.fileUrl)
              formObj.clearErrors('image')
            }
            console.log("Files: ", res);
          }}
          onUploadError={(error: Error) => {
            formObj.setError('image', { type: 'string', message: "Couldn't upload file, make sure you are uploading only images and try again"})
          }}
        />
      </div>
      <div className="sm:col-span-2">
          <input type="text" className="hidden aria-hidden" {...register("image")} />
          <ErrorMessage
            errors={errors}
            name="image"
            render={({ message }) => (
              <p className="text-justify text-xs text-red-600">{message}</p>
            )}
          />
      </div>
    </div>
  );
};
