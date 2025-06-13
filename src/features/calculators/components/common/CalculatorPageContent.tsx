import { MolarMassCalculator } from "@/features/calculators/components/calculators/molar-mass";
import { ScientificCalculator } from "@/features/calculators/components/calculators/scientific";
import { useCalculatorInstances } from "@/features/calculators/contexts/CalculatorInstancesContext";
import { CloseAllButton } from "@/shared/components/buttons/CloseAllButton";
// import { CalculatorType } from "@/features/calculators/domain/types/calculator"; // Removido
import React from "react";

// interface CalculatorPageContentProps { // Removido
//   // calculatorType: CalculatorType; // Removido
// } // Removido

export function CalculatorPageContent({}: /* calculatorType, */ /* CalculatorPageContentProps */ any) {
  // Ajustado para remover a prop e interface, mantendo compatibilidade
  const {
    calculators,
    clearCalculators,
    removeCalculator,
    updateCalculator,
    // addCalculator, // Removido
  } = useCalculatorInstances();

  // Se não houver calculadoras, não renderiza nada
  if (calculators.length === 0) {
    return null;
  }

  const renderCalculator = (calculator: (typeof calculators)[0]) => {
    const commonProps = {
      key: calculator.id,
      id: calculator.id,
      onClose: () => removeCalculator(calculator.id),
      initialPosition: calculator.position,
      onPositionChange: (position: any) =>
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
        return <MolarMassCalculator {...commonProps} />;
      case "scientific":
        return <ScientificCalculator {...commonProps} />;
      default:
        return null;
    }
  };

  return (
    <div id="main-content-area" className="w-full min-h-screen relative">
      <div className="absolute top-4 left-4 z-50">
        <CloseAllButton count={calculators.length} onClick={clearCalculators} />
      </div>
      {calculators.map(renderCalculator)}
    </div>
  );
}
