"use client";
import { useTranslations } from "next-intl";
import { CalculatorBaseProps } from "@/features/calculators/domain/types";
import { useScientificCalculator } from "@/features/calculators/hooks/calculators/scientific/useScientificCalculator";
import ScientificKeyboard from "@/features/calculators/components/calculators/scientific/ScientificKeyboard";
import { CalculatorContainer } from "@/features/calculators/components/common";
import ScientificExpressionInput from "./ScientificExpressionInput";

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
    reset,
  } = useScientificCalculator({
    initialFormula,
    initialResult,
    onFormulaChange,
    onResultChange,
    getErrorMessage: (type) => {
      if (type === "invalidExpression") return t("errors.invalidExpression");
      if (type === "empty") return t("errors.empty");
      return "";
    },
  });

  const t = useTranslations("calculators.scientific");

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
          <ScientificExpressionInput
            value={formula}
            onChange={handleFormulaChange}
            onEnterPress={calculate}
            errorMessage={errorMessage}
            placeholder={t("input.placeholder")}
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
          onReset={reset}
        />
      }
      onClose={onClose}
    />
  );
}
