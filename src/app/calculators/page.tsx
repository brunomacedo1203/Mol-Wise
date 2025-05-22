"use client";
import { SubtitleProvider } from "@/shared/contexts/SubtitleContext";
import Page from "@/shared/components/Page";
import { useCalculatorInstances } from "@/features/calculators/contexts/CalculatorInstancesContext";
import MolarMassCalculator from "@/features/calculators/components/MolarMassCalculator";

type CalculatorType = "molar-mass";

function CalculatorRenderer({
  type,
  onClose,
}: {
  type: CalculatorType;
  onClose?: () => void;
}) {
  switch (type) {
    case "molar-mass":
      return <MolarMassCalculator onClose={onClose} />;
    default:
      return null;
  }
}

export default function CalculatorsPage() {
  const { calculators, removeCalculator } = useCalculatorInstances();

  return (
    <SubtitleProvider subtitle="Open one or more calculators from the menu.">
      <Page title="Calculadoras">
        <div className="w-full min-h-screen flex flex-col items-center py-8">
          <div className="flex flex-wrap justify-center gap-8 w-full max-w-5xl">
            {calculators.map((instance) => (
              <div key={instance.id} className="relative">
                <CalculatorRenderer
                  type={instance.type}
                  onClose={() => removeCalculator(instance.id)}
                />
              </div>
            ))}
          </div>
        </div>
      </Page>
    </SubtitleProvider>
  );
}
