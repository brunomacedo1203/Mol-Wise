import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CalculatorHistoryState {
  // Mapa de visibilidade do histórico por ID da calculadora
  historyVisibility: Record<number, boolean>;
  
  // Ações
  setHistoryVisibility: (calculatorId: number, isVisible: boolean) => void;
  toggleHistoryVisibility: (calculatorId: number) => void;
  resetHistoryVisibility: (calculatorId: number) => void;
}

export const useCalculatorHistoryStore = create<CalculatorHistoryState>()(
  persist(
    (set) => ({
      historyVisibility: {},
      
      setHistoryVisibility: (calculatorId, isVisible) =>
        set((state) => ({
          historyVisibility: {
            ...state.historyVisibility,
            [calculatorId]: isVisible,
          },
        })),
      
      toggleHistoryVisibility: (calculatorId) =>
        set((state) => ({
          historyVisibility: {
            ...state.historyVisibility,
            [calculatorId]: !state.historyVisibility[calculatorId],
          },
        })),
      
      resetHistoryVisibility: (calculatorId) =>
        set((state) => {
          const { [calculatorId]: _, ...rest } = state.historyVisibility;
          return { historyVisibility: rest };
        }),
    }),
    {
      name: "molwise_calculator_history", // chave do localStorage
    }
  )
);