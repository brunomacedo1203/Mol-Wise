"use client";
import React from "react";
import KeyboardBtn from "@/shared/components/KeyboardBtn";

const formulas = [
  { label: "CH₃", value: "CH3" },
  { label: "CH₂", value: "CH2" },
  { label: "CH", value: "CH" },
  { label: "NH₂", value: "NH2" },
  { label: "SO₄", value: "SO4" },
  { label: "PO₄", value: "PO4" },
  { label: "CO₃", value: "CO3" },
];

export default function FormulasBtn({
  onFormulaClick,
}: {
  onFormulaClick?: (value: string) => void;
}) {
  return (
    <div className="flex gap-2 justify-center flex-wrap py-2">
      {formulas.map((f) => (
        <KeyboardBtn
          key={f.label}
          onClick={() => onFormulaClick?.(f.value)}
          className="!w-14 !h-12 text-lg"
        >
          {f.label}
        </KeyboardBtn>
      ))}
    </div>
  );
}
