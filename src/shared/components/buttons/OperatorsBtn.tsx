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
    <div className="flex gap-1.5 mt-1 items-center justify-center w-full">
      <KeyboardBtn onClick={onClear} className="bg-white w-9 h-9">
        <ReloadIcon size={20} />
      </KeyboardBtn>
      <KeyboardBtn
        onClick={() => onParenthesis?.("(")}
        className="bg-white w-9 h-9 text-base"
      >
        (
      </KeyboardBtn>
      <KeyboardBtn
        onClick={onCalculate}
        noDefaultHover
        className="!bg-teal-400 hover:!bg-teal-600 dark:bg-teal-500 dark:hover:bg-teal-700 text-black font-semibold text-sm sm:text-base min-w-[110px] h-9 px-4"
      >
        {t("calculators.molarMass.keyboard.calculate")}
      </KeyboardBtn>

      <KeyboardBtn
        onClick={() => onParenthesis?.(")")}
        className="bg-white w-9 h-9 text-base"
      >
        )
      </KeyboardBtn>
      <KeyboardBtn onClick={onBackspace} className="bg-white w-9 h-9">
        <BackspaceIcon size={20} />
      </KeyboardBtn>
    </div>
  );
}
