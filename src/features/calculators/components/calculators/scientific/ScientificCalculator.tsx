"use client";
import { useTranslations } from "next-intl";
import { useCallback } from "react";
import { useParams } from "next/navigation";
import { useCalculatorHistoryStore } from "@/features/calculators/store/calculatorHistoryStore";
import { CalculatorBaseProps } from "@/features/calculators/domain/types";
import { useScientificCalculator } from "@/features/calculators/hooks/calculators/scientific/useScientificCalculator";
import ScientificKeyboard from "@/features/calculators/components/calculators/scientific/ScientificKeyboard";
import { CalculatorContainer } from "@/features/calculators/components/common";
import ScientificExpressionInput from "./ScientificExpressionInput";
import CalculationHistory from "./CalculationHistory";

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
  const isHistoryVisible = useCalculatorHistoryStore(
    (state) => state.historyVisibility[id] || false
  );
  const toggleHistoryVisibility = useCalculatorHistoryStore(
    (state) => state.toggleHistoryVisibility
  );

  const {
    formula,
    result,
    errorMessage,
    calculationHistory,
    handleFormulaChange,
    calculate,
    handleKeyPress,
    handleFunction,
    handleMemory,
    backspace,
    reset,
    clearHistory,
    updateCursorPosition,
  } = useScientificCalculator({
    initialFormula,
    initialResult,
    onFormulaChange,
    onResultChange,
    locale,
    calculatorId: id,
    getErrorMessage: (type: string) => {
      if (type === "invalidExpression") return t("errors.invalidExpression");
      if (type === "empty") return t("errors.empty");
      if (type === "divisionByZero") return t("errors.divisionByZero");
      return "";
    },
  });

  // Handler para usar resultado do histórico
  const handleUseHistoryResult = useCallback(
    (historyResult: string) => {
      const cleanResult =
        locale === "pt" ? historyResult.replace(/,/g, ".") : historyResult;
      handleFormulaChange(cleanResult);
    },
    [handleFormulaChange, locale]
  );

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
            result={result}
            onCursorPositionChange={updateCursorPosition}
            locale={locale}
          />
          <CalculationHistory
            history={calculationHistory}
            onUseResult={handleUseHistoryResult}
            onClearHistory={clearHistory}
            isVisible={isHistoryVisible}
            onToggleVisibility={() => toggleHistoryVisibility(id)}
          />
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
