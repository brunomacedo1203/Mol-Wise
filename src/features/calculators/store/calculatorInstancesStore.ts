import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CalculatorInstance, CalculatorType } from "../domain/types/calculator";
import type { Position, PositionWithWidth } from "../domain/types";

interface CalculatorInstancesState {
  calculators: CalculatorInstance[];
  addCalculator: (type: CalculatorType, position?: Position) => void;
  removeCalculator: (id: number) => void;
  updateCalculator: (id: number, updates: Partial<CalculatorInstance>) => void;
  clearCalculators: () => void;
}

export const useCalculatorInstancesStore = create<CalculatorInstancesState>()(
  persist(
    (set, get) => ({
      calculators: [],
      addCalculator: (type, position) => {
        const defaultPosition: PositionWithWidth = {
          x: 100,
          y: 100,
          width: 500,
        };
        const calculators = get().calculators;
        const nextId = calculators.length > 0 ? Math.max(...calculators.map(c => c.id)) + 1 : 1;
        const newCalculator: CalculatorInstance = {
          id: nextId,
          type,
          position: { ...defaultPosition, ...position },
          state: { formula: "", result: null, isKeyboardVisible: true },
        };
        set({ calculators: [...calculators, newCalculator] });
      },
      removeCalculator: (id) => {
        set((state) => ({ calculators: state.calculators.filter((calc) => calc.id !== id) }));
      },
      updateCalculator: (id, updates) => {
        set((state) => ({
          calculators: state.calculators.map((calc) =>
            calc.id === id ? { ...calc, ...updates } : calc
          ),
        }));
      },
      clearCalculators: () => set({ calculators: [] }),
    }),
    { name: "molwise_calculator_instances" }
  )
); 