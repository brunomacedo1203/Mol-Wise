"use client";

import React, { createContext, useContext, useState } from "react";

type CalculatorType = "molar-mass";

interface Position {
  x: number;
  y: number;
  width?: number;
  height?: number;
}

interface CalculatorState {
  formula?: string;
  result?: string | null;
  error?: string | null;
  isKeyboardVisible?: boolean;
}

interface CalculatorInstance {
  id: number;
  type: CalculatorType;
  position?: Position;
  state?: CalculatorState;
}

interface CalculatorInstancesProviderProps {
  children: React.ReactNode;
}

const CalculatorInstancesContext = createContext<{
  calculators: CalculatorInstance[];
  addCalculator: (type: CalculatorType, position?: Position) => void;
  removeCalculator: (id: number) => void;
  updateCalculator: (id: number, updates: Partial<CalculatorInstance>) => void;
  clearCalculators: () => void;
}>({ 
  calculators: [], 
  addCalculator: () => {}, 
  removeCalculator: () => {},
  updateCalculator: () => {},
  clearCalculators: () => {}
});

export const CalculatorInstancesProvider = ({
  children,
}: CalculatorInstancesProviderProps) => {
  // Initialize nextId from localStorage or default to 1
  const initialNextId = React.useRef(
    typeof window !== 'undefined'
      ? (() => {
          const saved = localStorage.getItem('calculatorInstances');
          if (saved) {
            const parsed = JSON.parse(saved);
            return parsed.nextId || 1;
          }
          return 1;
        })()
      : 1
  );

  // Initialize calculators from localStorage or empty array
  const [calculators, setCalculators] = useState<CalculatorInstance[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('calculatorInstances');
      if (saved) {
        const parsed = JSON.parse(saved);
        return parsed.calculators || [];
      }
    }
    return [];
  });

  const addCalculator = (type: CalculatorType, position?: Position) => {
    setCalculators((prev) => {
      const newCalculators = [...prev, { 
        id: initialNextId.current++, 
        type,
        position: position || { x: 100, y: 100 },
        state: { formula: '', result: null, isKeyboardVisible: true }
      }];
      if (typeof window !== 'undefined') {
        localStorage.setItem('calculatorInstances', JSON.stringify({
          calculators: newCalculators,
          nextId: initialNextId.current
        }));
      }
      return newCalculators;
    });
  };

  const removeCalculator = (id: number) => {
    setCalculators((prev) => {
      const newCalculators = prev.filter((calc) => calc.id !== id);
      if (typeof window !== 'undefined') {
        localStorage.setItem('calculatorInstances', JSON.stringify({
          calculators: newCalculators,
          nextId: initialNextId.current
        }));
      }
      return newCalculators;
    });
  };

  const updateCalculator = (id: number, updates: Partial<CalculatorInstance>) => {
    setCalculators((prev) => {
      const newCalculators = prev.map(calc => 
        calc.id === id ? { ...calc, ...updates } : calc
      );
      if (typeof window !== 'undefined') {
        localStorage.setItem('calculatorInstances', JSON.stringify({
          calculators: newCalculators,
          nextId: initialNextId.current
        }));
      }
      return newCalculators;
    });
  };

  const clearCalculators = () => {
    setCalculators([]);
    if (typeof window !== 'undefined') {
      localStorage.setItem('calculatorInstances', JSON.stringify({
        calculators: [],
        nextId: initialNextId.current
      }));
    }
  };

  return (
    <CalculatorInstancesContext.Provider
      value={{
        calculators,
        addCalculator,
        removeCalculator,
        updateCalculator,
        clearCalculators,
      }}
    >
      {children}
    </CalculatorInstancesContext.Provider>
  );
};

export const useCalculatorInstances = () =>
  useContext(CalculatorInstancesContext);
