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
  resetCalculatorState: (id: number) => void;
}

export const useCalculatorInstancesStore = create<CalculatorInstancesState>()(
  persist(
    (set, _get) => ({
      calculators: [],
      addCalculator: (type, position) => {
        const defaultPosition: PositionWithWidth = {
          x: 100,
          y: 100,
          width: 460,
        };
        set((state) => {
          const nextId = state.calculators.length > 0
            ? Math.max(...state.calculators.map((c) => c.id)) + 1
            : 1;
          const newCalculator: CalculatorInstance = {
            id: nextId,
            type,
            position: { ...defaultPosition, ...position },
            state: { formula: "", result: null, isKeyboardVisible: true },
          };
          return { calculators: [...state.calculators, newCalculator] };
        });
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
      resetCalculatorState: (id: number) => {
        set((state) => ({
          calculators: state.calculators.map((calc) =>
            calc.id === id 
              ? { 
                  ...calc, 
                  state: { 
                    ...calc.state, 
                    formula: "", 
                    result: null 
                  } 
                } 
              : calc
          ),
        }));
      },
    }),
    {
      name: "molclass_calculator_instances",
      // Hidratar automaticamente ao montar, garantindo que navegações (ex.: troca de idioma)
      // restaurem as instâncias existentes do localStorage
      partialize: (state) => ({ calculators: state.calculators }),
    }
  )
);
