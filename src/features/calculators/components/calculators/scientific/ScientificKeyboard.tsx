import React from "react";
import { ScientificKeyboardProps } from "@/features/calculators/domain/types/keyboard";
import KeyboardBtn from "@/shared/components/keyboard/KeyboardBtn";
import { ReloadIcon } from "@/shared/components/icons/ReloadIcon";
import { BackspaceIcon } from "@/shared/components/icons/BackspaceIcon";
import { useTranslations } from "next-intl";
import { ScientificButton } from "./ScientificButton";
import { SCIENTIFIC_BUTTONS } from "@/features/calculators/domain/types/scientific-constants";

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

  const fullKeyboardLayout: {
    label: string;
    value: string;
    type: "scientific" | "numeric" | "operator";
    colSpan?: number;
  }[][] = [
    [
      { label: "sin", value: "sin", type: "scientific" },
      { label: "cos", value: "cos", type: "scientific" },
      { label: "tan", value: "tan", type: "scientific" },
      { label: "log", value: "log10", type: "scientific" },
    ],
    [
      { label: "asin", value: "asin", type: "scientific" },
      { label: "acos", value: "acos", type: "scientific" },
      { label: "atan", value: "atan", type: "scientific" },
      { label: "ln", value: "log", type: "scientific" },
    ],
    [
      { label: "√", value: "sqrt", type: "scientific" },
      { label: "x^y", value: "pow", type: "scientific" },
      { label: "π", value: "PI", type: "scientific" },
      { label: "e", value: "E", type: "scientific" },
    ],
    [
      { label: "7", value: "7", type: "numeric" },
      { label: "8", value: "8", type: "numeric" },
      { label: "9", value: "9", type: "numeric" },
      { label: "/", value: "/", type: "operator" },
    ],
    [
      { label: "4", value: "4", type: "numeric" },
      { label: "5", value: "5", type: "numeric" },
      { label: "6", value: "6", type: "numeric" },
      { label: "*", value: "*", type: "operator" },
    ],
    [
      { label: "1", value: "1", type: "numeric" },
      { label: "2", value: "2", type: "numeric" },
      { label: "3", value: "3", type: "numeric" },
      { label: "-", value: "-", type: "operator" },
    ],
    [
      { label: "0", value: "0", type: "numeric", colSpan: 2 },
      { label: ".", value: ".", type: "numeric" },
      { label: "+", value: "+", type: "operator" },
    ],
  ];

  return (
    <div className="flex flex-col items-center w-full gap-0 py-2 rounded-xl shadow">
      <div className="w-full px-4 grid grid-cols-4 gap-1">
        {fullKeyboardLayout.map((row, rowIndex) => (
          <React.Fragment key={rowIndex}>
            {row.map((button, _buttonIndex) => {
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

      {/* Botões de operação especiais */}
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
