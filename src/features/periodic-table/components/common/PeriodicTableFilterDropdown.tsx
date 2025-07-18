// src/features/periodic-table/components/common/PeriodicTableFilterDropdown.tsx
import React from "react";

interface PeriodicTableFilterDropdownProps {
  options: { value: string; label: string }[];
  value: string;
  onChange: (value: string) => void;
}

const PeriodicTableFilterDropdown: React.FC<
  PeriodicTableFilterDropdownProps
> = ({ options, value, onChange }) => (
  <select value={value} onChange={(e) => onChange(e.target.value)}>
    {options.map((option) => (
      <option key={option.value} value={option.value}>
        {option.label}
      </option>
    ))}
  </select>
);

export default PeriodicTableFilterDropdown;
