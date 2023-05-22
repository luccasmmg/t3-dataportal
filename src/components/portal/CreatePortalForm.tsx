import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PortalInputs, PortalSchema } from "../../schema/portal.schema";
import { api } from "../../utils/api";
import { PortalForm } from "./PortalForm";
import { Button } from "../shared/Button";
import { useRouter } from "next/router";
import { useState } from "react";
import { ErrorAlert } from "@components/shared/Alerts";

export const CreatePortalForm: React.FC = () => {
  const { push } = useRouter();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const formObj = useForm<PortalInputs>({
    resolver: zodResolver(PortalSchema),
  });

  const createPortal = api.portal.createPortal.useMutation({
    onSuccess: (data) => {
      console.log(data);
      void push("/dashboard");
    },
    onError: (error) => setErrorMessage(error.message),
  });

  return (
    <div className="rounded-xl border border-lime-600 p-4">
      <div className="flex items-start">
        <h3 className="block text-xl font-semibold text-lime-600">
          Portal Form
        </h3>
      </div>
      <form
        onSubmit={formObj.handleSubmit((data) => createPortal.mutate(data))}
      >
        <PortalForm formObj={formObj} />
        <div className="col-span-full">
          <Button type="submit" color="lime" className="mt-8 w-full py-4">
            Create portal
          </Button>
        </div>
        {errorMessage && (
          <div className="py-4">
            <ErrorAlert text={errorMessage} />
          </div>
        )}
      </form>
    </div>
  );
};
