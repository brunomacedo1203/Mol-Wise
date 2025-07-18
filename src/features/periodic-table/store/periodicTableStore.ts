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
  filter: string; // filtro atual
  setFilter: (filter: string) => void; // função para atualizar o filtro
}

export const usePeriodicTableStore = create<PeriodicTableState>()(
  persist(
    (set) => ({
      selectedElement: null,
      setSelectedElement: (element) => set({ selectedElement: element }),
      config: defaultConfig,
      setConfig: (config) => set((state) => ({ config: { ...state.config, ...config } })),
      filter: "all", // valor padrão do filtro
      setFilter: (filter) => set({ filter }),
    }),
    { name: "molwise_periodic_table" }
  )
); 