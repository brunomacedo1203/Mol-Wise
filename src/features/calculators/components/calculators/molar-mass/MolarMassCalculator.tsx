"use client";
import { useTranslations } from "next-intl";
import { CalculatorBaseProps } from "@/features/calculators/domain/types";
import { useMolarMassCalculator } from "@/features/calculators/hooks";
import {
  MolecularFormulaInput,
  KeyboardCalculate,
} from "@/features/calculators/components/calculators/molar-mass";
import { CalculatorContainer } from "@/features/calculators/components/common";

// Props do componente de calculadora de massa molar
type MolarMassCalculatorProps = Omit<
  CalculatorBaseProps,
  "title" | "subtitle"
> & {
  id: number;
  initialFormula?: string;
  onFormulaChange?: (formula: string) => void;
  initialResult?: string | null;
  onResultChange?: (result: string | null) => void;
};

// Componente de calculadora de massa molar com interface arrastável e teclado virtual
export default function MolarMassCalculator({
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
}: MolarMassCalculatorProps) {
  const {
    formula,
    molarMass,
    errorMessage,
    handleFormulaChange,
    calculate,
    reset,
    handleKeyPress,
    handleFormulaBtn,
    handleParenthesis,
    backspace,
  } = useMolarMassCalculator({
    initialFormula,
    initialResult,
    onFormulaChange,
    onResultChange,
  });

  const t = useTranslations("calculators.molarMass");

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
        <MolecularFormulaInput
          value={formula}
          onChange={handleFormulaChange}
          onEnterPress={calculate}
          errorMessage={errorMessage}
          resultHtml={molarMass || undefined}
        />
      }
      actions={
        <KeyboardCalculate
          onKeyPress={handleKeyPress}
          onFormulaClick={handleFormulaBtn}
          onReset={reset}
          onParenthesis={handleParenthesis}
          onCalculate={calculate}
          onBackspace={backspace}
        />
      }
      onClose={onClose}
    />
  );
}
