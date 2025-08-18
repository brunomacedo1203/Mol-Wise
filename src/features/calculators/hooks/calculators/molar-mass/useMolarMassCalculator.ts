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
  calculationHistory: Array<{
    formula: string;
    rawFormula: string;
    result: string;
    timestamp: number;
  }>;
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
  const resetCalculatorState = useCalculatorInstancesStore(
    (state) => state.resetCalculatorState
  );

  // Estado para o histórico de cálculos com persistência no localStorage
  const [calculationHistory, setCalculationHistory] = useState<
    Array<{ formula: string; rawFormula: string; result: string; timestamp: number }>
  >(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(
        `molwise_molar_mass_history_${calculatorId}`
      );
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) {
          console.error(
            "Erro ao carregar histórico da calculadora de massa molar:",
            e
          );
        }
      }
    }
    return [];
  });

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

    // Verifica se temos um resultado válido
    if (result && typeof result === 'object' && 'displayText' in result) {
      // Formata a fórmula com subscritos e "sanitiza" mantendo apenas <sub>
      const formattedFormula = formatWithSub(formula);
      const sanitizedFormula = formattedFormula.replace(
        /<(?!\/?(sub)\b)[^>]+>/gi,
        ""
      );

      // Atualiza o histórico com base no estado anterior (evita depender de calculationHistory)
      setCalculationHistory((prev) => {
        const newHistory = [
          {
            formula: sanitizedFormula, // HTML com <sub>
            rawFormula: formula, // texto puro digitado
            result: result.value, // Armazenamos apenas o valor numérico
            timestamp: Date.now(),
          },
          ...prev.slice(0, 9), // mantém no máximo 10 itens
        ];

        // Persiste no localStorage
        if (typeof window !== "undefined") {
          localStorage.setItem(
            `molwise_molar_mass_history_${calculatorId}`,
            JSON.stringify(newHistory)
          );
        }

        return newHistory;
      });

      // Passa o texto formatado para exibição
      onResultChange?.(result.displayText);
      onFormulaChange?.(formula);

      return result.displayText;
    } else if (molarMass) {
      // Fallback para o estado atual se não tivermos um resultado válido
      onResultChange?.(molarMass);
      onFormulaChange?.(formula);
      return molarMass;
    }

    return null;
  }, [_calculate, molarMass, formula, onResultChange, onFormulaChange, calculatorId]);

  const reset = useCallback(() => {
    _reset();
    onResultChange?.(null);
    // Limpa o estado no store persistido
    resetCalculatorState(calculatorId);
  }, [_reset, onResultChange, resetCalculatorState, calculatorId]);

  // Função para limpar o histórico de cálculos
  const clearHistory = useCallback(() => {
    setCalculationHistory([]);
    // Limpa o histórico no localStorage
    if (typeof window !== "undefined") {
      localStorage.removeItem(`molwise_molar_mass_history_${calculatorId}`);
    }
  }, [calculatorId]);

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
