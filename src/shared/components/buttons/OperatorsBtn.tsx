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
  size?: "md" | "compact";
}

export default function OperatorsBtn({
  onClear,
  onBackspace,
  onCalculate,
  onParenthesis,
  size = "md",
}: OperatorsBtnProps) {
  const t = useTranslations();
  const iconSize = size === "compact" ? 18 : 20;
  const smallButtonClass =
    size === "compact" ? "bg-white w-[32px] h-[32px]" : "bg-white w-9 h-9";
  const calculateButtonClass =
    size === "compact"
      ? "!bg-teal-400 hover:!bg-teal-600 dark:bg-teal-500 dark:hover:bg-teal-700 text-black font-semibold text-sm min-w-[100px] h-[32px] px-3"
      : "!bg-teal-400 hover:!bg-teal-600 dark:bg-teal-500 dark:hover:bg-teal-700 text-black font-semibold text-sm sm:text-base min-w-[110px] h-9 px-4";

  return (
    <div className="flex gap-1.5 mt-1 items-center justify-center w-full">
      <KeyboardBtn onClick={onClear} className={smallButtonClass} size={size}>
        <ReloadIcon size={iconSize} />
      </KeyboardBtn>
      <KeyboardBtn
        onClick={() => onParenthesis?.("(")}
        className={`${smallButtonClass} text-base`}
        size={size}
      >
        (
      </KeyboardBtn>
      <KeyboardBtn
        onClick={onCalculate}
        noDefaultHover
        className={calculateButtonClass}
        size={size}
      >
        {t("calculators.molarMass.keyboard.calculate")}
      </KeyboardBtn>

      <KeyboardBtn
        onClick={() => onParenthesis?.(")")}
        className={`${smallButtonClass} text-base`}
        size={size}
      >
        )
      </KeyboardBtn>
      <KeyboardBtn onClick={onBackspace} className={smallButtonClass} size={size}>
        <BackspaceIcon size={iconSize} />
      </KeyboardBtn>
    </div>
  );
}
