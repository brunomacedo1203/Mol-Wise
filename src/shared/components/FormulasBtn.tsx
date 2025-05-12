"use client";
import React from "react";
import KeyboardBtn from "@/shared/components/KeyboardBtn";

const formulas = [
  { label: "CH₃", value: "CH3" },
  { label: "CH₂", value: "CH2" },
  { label: "CH", value: "CH" },
  { label: "NO₃", value: "NO3" },
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
    <div className="flex gap-1 rounded-lg px-2 py-2 shadow-inner justify-center flex-wrap">
      {formulas.map((f) => (
        <KeyboardBtn
          key={f.label}
          onClick={() => onFormulaClick?.(f.value)}
          className="w-14 font-sans text-xl"
        >
          {f.label}
        </KeyboardBtn>
      ))}
    </div>
  );
}
