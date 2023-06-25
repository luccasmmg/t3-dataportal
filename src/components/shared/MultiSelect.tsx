import ReactSelect from "react-select";

interface Option {
  label: string;
  value: string;
}

interface MultiSelectProps {
  options: Option[];
  onChange: (...event: any[]) => void;
  value?: string[];
}
export const MultiSelect: React.FC<MultiSelectProps> = ({
  options,
  onChange,
  value,
}) => {
  const getValue = (value?: string[]) => {
    return value
      ? options.filter((option) => value.includes(option.value))
      : [];
  };
  return (
    <ReactSelect
      classNamePrefix="select"
      placeholder="Select groups"
      isMulti={true}
      classNames={{
        control: () => "!rounded-md shadow-sm mt-1",
        placeholder: () => "!text-black text-sm",
      }}
      styles={{
        input: (base) => ({
          ...base,
          "input:focus": {
            boxShadow: "none",
          },
        }),
        control: (base, state) => ({
          ...base,
          "&:hover": { borderColor: "none" },
          border: "none",
          boxShadow: state.isFocused
            ? "inset 0 0 0 2px #65a30d"
            : "inset 0 0 0 1px #d1d5db",
        }),
      }}
      options={options}
      value={getValue(value)}
      onChange={(newValue) => {
        onChange(
          value
            ? newValue.map((val) => val.value)
            : newValue.map((val) => val.value)
        );
      }}
    />
  );
};

export default MultiSelect;
