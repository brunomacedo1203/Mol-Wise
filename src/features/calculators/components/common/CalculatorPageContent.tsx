import { MolarMassCalculator } from "@/features/calculators/components/calculators/molar-mass";
import { useCalculatorInstances } from "@/features/calculators/contexts/CalculatorInstancesContext";
import { CloseAllButton } from "@/shared/components/CloseAllButton";

export function CalculatorPageContent() {
  const { calculators, clearCalculators, removeCalculator, updateCalculator } =
    useCalculatorInstances();

  // Se não houver calculadoras, não renderiza nada
  if (calculators.length === 0) {
    return null;
  }

  return (
    <div id="main-content-area" className="w-full min-h-screen relative">
      <div className="absolute top-4 left-4 z-50">
        <CloseAllButton
          count={calculators.length}
          onClick={clearCalculators}
          label="Fechar calculadoras"
        />
      </div>
      {calculators.map((calculator) => (
        <MolarMassCalculator
          key={calculator.id}
          id={calculator.id}
          onClose={() => removeCalculator(calculator.id)}
          initialPosition={calculator.position}
          onPositionChange={(position) =>
            updateCalculator(calculator.id, { position })
          }
          initialFormula={calculator.state?.formula}
          onFormulaChange={(formula) =>
            updateCalculator(calculator.id, {
              state: { ...calculator.state, formula },
            })
          }
          initialResult={calculator.state?.result}
          onResultChange={(result) =>
            updateCalculator(calculator.id, {
              state: { ...calculator.state, result },
            })
          }
          isKeyboardVisible={calculator.state?.isKeyboardVisible}
          onKeyboardVisibilityChange={(isKeyboardVisible) =>
            updateCalculator(calculator.id, {
              state: { ...calculator.state, isKeyboardVisible },
            })
          }
        />
      ))}
    </div>
  );
}
