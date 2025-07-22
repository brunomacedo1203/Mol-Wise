// src/features/periodic-table/components/common/PeriodicTableFilterDropdown.tsx
"use client";

import * as React from "react";
import { MultiSelectCombobox, ComboboxOption } from "@/components/ui/combobox";

interface PeriodicTableFilterDropdownProps {
  options: ComboboxOption[];
  values: string[];
  onChange: (values: string[]) => void;
}

const PeriodicTableFilterDropdown: React.FC<
  PeriodicTableFilterDropdownProps
> = ({ options, values, onChange }) => {
  return (
    <MultiSelectCombobox
      options={options}
      selected={values}
      setSelected={onChange}
      placeholder="Selecione a(s) classificação(ões)"
    />
  );
};

export default PeriodicTableFilterDropdown;
