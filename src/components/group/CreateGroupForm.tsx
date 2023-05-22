import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  GroupInputs,
  GroupSchema,
} from "../../schema/group.schema";
import { api } from "../../utils/api";
import { GroupForm } from "./GroupForm";
import { Button } from "../shared/Button";
import { useState } from "react";
import { ErrorAlert } from "@components/shared/Alerts";
import NotificationSuccess from "@components/shared/Notifications";
import { match } from "ts-pattern";

export const CreateGroupForm: React.FC = () => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [groupCreated, setOrgCreated] = useState("");
  const formObj = useForm<GroupInputs>({
    resolver: zodResolver(GroupSchema),
  });

  const createGroup = api.group.createGroup.useMutation({
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
          setOrgCreated(formObj.watch().name);
          setShowSuccess(false);
          createGroup.mutate(data);
        })}
      >
        <GroupForm formObj={formObj} />
        <div className="col-span-full">
          {match(createGroup.isLoading)
            .with(false, () => (
              <Button type="submit" color="lime" className="mt-8 w-full py-4">
                Create group
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
            title="Group created"
            text={`Successfully created the ${groupCreated} group`}
          />
        </div>
      </div>
    </>
  );
};
