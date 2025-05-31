"use client";
import { useMolarMassCalculatorAdapter } from "@/core/application/hooks/useMolarMassCalculatorAdapter";
import MolecularFormulaInput from "@/features/calculators/components/MolecularFormulaInput";
import CalculatorContainer from "./CalculatorContainer";
import KeyboardCalculate from "@/features/calculators/components/KeyboardCalculate";
import { useTranslations } from "next-intl";

interface MolarMassCalculatorProps {
  onClose?: () => void;
  initialPosition?: { x: number; y: number; width?: number };
  onPositionChange?: (position: {
    x: number;
    y: number;
    width: number;
  }) => void;
  initialFormula?: string;
  onFormulaChange?: (formula: string) => void;
  initialResult?: string | null;
  onResultChange?: (result: string | null) => void;
  isKeyboardVisible?: boolean;
  onKeyboardVisibilityChange?: (visible: boolean) => void;
}

export default function MolarMassCalculator({
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
    handleFormulaChange: _handleFormulaChange,
    molarMass,
    errorMessage,
    calculate: _calculate,
    reset: _reset,
  } = useMolarMassCalculatorAdapter(initialFormula, initialResult);

  // Wrap calculate to notify parent
  const calculate = () => {
    _calculate();
    onResultChange?.(molarMass);
    if (onFormulaChange) {
      onFormulaChange(formula);
    }
  };

  // Wrap reset to notify parent
  const reset = () => {
    _reset();
    onResultChange?.(null);
  };

  // Wrap handleFormulaChange to notify parent
  const handleFormulaChange = (newFormula: string) => {
    _handleFormulaChange(newFormula);
    onFormulaChange?.(newFormula);
  };

  const backspace = () => handleFormulaChange(formula.slice(0, -1));

  function handleKeyPress(key: string) {
    if (key === "⌫") backspace();
    else if (key === "⇧") {
      /* implementar caps lock se quiser */
    } else handleFormulaChange(formula + key);
  }

  function handleFormulaBtn(value: string) {
    handleFormulaChange(formula + value);
  }

  function handleParenthesis(paren: string) {
    handleFormulaChange(formula + paren);
  }

  const t = useTranslations("calculators.molarMass");

  return (
    <CalculatorContainer
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
          resultHtml={molarMass === null ? undefined : molarMass}
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
