"use client";
import React from "react";
import KeyboardBtn from "@/shared/components/KeyboardBtn";

interface KeyboardProps {
  onClear?: () => void;
  onBackspace?: () => void;
  onCalculate?: () => void;
  onKeyPress?: (key: string) => void;
}

export default function Keyboard({
  onClear,
  onBackspace,
  onCalculate,
  onKeyPress,
}: KeyboardProps) {
  return (
    <div className="flex flex-wrap gap-2 justify-center">
      <KeyboardBtn onClick={onClear}>C</KeyboardBtn>
      <KeyboardBtn onClick={onBackspace}>⌫</KeyboardBtn>
      <KeyboardBtn onClick={onCalculate}>=</KeyboardBtn>
      <KeyboardBtn onClick={() => onKeyPress?.("(")}>(</KeyboardBtn>
      <KeyboardBtn onClick={() => onKeyPress?.(")")}>)</KeyboardBtn>
    </div>
  );
}
