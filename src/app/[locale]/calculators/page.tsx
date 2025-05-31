"use client";
import { useCalculatorInstances } from "@/features/calculators/contexts/CalculatorInstancesContext";
import MolarMassCalculator from "@/features/calculators/components/calculators/molar-mass/MolarMassCalculator";
import { SubtitleProvider } from "@/shared/contexts/SubtitleContext";
import Page from "@/shared/components/Page";
import { useTranslations } from "next-intl";
import { useEffect } from "react";
import { PositionWithWidth } from "@/features/calculators/domain/types/position";

export default function CalculatorsPage() {
  const t = useTranslations("calculators");
  const { calculators, addCalculator, removeCalculator, updateCalculator } =
    useCalculatorInstances();

  // Adiciona uma calculadora quando a página é carregada
  useEffect(() => {
    if (calculators.length === 0) {
      addCalculator("molar-mass", { x: 100, y: 100 });
    }
  }, [addCalculator, calculators.length]);

  // Se não houver calculadora, não renderiza nada
  if (calculators.length === 0) {
    return null;
  }

  const calculator = calculators[0];

  return (
    <SubtitleProvider subtitle={t("subtitle")}>
      <Page title={t("title")}>
        <div id="main-content-area" className="w-full min-h-screen relative">
          <MolarMassCalculator
            id={calculator.id}
            onClose={() => removeCalculator(calculator.id)}
            initialPosition={calculator.position}
            onPositionChange={(position: PositionWithWidth) =>
              updateCalculator(calculator.id, { position })
            }
            initialFormula={calculator.state?.formula}
            onFormulaChange={(formula: string) =>
              updateCalculator(calculator.id, {
                state: { ...calculator.state, formula },
              })
            }
            initialResult={calculator.state?.result}
            onResultChange={(result: string | null) =>
              updateCalculator(calculator.id, {
                state: { ...calculator.state, result },
              })
            }
            isKeyboardVisible={calculator.state?.isKeyboardVisible}
            onKeyboardVisibilityChange={(isKeyboardVisible: boolean) =>
              updateCalculator(calculator.id, {
                state: { ...calculator.state, isKeyboardVisible },
              })
            }
          />
        </div>
      </Page>
    </SubtitleProvider>
  );
}
