"use client";
import { useCallback } from "react";
import { useMolarMassCalculatorAdapter } from "@/core/application/hooks/useMolarMassCalculatorAdapter";
import { 
  trackMolarMassCalculation, 
  trackMolarMassReset, 
  trackMolarMassFormulaChange 
} from "../../events/molarMassEvents";

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
  calculate: () => Promise<string | null>;
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
      
      // Tracking de mudança de fórmula
      if (newFormula.trim() !== "") {
        trackMolarMassFormulaChange({
          formula_input: newFormula,
        });
      }
    },
    [_handleFormulaChange, onFormulaChange]
  );

  const calculate = useCallback(async (): Promise<string | null> => {
    try {
      const result = await _calculate();
      const resultValue = result || molarMass;
      const stringValue = typeof resultValue === 'string' ? resultValue : resultValue?.value || resultValue?.displayText || null;
      
      onResultChange?.(stringValue);
      onFormulaChange?.(formula);
      
      // Tracking de cálculo bem-sucedido
      trackMolarMassCalculation({
        formula_input: formula,
        result_value: stringValue || '',
        success: true,
      });
      
      return stringValue;
    } catch (error) {
      // Tracking de cálculo com erro
      trackMolarMassCalculation({
        formula_input: formula,
        success: false,
        error_type: error instanceof Error ? error.message : "unknown_error",
      });
      throw error;
    }
  }, [_calculate, molarMass, formula, onResultChange, onFormulaChange]);

  const reset = useCallback(() => {
    _reset();
    onResultChange?.(null);
    
    // Tracking de reset
    trackMolarMassReset({});
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
