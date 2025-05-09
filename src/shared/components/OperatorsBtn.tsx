"use client";
import React from "react";
import KeyboardBtn from "@/shared/components/KeyboardBtn";
import { ReloadIcon } from "./icons/ReloadIcon";
import { BackspaceIcon } from "./icons/BackspaceIcon";

interface OperatorsBtnProps {
  onClear?: () => void;
  onBackspace?: () => void;
  onCalculate?: () => void;
  onParenthesis?: (paren: string) => void;
}

export default function OperatorsBtn({
  onClear,
  onBackspace,
  onCalculate,
  onParenthesis,
}: OperatorsBtnProps) {
  return (
    <div className="flex gap-2 mt-1 items-center justify-center w-full">
      <KeyboardBtn onClick={onClear} className="bg-white w-10 h-10">
        <ReloadIcon size={24} />
      </KeyboardBtn>
      <KeyboardBtn
        onClick={() => onParenthesis?.("(")}
        className="bg-white w-10 h-10"
      >
        (
      </KeyboardBtn>
      <KeyboardBtn
        onClick={onCalculate}
        className="!bg-green-400 !hover:bg-green-500 text-white font-semibold w-16 h-10 px-20"
      >
        CALCULATE
      </KeyboardBtn>
      <KeyboardBtn
        onClick={() => onParenthesis?.(")")}
        className="bg-white w-10 h-10"
      >
        )
      </KeyboardBtn>
      <KeyboardBtn onClick={onBackspace} className="bg-white w-10 h-10">
        <BackspaceIcon size={24} />
      </KeyboardBtn>
    </div>
  );
}
