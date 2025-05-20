"use client";
import { useState, useRef } from "react";
import { SubtitleProvider } from "@/shared/contexts/SubtitleContext";
import Page from "@/shared/components/Page";

// Types
type CalculatorType = "molar-mass";
interface CalculatorInstance {
  id: number;
  type: CalculatorType;
}

function CalculatorRenderer({ type }: { type: CalculatorType }) {
  switch (type) {
    case "molar-mass":
      // Não precisa importar CalculatorContainer aqui!
      const MolarMassCalculator =
        require("@/features/calculators/components/MolarMassCalculator").default;
      return <MolarMassCalculator />;
    default:
      return null;
  }
}

export default function CalculatorsPage() {
  const [instances, setInstances] = useState<CalculatorInstance[]>([]);
  const nextId = useRef(1);

  const addCalculator = (type: CalculatorType) => {
    setInstances((prev) => [...prev, { id: nextId.current++, type }]);
  };

  const removeCalculator = (id: number) => {
    setInstances((prev) => prev.filter((calc) => calc.id !== id));
  };

  return (
    <SubtitleProvider subtitle="Abra múltiplas instâncias de calculadoras na mesma página.">
      <Page title="Calculadoras">
        <div className="w-full min-h-screen flex flex-col items-center py-8">
          <button
            className="mb-6 px-4 py-2 rounded-xl bg-blue-600 text-white"
            onClick={() => addCalculator("molar-mass")}
          >
            Nova Calculadora de Massa Molar
          </button>
          <div className="flex flex-wrap justify-center gap-8 w-full max-w-5xl">
            {instances.map((instance) => (
              // RENDERIZE SOMENTE O CalculatorRenderer AQUI!
              <div key={instance.id}>
                <CalculatorRenderer type={instance.type} />
              </div>
            ))}
          </div>
        </div>
      </Page>
    </SubtitleProvider>
  );
}
