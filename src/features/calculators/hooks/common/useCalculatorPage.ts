import { useCalculatorInstancesStore } from "@/features/calculators/store/calculatorInstancesStore";
import { useCalculatorHistoryStore } from "@/features/calculators/store/calculatorHistoryStore";
import { UseCalculatorPageProps, UseCalculatorPageReturn } from "@/features/calculators/domain/types";
import { useEffect } from "react";

export function useCalculatorPage({
  calculatorType,
  initialPosition = { x: 100, y: 100 },
  onCalculatorAdd,
  onCalculatorRemove,
}: UseCalculatorPageProps): UseCalculatorPageReturn {
  const calculators = useCalculatorInstancesStore((state) => state.calculators);
  const addCalculator = useCalculatorInstancesStore((state) => state.addCalculator);
  const removeCalculator = useCalculatorInstancesStore((state) => state.removeCalculator);
  const updateCalculator = useCalculatorInstancesStore((state) => state.updateCalculator);
  const resetHistoryVisibility = useCalculatorHistoryStore((state) => state.resetHistoryVisibility);

  // Adiciona uma calculadora quando o hook é montado
  useEffect(() => {
    addCalculator(calculatorType, initialPosition);
    onCalculatorAdd?.();
  }, [addCalculator, calculatorType, initialPosition, onCalculatorAdd]);

  // Se não houver calculadora, retorna null
  if (calculators.length === 0) {
    return {
      calculator: null,
      handlers: {
        onClose: () => {},
        onPositionChange: () => {},
        onFormulaChange: () => {},
        onResultChange: () => {},
        onKeyboardVisibilityChange: () => {},
      },
    };
  }

  const calculator = calculators[calculators.length - 1]; // Pega a última calculadora adicionada

  return {
    calculator,
    handlers: {
      onClose: () => {
        resetHistoryVisibility(calculator.id);
        removeCalculator(calculator.id);
        onCalculatorRemove?.();
      },
      onPositionChange: (position) =>
        updateCalculator(calculator.id, { position }),
      onFormulaChange: (formula) =>
        updateCalculator(calculator.id, {
          state: { ...calculator.state, formula },
        }),
      onResultChange: (result) =>
        updateCalculator(calculator.id, {
          state: { ...calculator.state, result },
        }),
      onKeyboardVisibilityChange: (isKeyboardVisible) =>
        updateCalculator(calculator.id, {
          state: { ...calculator.state, isKeyboardVisible },
        }),
    },
  };
}