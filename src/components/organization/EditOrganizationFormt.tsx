import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  OrganizationInputs,
  OrganizationSchema,
} from "../../schema/organization.schema";
import { api } from "../../utils/api";
import { OrganizationForm } from "./OrganizationForm";
import { Button } from "../shared/Button";
import { useState } from "react";
import { ErrorAlert } from "@components/shared/Alerts";
import NotificationSuccess from "@components/shared/Notifications";
import { match } from "ts-pattern";
import { Organization } from "@prisma/client";

export const EditOrganizationForm: React.FC<{ org: Organization }> = ({ org }) => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [orgEdited, setOrgEdited] = useState("");
  const formObj = useForm<OrganizationInputs>({
    defaultValues: org,
    resolver: zodResolver(OrganizationSchema),
  });

  const editOrganization = api.organization.editOrganization.useMutation({
    onSuccess: () => {
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 5000);
    },
    onError: (error) => setErrorMessage(error.message),
  });

  console.log(formObj.watch())
  return (
    <>
      <form
        onSubmit={formObj.handleSubmit((data) => {
          setOrgEdited(formObj.watch().name);
          setShowSuccess(false);
          editOrganization.mutate(data);
        })}
      >
        <OrganizationForm formObj={formObj} />
        <div className="col-span-full">
          {match(editOrganization.isLoading)
            .with(false, () => (
              <Button type="submit" color="lime" className="mt-8 w-full py-4">
                Edit Org
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
            title="Organization edited"
            text={`Successfully edited the ${orgEdited} organization`}
          />
        </div>
      </div>
    </>
  );
};
