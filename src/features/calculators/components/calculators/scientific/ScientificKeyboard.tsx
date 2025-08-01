// features/calculators/components/calculators/scientific/ScientificKeyboard.tsx

import React from "react";
import { ScientificKeyboardProps } from "@/features/calculators/domain/types/keyboard";
import KeyboardBtn from "@/shared/components/keyboard/KeyboardBtn";
import { ReloadIcon } from "@/shared/components/icons/ReloadIcon";
import { BackspaceIcon } from "@/shared/components/icons/BackspaceIcon";
import { useTranslations } from "next-intl";
import { ScientificButton } from "./ScientificButton";
import { SCIENTIFIC_BUTTONS } from "@/features/calculators/domain/types/scientific-constants";
import { chunkArray } from "@/features/calculators/utils/chunkArray";

export default function ScientificKeyboard({
  onKeyPress,
  onFunction,
  onCalculate,
  onBackspace,
  onReset,
}: ScientificKeyboardProps) {
  const t = useTranslations("calculators.scientific");

  const scientificButtonMap = new Map(
    SCIENTIFIC_BUTTONS.map((btn) => [btn.value, btn])
  );

  const scientificLayoutRows = chunkArray(SCIENTIFIC_BUTTONS, 8).map((row) =>
    row.map((btn) => ({
      label: btn.label,
      value: btn.value,
      type: "scientific" as const,
      colSpan: 1,
    }))
  );

  const numericAndOperatorLayoutRows = [
    ["7", "8", "9", "/"],
    ["4", "5", "6", "*"],
    ["1", "2", "3", "-"],
    ["0", ".", "+"],
  ];

  const fullKeyboardLayout = [
    ...scientificLayoutRows,
    ...numericAndOperatorLayoutRows.map((row) =>
      row.map((value) => ({
        label: value,
        value,
        type:
          value === "+" || value === "-" || value === "*" || value === "/"
            ? "operator"
            : "numeric",
        colSpan: value === "0" ? 4 : 2,
      }))
    ),
  ];

  return (
    <div className="flex flex-col items-center w-full gap-0 py-2 rounded-xl shadow">
      <div className="grid grid-cols-8 gap-1 w-[482px] mx-auto">
        {fullKeyboardLayout.map((row, rowIndex) => (
          <React.Fragment key={rowIndex}>
            {row.map((button) => {
              if (button.type === "scientific") {
                const scientificConfig = scientificButtonMap.get(button.value);
                if (!scientificConfig) return null;

                return (
                  <ScientificButton
                    key={button.value}
                    button={scientificConfig}
                    onClick={onFunction}
                    className={
                      button.colSpan ? `col-span-${button.colSpan}` : ""
                    }
                  />
                );
              } else {
                return (
                  <KeyboardBtn
                    key={button.value}
                    onClick={() => onKeyPress?.(button.value)}
                    className={
                      button.colSpan ? `col-span-${button.colSpan}` : ""
                    }
                  >
                    {button.label}
                  </KeyboardBtn>
                );
              }
            })}
          </React.Fragment>
        ))}
      </div>

      <div className="flex gap-2 mt-2 items-center justify-center w-full px-4">
        <KeyboardBtn onClick={onReset} className="bg-white w-10 h-10">
          <ReloadIcon size={24} />
        </KeyboardBtn>
        <KeyboardBtn
          onClick={() => onFunction && onFunction("(")}
          className="bg-white w-10 h-10"
        >
          (
        </KeyboardBtn>
        <KeyboardBtn
          onClick={onCalculate}
          noDefaultHover
          className="!bg-teal-400 hover:!bg-teal-600 dark:bg-teal-500 dark:hover:bg-teal-700 text-black font-semibold text-xl w-34 h-10 px-6"
        >
          {t("keyboard.calculate")}
        </KeyboardBtn>
        <KeyboardBtn
          onClick={() => onFunction && onFunction(")")}
          className="bg-white w-10 h-10"
        >
          )
        </KeyboardBtn>
        <KeyboardBtn onClick={onBackspace} className="bg-white w-10 h-10">
          <BackspaceIcon size={24} />
        </KeyboardBtn>
      </div>
    </div>
  );
}
