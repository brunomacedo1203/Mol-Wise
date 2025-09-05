import { MolarMassCalculator } from "@/features/calculators/components/calculators/molar-mass";
import { ScientificCalculator } from "@/features/calculators/components/calculators/scientific";
import { useCalculatorInstancesStore } from "@/features/calculators/store/calculatorInstancesStore";
import { useCalculatorHistoryStore } from "@/features/calculators/store/calculatorHistoryStore";
import { CloseAllButton } from "@/shared/components/buttons/CloseAllButton";
import { PositionWithWidth } from "@/features/calculators/domain/types";
import React, { useEffect } from "react";

// interface CalculatorPageContentProps { // Removido
//   // calculatorType: CalculatorType; // Removido
// } // Removido

export function CalculatorPageContent() {
  // Ajustado para remover a prop e interface, mantendo compatibilidade
  const calculators = useCalculatorInstancesStore((state) => state.calculators);
  const addCalculator = useCalculatorInstancesStore((state) => state.addCalculator);
  const removeCalculator = useCalculatorInstancesStore(
    (state) => state.removeCalculator
  );
  const updateCalculator = useCalculatorInstancesStore(
    (state) => state.updateCalculator
  );
  const clearCalculators = useCalculatorInstancesStore(
    (state) => state.clearCalculators
  );
  
  // Obter função para limpar o estado de visibilidade do histórico
  const resetHistoryVisibility = useCalculatorHistoryStore(
    (state) => state.resetHistoryVisibility
  );

  // Adicionar automaticamente uma calculadora científica se não houver nenhuma
  useEffect(() => {
    if (calculators.length === 0) {
      const defaultPosition = {
        x: 100 + Math.random() * 100,
        y: 100 + Math.random() * 100,
        width: 750,
      };
      addCalculator("scientific", defaultPosition);
    }
  }, [calculators.length, addCalculator]);

  // Se não houver calculadoras, não renderiza nada
  if (calculators.length === 0) {
    return null;
  }

  const renderCalculator = (calculator: (typeof calculators)[0]) => {
    const commonProps = {
      id: calculator.id,
      onClose: () => {
        resetHistoryVisibility(calculator.id);
        removeCalculator(calculator.id);
      },
      initialPosition: calculator.position,
      onPositionChange: (position: PositionWithWidth) =>
        updateCalculator(calculator.id, { position }),
      initialFormula: calculator.state?.formula,
      onFormulaChange: (formula: string) =>
        updateCalculator(calculator.id, {
          state: { ...calculator.state, formula },
        }),
      initialResult: calculator.state?.result,
      onResultChange: (result: string | null) =>
        updateCalculator(calculator.id, {
          state: { ...calculator.state, result },
        }),
      isKeyboardVisible: calculator.state?.isKeyboardVisible,
      onKeyboardVisibilityChange: (isKeyboardVisible: boolean) =>
        updateCalculator(calculator.id, {
          state: { ...calculator.state, isKeyboardVisible },
        }),
    };

    switch (calculator.type) {
      case "molar-mass":
        return <MolarMassCalculator key={calculator.id} {...commonProps} />;
      case "scientific":
        return <ScientificCalculator key={calculator.id} {...commonProps} />;
      default:
        return null;
    }
  };

  return (
    <div id="main-content-area" className="w-full min-h-screen relative">
      <div className="absolute top-4 left-4 z-50">
        <CloseAllButton 
          count={calculators.length} 
          onClick={() => {
            // Limpar o estado de visibilidade do histórico para todas as calculadoras
            calculators.forEach(calc => resetHistoryVisibility(calc.id));
            clearCalculators();
          }} 
        />
      </div>
      {calculators.map(renderCalculator)}
    </div>
  );
}
