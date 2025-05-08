"use client";
import React from "react";
import Keyboard from "@/shared/components/Keyboard";
import FormulasBtn from "@/shared/components/FormulasBtn";
import OperatorsBtn from "@/shared/components/OperatorsBtn";

interface KeyboardCalculateProps {
  onFormulaClick: (value: string) => void;
  onReset: () => void;
  onCalculate: () => void;
  onBackspace: () => void;
  onKeyPress: (key: string) => void;
  onParenthesis: (paren: string) => void;
}

export default function KeyboardCalculate({
  onFormulaClick,
  onReset,
  onCalculate,
  onBackspace,
  onKeyPress,
  onParenthesis,
}: KeyboardCalculateProps) {
  return (
    <div className="flex flex-col gap-2">
      <FormulasBtn onFormulaClick={onFormulaClick} />
      <OperatorsBtn
        onClear={onReset}
        onBackspace={onBackspace}
        onCalculate={onCalculate}
        onParenthesis={onParenthesis}
      />
      <Keyboard
        onClear={onReset}
        onBackspace={onBackspace}
        onCalculate={onCalculate}
        onKeyPress={onKeyPress}
      />
    </div>
  );
}
