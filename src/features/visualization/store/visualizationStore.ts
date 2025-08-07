import { create } from "zustand";

interface VisualizationState {
  query: string;
  smilesData: string;
  sdfData: string;
  viewMode: "2D" | "3D";
  setQuery: (value: string) => void;
  setSmilesData: (data: string) => void;
  setSdfData: (data: string) => void;
  setViewMode: (mode: "2D" | "3D") => void;
}

export const useVisualizationStore = create<VisualizationState>((set) => ({
  query: "",
  smilesData: "",
  sdfData: "",
  viewMode: "2D",
  setQuery: (value) => set({ query: value }),
  setSmilesData: (data) => set({ smilesData: data }),
  setSdfData: (data) => set({ sdfData: data }),
  setViewMode: (mode) => set({ viewMode: mode }),
}));
