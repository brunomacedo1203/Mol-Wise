// src/features/periodic-table/components/common/PeriodicTableFilterDropdown.tsx
"use client";

import * as React from "react";
import { MultiSelect } from "@/components/ui/multi-select";

interface PeriodicTableFilterDropdownProps {
  options: ComboboxOption[];
  values: string[];
  onChange: (values: string[]) => void;
  placeholder?: string;
}

export type ComboboxOption = {
  value: string;
  label: string;
};

const PeriodicTableFilterDropdown: React.FC<
  PeriodicTableFilterDropdownProps
> = ({ options, values, onChange, placeholder }) => {
  // Converter as opções para o formato do MultiSelect
  const multiSelectOptions = options.map((option) => ({
    label: option.label,
    value: option.value,
  }));

  return (
    <MultiSelect
      id="periodic-table-filter"
      options={multiSelectOptions}
      onValueChange={onChange}
      defaultValue={values}
      placeholder={placeholder || "Selecione a(s) classificação(ões)"}
      maxCount={4} // Reduzido para mostrar menos badges
      animation={0}
      className="w-[325px] h-[44px] bg-white dark:bg-zinc-800 border-2 border-zinc-300 dark:border-zinc-600 text-zinc-900 dark:text-zinc-100 shadow-sm overflow-hidden"
    />
  );
};

export default PeriodicTableFilterDropdown;
