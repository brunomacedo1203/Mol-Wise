"use client";
import { useTranslations } from "next-intl";
import { useCallback } from "react";
import { useParams } from "next/navigation";
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
  const t = useTranslations("calculators.scientific");
  const params = useParams();
  const locale = params.locale as string;

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
    locale,
    getErrorMessage: (type: string) => {
      if (type === "invalidExpression") return t("errors.invalidExpression");
      if (type === "empty") return t("errors.empty");
      return "";
    },
  });

  // Handlers para permitir seleção de texto no resultado
  const handleResultMouseDown = useCallback((e: React.MouseEvent) => {
    // Impede que o evento se propague para o Rnd
    e.stopPropagation();
  }, []);

  const handleResultMouseMove = useCallback((e: React.MouseEvent) => {
    // Permite seleção de texto durante o arraste do mouse
    e.stopPropagation();
  }, []);

  const handleResultClick = useCallback((e: React.MouseEvent) => {
    // Impede que o clique se propague para o Rnd
    e.stopPropagation();
  }, []);

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
        <div className="flex flex-col w-full">
          <ScientificExpressionInput
            value={formula}
            onChange={handleFormulaChange}
            onEnterPress={calculate}
            errorMessage={errorMessage}
            placeholder={t("input.placeholder")}
          />
          <div className="h-[2rem] w-full px-3 overflow-hidden flex items-center">
            {result ? (
              <div
                className="text-blue-600 dark:text-blue-400 text-left text-2xl font-mono break-words select-text cursor-text"
                onMouseDown={handleResultMouseDown}
                onMouseMove={handleResultMouseMove}
                onClick={handleResultClick}
              >
                = {result}
              </div>
            ) : errorMessage ? (
              <div className="text-red-500 dark:text-red-400 text-left text-xl font-sans break-words">
                {errorMessage}
              </div>
            ) : (
              <span className="block invisible text-2xl">0</span>
            )}
          </div>
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
