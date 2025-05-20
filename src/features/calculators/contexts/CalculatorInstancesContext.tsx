"use client";

import React, { createContext, useContext, useState } from "react";

type CalculatorType = "molar-mass";
interface CalculatorInstance {
  id: number;
  type: CalculatorType;
}

interface CalculatorInstancesProviderProps {
  children: React.ReactNode;
}

const CalculatorInstancesContext = createContext<{
  calculators: CalculatorInstance[];
  addCalculator: (type: CalculatorType) => void;
  removeCalculator: (id: number) => void;
}>({ calculators: [], addCalculator: () => {}, removeCalculator: () => {} });

export const CalculatorInstancesProvider = ({
  children,
}: CalculatorInstancesProviderProps) => {
  const [calculators, setCalculators] = useState<CalculatorInstance[]>([]);
  const nextId = React.useRef(1);

  const addCalculator = (type: CalculatorType) =>
    setCalculators((prev) => [...prev, { id: nextId.current++, type }]);

  const removeCalculator = (id: number) =>
    setCalculators((prev) => prev.filter((calc) => calc.id !== id));

  return (
    <CalculatorInstancesContext.Provider
      value={{ calculators, addCalculator, removeCalculator }}
    >
      {children}
    </CalculatorInstancesContext.Provider>
  );
};

export const useCalculatorInstances = () =>
  useContext(CalculatorInstancesContext);
