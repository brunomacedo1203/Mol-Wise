import React from "react";

export interface InputFormulaProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyUp: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  placeholder?: string;
}

export default function InputFormula({
  value,
  onChange,
  onKeyUp,
  placeholder = "Digite algo...",
}: InputFormulaProps) {
  return (
    <input
      className="input"
      type="text"
      value={value}
      onChange={onChange}
      onKeyUp={onKeyUp}
      placeholder={placeholder}
    />
  );
}
