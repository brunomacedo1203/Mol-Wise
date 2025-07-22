import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Element } from "../domain/types/element";
import type { PeriodicTableConfig } from "../domain/types/config";
import { defaultConfig } from "../domain/types/config";

interface PeriodicTableState {
  selectedElement: Element | null;
  setSelectedElement: (element: Element | null) => void;
  config: PeriodicTableConfig;
  setConfig: (config: Partial<PeriodicTableConfig>) => void;
  filters: string[]; // array de filtros agora!
  setFilters: (filters: string[]) => void; // função para atualizar os filtros
}

export const usePeriodicTableStore = create<PeriodicTableState>()(
  persist(
    (set) => ({
      selectedElement: null,
      setSelectedElement: (element) => set({ selectedElement: element }),
      config: defaultConfig,
      setConfig: (config) =>
        set((state) => ({ config: { ...state.config, ...config } })),
      filters: [], // começa sem filtros selecionados
      setFilters: (filters) => set({ filters }),
    }),
    { name: "molwise_periodic_table" }
  )
);
