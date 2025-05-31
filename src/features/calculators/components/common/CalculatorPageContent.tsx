import MolarMassCalculator from "@/features/calculators/components/calculators/molar-mass/MolarMassCalculator";
import { useCalculatorPage } from "@/features/calculators/hooks/common/useCalculatorPage";
import { UseCalculatorPageProps } from "@/features/calculators/domain/types/calculator-page";

export function CalculatorPageContent(props: UseCalculatorPageProps) {
  const { calculator, handlers } = useCalculatorPage(props);

  // Se não houver calculadora, não renderiza nada
  if (!calculator) {
    return null;
  }

  return (
    <div id="main-content-area" className="w-full min-h-screen relative">
      <MolarMassCalculator
        id={calculator.id}
        onClose={handlers.onClose}
        initialPosition={calculator.position}
        onPositionChange={handlers.onPositionChange}
        initialFormula={calculator.state?.formula}
        onFormulaChange={handlers.onFormulaChange}
        initialResult={calculator.state?.result}
        onResultChange={handlers.onResultChange}
        isKeyboardVisible={calculator.state?.isKeyboardVisible}
        onKeyboardVisibilityChange={handlers.onKeyboardVisibilityChange}
      />
    </div>
  );
}
