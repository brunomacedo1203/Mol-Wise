// src/features/periodic-table/components/common/PeriodicTableFilterDropdown.tsx

import { MultiSelectCombobox } from "@/components/ui/combobox";

type Option = { value: string; label: string };

interface PeriodicTableFilterDropdownProps {
  options: Option[];
  values: string[];
  onChange: (values: string[]) => void;
  placeholder?: string;
}

export default function PeriodicTableFilterDropdown({
  options,
  values,
  onChange,
  placeholder,
}: PeriodicTableFilterDropdownProps) {
  return (
    <MultiSelectCombobox
      options={options}
      selected={values}
      setSelected={onChange}
      placeholder={placeholder}
    />
  );
}
