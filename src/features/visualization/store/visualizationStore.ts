// src/features/visualization/store/visualizationStore.ts
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { ViewBox } from "../types/viewer2d.types";
import type { MolView } from "../types/3dmol";

type ViewMode = "2D" | "3D";
type MolKey = string; // e.g., smiles:<str> or sdf:<hash>
type RendererEngine = 'openchemlib' | 'kekule';

interface VisualizationState {
  viewMode: ViewMode;
  smilesData: string | null;
  sdfData: string | null;
  renderer: RendererEngine;

  // Estado persistente de visualização
  currentMolKey: MolKey | null;
  zoom2DByMol: Record<MolKey, ViewBox>;
  view3DByMol: Record<MolKey, MolView>;

  setViewMode: (m: ViewMode) => void;
  setSmilesData: (s: string | null) => void;
  setSdfData: (s: string | null) => void;
  setRenderer: (r: RendererEngine) => void;

  setCurrentMolKey: (k: MolKey | null) => void;
  setZoom2D: (k: MolKey, vb: ViewBox) => void;
  setView3D: (k: MolKey, v: MolView) => void;
  getZoom2D: (k: MolKey) => ViewBox | null;
  getView3D: (k: MolKey) => MolView | null;
}

export const useVisualizationStore = create<VisualizationState>()(
  persist(
    (set, get) => ({
      viewMode: "2D",
      smilesData: null,
      sdfData: null,
      renderer: 'openchemlib',

      currentMolKey: null,
      zoom2DByMol: {},
      view3DByMol: {},

      setViewMode: (m) => set({ viewMode: m }),
      setSmilesData: (s) => set({ smilesData: s }),
      setSdfData: (s) => set({ sdfData: s }),
      setRenderer: (r) => set({ renderer: r }),

      setCurrentMolKey: (k) => set({ currentMolKey: k }),
      setZoom2D: (k, vb) =>
        set((st) => ({ zoom2DByMol: { ...st.zoom2DByMol, [k]: vb } })),
      setView3D: (k, v) =>
        set((st) => ({ view3DByMol: { ...st.view3DByMol, [k]: v } })),

      getZoom2D: (k) => get().zoom2DByMol[k] ?? null,
      getView3D: (k) => get().view3DByMol[k] ?? null,
    }),
    {
      name: "mw-visualization-zoom",
      storage: createJSONStorage(() => localStorage),
      // Persistimos apenas o que interessa
      partialize: (st) => ({
        zoom2DByMol: st.zoom2DByMol,
        view3DByMol: st.view3DByMol,
      }),
    }
  )
);
