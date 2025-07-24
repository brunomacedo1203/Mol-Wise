import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Element } from "../domain/types/element";
import type { PeriodicTableConfig } from "../domain/types/config";
import { defaultConfig } from "../domain/types/config";

type HighlightSource = "hover" | "search" | "click" | null;

interface PeriodicTableState {
  selectedElement: Element | null;
  setSelectedElement: (element: Element | null) => void;

  highlightedElement: Element | null;
  highlightSource: HighlightSource;
  setHighlight: (element: Element | null, source: HighlightSource) => void;

  config: PeriodicTableConfig;
  setConfig: (config: Partial<PeriodicTableConfig>) => void;

  filters: string[];
  setFilters: (filters: string[]) => void;
}

export const usePeriodicTableStore = create<PeriodicTableState>()(
  persist(
    (set) => ({
      selectedElement: null,
      setSelectedElement: (element) => set({ selectedElement: element }),

      // sistema de highlight
      highlightedElement: null,
      highlightSource: null,
      setHighlight: (element, source) =>
        set({ highlightedElement: element, highlightSource: source }),

      config: defaultConfig,
      setConfig: (config) =>
        set((state) => ({ config: { ...state.config, ...config } })),

      filters: [],
      setFilters: (filters) => set({ filters }),
    }),
    { name: "molwise_periodic_table" }
  )
);
