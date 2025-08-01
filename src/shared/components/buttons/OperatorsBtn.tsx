"use client";
import React from "react";
import { useTranslations } from "next-intl";
import KeyboardBtn from "../keyboard/KeyboardBtn";
import { ReloadIcon } from "../icons/ReloadIcon";
import { BackspaceIcon } from "../icons/BackspaceIcon";

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
  const t = useTranslations();

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
        noDefaultHover
        className="
    !bg-teal-400 hover:!bg-teal-600 
    dark:bg-teal-500 dark:hover:bg-teal-700
    text-black font-semibold text-xl w-12 h-10 px-[62px]
l  "
      >
        {t("calculators.molarMass.keyboard.calculate")}
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
