"use client";
import { useTranslations } from "next-intl";
import { CalculatorBaseProps } from "@/features/calculators/domain/types";
import { useScientificCalculator } from "@/features/calculators/hooks/calculators/scientific/useScientificCalculator";
import ScientificKeyboard from "@/features/calculators/components/calculators/scientific/ScientificKeyboard";
import { CalculatorContainer } from "@/features/calculators/components/common";
import { Input } from "@/shared/components/ui/input";
import { ChangeEvent, KeyboardEvent } from "react";

type ScientificCalculatorProps = Omit<
  CalculatorBaseProps,
  "title" | "subtitle"
> & {
  id: number;
  initialFormula?: string;
  onFormulaChange?: (formula: string) => void;
  initialResult?: string | null;
  onResultChange?: (result: string | null) => void;
};

export default function ScientificCalculator({
  id,
  onClose,
  initialPosition,
  onPositionChange,
  initialFormula = "",
  onFormulaChange,
  initialResult = null,
  onResultChange,
  isKeyboardVisible = true,
  onKeyboardVisibilityChange,
}: ScientificCalculatorProps) {
  const {
    formula,
    result,
    errorMessage,
    handleFormulaChange,
    calculate,
    handleKeyPress,
    handleFunction,
    handleMemory,
    backspace,
  } = useScientificCalculator({
    initialFormula,
    initialResult,
    onFormulaChange,
    onResultChange,
  });

  const t = useTranslations("calculators.scientific");

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    handleFormulaChange(e.target.value);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      calculate();
    }
  };

  return (
    <CalculatorContainer
      id={id}
      title={t("title")}
      subtitle={t("subtitle")}
      initialPosition={initialPosition}
      onPositionChange={onPositionChange}
      isKeyboardVisible={isKeyboardVisible}
      onKeyboardVisibilityChange={onKeyboardVisibilityChange}
      input={
        <div className="flex flex-col gap-2 w-full">
          <Input
            type="text"
            value={formula}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            className="text-right text-lg font-mono"
            placeholder="Digite uma expressão..."
          />
          {result && (
            <div className="text-right text-lg font-mono text-muted-foreground">
              = {result}
            </div>
          )}
          {errorMessage && (
            <div className="text-right text-sm text-destructive">
              {errorMessage}
            </div>
          )}
        </div>
      }
      actions={
        <ScientificKeyboard
          onKeyPress={handleKeyPress}
          onFunction={handleFunction}
          onMemory={handleMemory}
          onCalculate={calculate}
          onBackspace={backspace}
        />
      }
      onClose={onClose}
    />
  );
}
