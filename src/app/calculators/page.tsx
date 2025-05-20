"use client";
import { SubtitleProvider } from "@/shared/contexts/SubtitleContext";
import Page from "@/shared/components/Page";
import { useCalculatorInstances } from "@/features/calculators/contexts/CalculatorInstancesContext";
import MolarMassCalculator from "@/features/calculators/components/MolarMassCalculator";

type CalculatorType = "molar-mass";
interface CalculatorInstance {
  id: number;
  type: CalculatorType;
}

function CalculatorRenderer({ type }: { type: CalculatorType }) {
  switch (type) {
    case "molar-mass":
      return <MolarMassCalculator />;
    default:
      return null;
  }
}

export default function CalculatorsPage() {
  const { calculators, removeCalculator } = useCalculatorInstances();

  return (
    <SubtitleProvider subtitle="Abra múltiplas instâncias de calculadoras na mesma página.">
      <Page title="Calculadoras">
        <div className="w-full min-h-screen flex flex-col items-center py-8">
          <div className="flex flex-wrap justify-center gap-8 w-full max-w-5xl">
            {calculators.map((instance) => (
              <div key={instance.id} className="relative">
                <CalculatorRenderer type={instance.type} />
                <button
                  className="absolute top-2 right-2 z-10 px-2 py-1 rounded bg-red-500 text-white text-xs"
                  onClick={() => removeCalculator(instance.id)}
                  title="Fechar calculadora"
                >
                  Fechar
                </button>
              </div>
            ))}
          </div>
        </div>
      </Page>
    </SubtitleProvider>
  );
}
