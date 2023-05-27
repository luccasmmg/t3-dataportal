import {
  FieldValues,
  Path,
  useController,
  UseControllerProps,
} from "react-hook-form";
import { Switch } from "@headlessui/react";
import { classNames } from "../../utils/classnames";
import { PortalInputs } from "../../schema/portal.schema";
import { OrganizationInputs } from "@schema/organization.schema";

export const CustomSwitch = <T extends FieldValues>(
  props: UseControllerProps<T, Path<T>>
) => {
  const {
    field: { value, onChange },
  } = useController(props);
  return (
    <Switch
      checked={value as boolean}
      onChange={onChange}
      className={classNames(
        value ? "bg-lime-600" : "bg-gray-200",
        "relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-lime-500 focus:ring-offset-2"
      )}
    >
      <span className="sr-only">Agree to policies</span>
      <span
        aria-hidden="true"
        className={classNames(
          value ? "translate-x-5" : "translate-x-0",
          "inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
        )}
      />
    </Switch>
  );
};
