"use client";
import { useCallback } from "react";
import { useMolarMassCalculatorAdapter } from "@/core/application/hooks/useMolarMassCalculatorAdapter";

// Props para o hook de calculadora de massa molar
interface UseMolarMassCalculatorProps {
  initialFormula?: string;
  initialResult?: string | null;
  onFormulaChange?: (formula: string) => void;
  onResultChange?: (result: string | null) => void;
}

// Retorno do hook de calculadora de massa molar
interface UseMolarMassCalculatorReturn {
  formula: string;
  molarMass: string | null;
  errorMessage: string | null;
  handleFormulaChange: (newFormula: string) => void;
  calculate: () => void;
  reset: () => void;
  backspace: () => void;
  handleKeyPress: (key: string) => void;
  handleFormulaBtn: (value: string) => void;
  handleParenthesis: (paren: string) => void;
}

// Hook para gerenciar o estado e lógica da calculadora de massa molar
export function useMolarMassCalculator({
  initialFormula = "",
  initialResult = null,
  onFormulaChange,
  onResultChange,
}: UseMolarMassCalculatorProps): UseMolarMassCalculatorReturn {
  const {
    formula,
    handleFormulaChange: _handleFormulaChange,
    molarMass,
    errorMessage,
    calculate: _calculate,
    reset: _reset,
  } = useMolarMassCalculatorAdapter(initialFormula, initialResult);

  const handleFormulaChange = useCallback(
    (newFormula: string) => {
      _handleFormulaChange(newFormula);
      onFormulaChange?.(newFormula);
    },
    [_handleFormulaChange, onFormulaChange]
  );

  const calculate = useCallback(() => {
    _calculate();
    onResultChange?.(molarMass);
    onFormulaChange?.(formula);
  }, [_calculate, molarMass, formula, onResultChange, onFormulaChange]);

  const reset = useCallback(() => {
    _reset();
    onResultChange?.(null);
  }, [_reset, onResultChange]);

  const backspace = useCallback(
    () => handleFormulaChange(formula.slice(0, -1)),
    [formula, handleFormulaChange]
  );

  const handleKeyPress = useCallback(
    (key: string) => {
      if (key === "⌫") {
        backspace();
      } else if (key === "⇧") {
        /* implementar caps lock se quiser */
      } else {
        handleFormulaChange(formula + key);
      }
    },
    [formula, handleFormulaChange, backspace]
  );

  const handleFormulaBtn = useCallback(
    (value: string) => handleFormulaChange(formula + value),
    [formula, handleFormulaChange]
  );

  const handleParenthesis = useCallback(
    (paren: string) => handleFormulaChange(formula + paren),
    [formula, handleFormulaChange]
  );

  return {
    formula,
    molarMass,
    errorMessage,
    handleFormulaChange,
    calculate,
    reset,
    backspace,
    handleKeyPress,
    handleFormulaBtn,
    handleParenthesis,
  };
}
