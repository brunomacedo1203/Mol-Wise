// features/periodic-table/store/periodicTableStore.ts
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

// Timeout externo para controle do efeito temporário
let searchHighlightTimeout: ReturnType<typeof setTimeout>;

export const usePeriodicTableStore = create<PeriodicTableState>()(
  persist(
    (set) => ({
      selectedElement: null,
      setSelectedElement: (element) => set({ selectedElement: element }),

      highlightedElement: null,
      highlightSource: null,

      setHighlight: (element, source) => {
        set({ highlightedElement: element, highlightSource: source });

        // 🔄 Comportamento de destaque temporário para buscas
        if (source === "search") {
          clearTimeout(searchHighlightTimeout);
          searchHighlightTimeout = setTimeout(() => {
            set({ highlightedElement: null, highlightSource: null });
          }, 2000); // ⏱️ tempo do efeito: 2 segundos
        }
      },

      config: defaultConfig,
      setConfig: (config) =>
        set((state) => ({ config: { ...state.config, ...config } })),

      filters: [],
      setFilters: (filters) => set({ filters }),
    }),
    {
      name: "molwise_periodic_table",
    }
  )
);
