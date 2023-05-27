import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "../../utils/api";
import { Button } from "../shared/Button";
import { useState } from "react";
import { ErrorAlert } from "@components/shared/Alerts";
import NotificationSuccess from "@components/shared/Notifications";
import { match } from "ts-pattern";
import { ResourceSchema, ResourceInputs } from "@schema/resource.schema";
import { ResourceForm } from "./ResourceForm";
import { useRouter } from "next/router";

export const CreateResourceForm: React.FC = () => {
  const { datasetId } = useRouter().query;
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [resourceCreated, setResourceCreated] = useState("");

  const formObj = useForm<ResourceInputs>({
    resolver: zodResolver(ResourceSchema),
  });

  const createResource = api.resource.createResource.useMutation({
    onSuccess: () => {
      setShowSuccess(true);
      formObj.reset();
      setTimeout(() => setShowSuccess(false), 5000);
    },
    onError: (error) => setErrorMessage(error.message),
  });

  return (
    <>
      <form
        onSubmit={formObj.handleSubmit((data) => {
          setResourceCreated(formObj.watch().name);
          setShowSuccess(false);
          createResource.mutate(data);
        })}
      >
        {datasetId && typeof datasetId === "string" && (
          <ResourceForm formObj={formObj} datasetId={datasetId} />
        )}
        <div className="col-span-full">
          {match(createResource.isLoading)
            .with(false, () => (
              <Button type="submit" color="lime" className="mt-8 w-full py-4">
                Create resource
              </Button>
            ))
            .otherwise(() => (
              <Button disabled color="lime" className="mt-8 w-full py-4">
                <div className="loader mb-4 h-4 w-4 rounded-full border-4 border-t-4 border-gray-200 ease-linear"></div>
              </Button>
            ))}
        </div>
        {errorMessage && (
          <div className="py-4">
            <ErrorAlert text={errorMessage} />
          </div>
        )}
      </form>
      <div
        aria-live="assertive"
        className="pointer-events-none fixed inset-0 flex items-end px-4 py-6 sm:items-start sm:p-6"
      >
        <div className="flex w-full flex-col items-center space-y-4 sm:items-end">
          <NotificationSuccess
            show={showSuccess}
            setShow={setShowSuccess}
            title="Resource created"
            text={`Successfully created the ${resourceCreated} resource`}
          />
        </div>
      </div>
    </>
  );
};
