import { create } from "zustand";

type ViewMode = "2D" | "3D";

interface VisualizationState {
  viewMode: ViewMode;
  smilesData: string | null;
  sdfData: string | null;
  setViewMode: (m: ViewMode) => void;
  setSmilesData: (s: string | null) => void;
  setSdfData: (s: string | null) => void;
}

export const useVisualizationStore = create<VisualizationState>((set) => ({
  viewMode: "2D",
  smilesData: null,
  sdfData: null,
  setViewMode: (m) => set({ viewMode: m }),
  setSmilesData: (s) => set({ smilesData: s }),
  setSdfData: (s) => set({ sdfData: s }),
}));
