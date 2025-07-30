// src/components/ui/combobox.tsx
"use client";
import * as React from "react";
import { MultiSelect } from "./multi-select";

export type ComboboxOption = {
  value: string;
  label: string;
};

interface MultiSelectComboboxProps {
  options: ComboboxOption[];
  selected: string[];
  setSelected: (values: string[]) => void;
  placeholder?: string;
}

export function MultiSelectCombobox({
  options,
  selected,
  setSelected,
  placeholder = "Selecione",
}: MultiSelectComboboxProps) {
  // Converter as opções para o formato do MultiSelect
  const multiSelectOptions = options.map((option) => ({
    label: option.label,
    value: option.value,
  }));

  return (
    <MultiSelect
      id="combobox-multiselect"
      options={multiSelectOptions}
      onValueChange={setSelected}
      defaultValue={selected}
      placeholder={placeholder}
      maxCount={3}
      animation={0}
      className="w-[325px] min-h-[44px] bg-white dark:bg-zinc-800 border-2 border-zinc-300 dark:border-zinc-600 text-zinc-900 dark:text-zinc-100 shadow-sm"
    />
  );
}
