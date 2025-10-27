"use client";
import React from "react";
import KeyboardBtn from "../keyboard/KeyboardBtn";

const formulas = [
  { label: "CH₃", value: "CH3" },
  { label: "CH₂", value: "CH2" },
  { label: "CH", value: "CH" },
  { label: "NO₃", value: "NO3" },
  { label: "SO₄", value: "SO4" },
  { label: "PO₄", value: "PO4" },
  { label: "CO₃", value: "CO3" },
];

interface FormulasBtnProps {
  onFormulaClick?: (value: string) => void;
  size?: "md" | "compact";
}

export default function FormulasBtn({
  onFormulaClick,
  size = "md",
}: FormulasBtnProps) {
  const buttonSizeClass =
    size === "compact"
      ? "!w-[44px] !h-[36px] !text-[1.02rem]"
      : "!w-12 !h-10 !text-lg";
  return (
    <div className="flex gap-1.5 justify-center flex-wrap py-1.5">
      {formulas.map((f) => (
        <KeyboardBtn
          key={f.label}
          onClick={() => onFormulaClick?.(f.value)}
          size={size}
          className={`${buttonSizeClass} leading-tight`}
        >
          {f.label}
        </KeyboardBtn>
      ))}
    </div>
  );
}
