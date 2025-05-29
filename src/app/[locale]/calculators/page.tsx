"use client";
import { SubtitleProvider } from "@/shared/contexts/SubtitleContext";
import Page from "@/shared/components/Page";
import { useCalculatorInstances } from "@/features/calculators/contexts/CalculatorInstancesContext";
import MolarMassCalculator from "@/features/calculators/components/MolarMassCalculator";
import { useTranslations } from "next-intl";

type CalculatorType = "molar-mass";

function CalculatorRenderer({
  id,
  type,
  position,
  state,
  onClose,
  onPositionChange,
  onStateChange,
}: {
  id: number;
  type: CalculatorType;
  position?: { x: number; y: number; width?: number };
  state?: { 
    formula?: string; 
    result?: string | null;
    isKeyboardVisible?: boolean 
  };
  onClose?: () => void;
  onPositionChange?: (position: { x: number; y: number; width: number }) => void;
  onStateChange?: (state: { 
    formula?: string; 
    result?: string | null;
    isKeyboardVisible?: boolean 
  }) => void;
}) {
  switch (type) {
    case "molar-mass":
      return (
        <MolarMassCalculator
          id={id}
          onClose={onClose}
          initialPosition={position}
          onPositionChange={onPositionChange}
          initialFormula={state?.formula}
          onFormulaChange={(formula) => onStateChange?.({ ...state, formula })}
          initialResult={state?.result}
          onResultChange={(result) => onStateChange?.({ ...state, result })}
          isKeyboardVisible={state?.isKeyboardVisible}
          onKeyboardVisibilityChange={(isKeyboardVisible) => 
            onStateChange?.({ ...state, isKeyboardVisible })
          }
        />
      );
    default:
      return null;
  }
}

export default function CalculatorsPage() {
  const { calculators, removeCalculator, updateCalculator } = useCalculatorInstances();
  const t = useTranslations("calculators");

  return (
    <SubtitleProvider subtitle={t("subtitle")}>
      <Page title={t("title")}>
        <div id="main-content-area" className="w-full min-h-screen relative">
          {calculators.map((instance) => (
            <div key={instance.id}>
              <CalculatorRenderer
                id={instance.id}
                type={instance.type}
                position={instance.position}
                state={instance.state}
                onClose={() => removeCalculator(instance.id)}
                onPositionChange={(position) => 
                  updateCalculator(instance.id, { position })
                }
                onStateChange={(state) => 
                  updateCalculator(instance.id, { state })
                }
              />
            </div>
          ))}
        </div>
      </Page>
    </SubtitleProvider>
  );
}
