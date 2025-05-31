import { useCalculatorInstances } from "@/features/calculators/contexts/CalculatorInstancesContext";
import { UseCalculatorPageProps, UseCalculatorPageReturn } from "@/features/calculators/domain/types";
import { useEffect } from "react";

export function useCalculatorPage({
  calculatorType,
  initialPosition = { x: 100, y: 100 },
  onCalculatorAdd,
  onCalculatorRemove,
}: UseCalculatorPageProps): UseCalculatorPageReturn {
  const { calculators, addCalculator, removeCalculator, updateCalculator } =
    useCalculatorInstances();

  // Adiciona uma calculadora quando o hook é montado
  useEffect(() => {
    if (calculators.length === 0) {
      addCalculator(calculatorType, initialPosition);
      onCalculatorAdd?.();
    }
  }, [addCalculator, calculators.length, calculatorType, initialPosition, onCalculatorAdd]);

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

  const calculator = calculators[0];

  return {
    calculator,
    handlers: {
      onClose: () => {
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