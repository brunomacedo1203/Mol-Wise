"use client";
import React from "react";
import KeyboardBtn from "@/shared/components/KeyboardBtn";
import { RefreshCw, Delete } from "lucide-react";

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
    <div className="flex gap-2 mb-2">
      <KeyboardBtn onClick={onClear} className="w-[80px] h-[80px]">
        <RefreshCw size={20} />
      </KeyboardBtn>
      <KeyboardBtn onClick={onBackspace} className="w-[80px] h-[80px]">
        <Delete size={20} />
      </KeyboardBtn>
      <KeyboardBtn
        onClick={onCalculate}
        className="w-[80px] h-[80px] bg-gradient-to-br from-emerald-400 to-emerald-500 text-white"
      >
        =
      </KeyboardBtn>
      <KeyboardBtn
        onClick={() => onParenthesis?.("(")}
        className="w-[80px] h-[80px]"
      >
        (
      </KeyboardBtn>
      <KeyboardBtn
        onClick={() => onParenthesis?.(")")}
        className="w-[80px] h-[80px]"
      >
        )
      </KeyboardBtn>
    </div>
  );
}
