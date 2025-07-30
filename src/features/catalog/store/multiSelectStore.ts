import { create } from "zustand";
import { persist } from "zustand/middleware";

interface MultiSelectState {
  // Estado dos popovers por ID único
  openPopovers: Record<string, boolean>;
  
  // Valores selecionados por ID único
  selectedValues: Record<string, string[]>;
  
  // Ações
  setPopoverOpen: (id: string, isOpen: boolean) => void;
  setSelectedValues: (id: string, values: string[]) => void;
  togglePopover: (id: string) => void;
  clearSelectedValues: (id: string) => void;
  resetAll: () => void;
}

export const useMultiSelectStore = create<MultiSelectState>()(
  persist(
    (set) => ({
      openPopovers: {},
      selectedValues: {},
      
      setPopoverOpen: (id: string, isOpen: boolean) =>
        set((state) => ({
          openPopovers: {
            ...state.openPopovers,
            [id]: isOpen,
          },
        })),
        
      setSelectedValues: (id: string, values: string[]) =>
        set((state) => ({
          selectedValues: {
            ...state.selectedValues,
            [id]: values,
          },
        })),
        
      togglePopover: (id: string) =>
        set((state) => ({
          openPopovers: {
            ...state.openPopovers,
            [id]: !state.openPopovers[id],
          },
        })),
        
      clearSelectedValues: (id: string) =>
        set((state) => ({
          selectedValues: {
            ...state.selectedValues,
            [id]: [],
          },
        })),
        
      resetAll: () =>
        set({
          openPopovers: {},
          selectedValues: {},
        }),
    }),
    {
      name: "multi-select-store",
      // Persistir apenas os valores selecionados, não o estado dos popovers
      partialize: (state) => ({
        selectedValues: state.selectedValues,
      }),
    }
  )
); 