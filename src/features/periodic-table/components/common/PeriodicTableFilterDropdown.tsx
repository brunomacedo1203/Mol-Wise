// src/features/periodic-table/components/common/PeriodicTableFilterDropdown.tsx
"use client";

import * as React from "react";
import { MultiSelectCombobox, ComboboxOption } from "@/components/ui/combobox";

interface PeriodicTableFilterDropdownProps {
  options: ComboboxOption[];
  values: string[];
  onChange: (values: string[]) => void;
  placeholder?: string;
}

const PeriodicTableFilterDropdown: React.FC<
  PeriodicTableFilterDropdownProps
> = ({ options, values, onChange, placeholder }) => {
  return (
    <MultiSelectCombobox
      options={options}
      selected={values}
      setSelected={onChange}
      placeholder={placeholder || "Selecione a(s) classificação(ões)"}
    />
  );
};

export default PeriodicTableFilterDropdown;
