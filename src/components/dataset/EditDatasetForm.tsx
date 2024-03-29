import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  DatasetFull,
  DatasetInputs,
  DatasetSchema,
} from "../../schema/dataset.schema";
import { api } from "../../utils/api";
import { DatasetForm } from "./DatasetForm";
import { Button } from "../shared/Button";
import { useState } from "react";
import { ErrorAlert } from "@components/shared/Alerts";
import NotificationSuccess from "@components/shared/Notifications";
import { match } from "ts-pattern";

export const EditDatasetForm: React.FC<{ dataset: DatasetFull }> = ({
  dataset,
}) => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [datasetEdited, setOrgEdited] = useState("");
  console.log(dataset);
  const formObj = useForm<DatasetInputs>({
    defaultValues: {
      ...dataset,
      groupsId: dataset.groups.map((group) => group.id),
    },
    resolver: zodResolver(DatasetSchema),
  });

  const editDataset = api.dataset.editDataset.useMutation({
    onSuccess: () => {
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 5000);
    },
    onError: (error) => setErrorMessage(error.message),
  });

  return (
    <>
      <form
        onSubmit={formObj.handleSubmit((data) => {
          setOrgEdited(formObj.watch().name);
          setShowSuccess(false);
          editDataset.mutate(data);
        })}
      >
        <DatasetForm formObj={formObj} />
        <div className="col-span-full">
          {match(editDataset.isLoading)
            .with(false, () => (
              <Button
                type="submit"
                color="emerald"
                className="mt-8 w-full py-4"
              >
                Edit Dataset
              </Button>
            ))
            .otherwise(() => (
              <Button disabled color="emerald" className="mt-8 w-full py-4">
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
            title="Organization edited"
            text={`Successfully edited the ${datasetEdited} dataset`}
          />
        </div>
      </div>
    </>
  );
};
