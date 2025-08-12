"use client";
import { useCallback, useState } from "react";
import { useMolarMassCalculatorAdapter } from "@/core/application/hooks/useMolarMassCalculatorAdapter";
import { useCalculatorInstancesStore } from "@/features/calculators/store/calculatorInstancesStore";
import { formatWithSub } from "@/shared/utils/formatWithSub";

// Props para o hook de calculadora de massa molar
interface UseMolarMassCalculatorProps {
  initialFormula?: string;
  initialResult?: string | null;
  onFormulaChange?: (formula: string) => void;
  onResultChange?: (result: string | null) => void;
  calculatorId: number;
}

// Retorno do hook de calculadora de massa molar
interface UseMolarMassCalculatorReturn {
  formula: string;
  molarMass: string | null;
  errorMessage: string | null;
  calculationHistory: Array<{ formula: string; rawFormula: string; result: string; timestamp: number }>;
  handleFormulaChange: (newFormula: string) => void;
  calculate: () => Promise<string | null>;
  reset: () => void;
  backspace: () => void;
  handleKeyPress: (key: string) => void;
  handleFormulaBtn: (value: string) => void;
  handleParenthesis: (paren: string) => void;
  clearHistory: () => void;
}

// Hook para gerenciar o estado e lógica da calculadora de massa molar
export default function useMolarMassCalculator({
  initialFormula = "",
  initialResult = null,
  onFormulaChange,
  onResultChange,
  calculatorId,
}: UseMolarMassCalculatorProps): UseMolarMassCalculatorReturn {
  const resetCalculatorState = useCalculatorInstancesStore((state) => state.resetCalculatorState);
  
  // Estado para o histórico de cálculos
  const [calculationHistory, setCalculationHistory] = useState<
    Array<{ formula: string; rawFormula: string; result: string; timestamp: number }>
  >([]);
  
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

  const calculate = useCallback(async () => {
    // Executa o cálculo (função assíncrona)
    const result = await _calculate();
    
    // Adiciona ao histórico após o cálculo ser realizado
    // Usa o resultado retornado por _calculate() ou o estado molarMass se disponível
    const currentResult = result || molarMass;
    
    if (currentResult) {
      setCalculationHistory(prev => [
        {
          formula: formatWithSub(formula), // Formata a fórmula com subscritos
          rawFormula: formula, // Armazena a fórmula original sem formatação
          result: currentResult,
          timestamp: Date.now()
        },
        ...prev.slice(0, 9) // Mantém apenas os 10 cálculos mais recentes
      ]);
    }
    
    onResultChange?.(currentResult);
    onFormulaChange?.(formula);
    
    return currentResult;
  }, [_calculate, molarMass, formula, onResultChange, onFormulaChange]);

  const reset = useCallback(() => {
    _reset();
    onResultChange?.(null);
    // Limpa o estado no store persistido
    resetCalculatorState(calculatorId);
  }, [_reset, onResultChange, resetCalculatorState, calculatorId]);
  
  // Função para limpar o histórico de cálculos
  const clearHistory = useCallback(() => {
    setCalculationHistory([]);
  }, []);
  
  // Função interna para usar um resultado do histórico
  const _useHistoryResult = useCallback((result: string) => {
    handleFormulaChange(result);
  }, [handleFormulaChange]);

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
    calculationHistory,
    handleFormulaChange,
    calculate,
    reset,
    backspace,
    handleKeyPress,
    handleFormulaBtn,
    handleParenthesis,
    clearHistory,
  };
}