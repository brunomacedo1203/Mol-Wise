// src/features/visualization/types/3dmol.d.ts

// Tipos para o 3Dmol.js
export interface MolView {
  [key: string]: unknown;
}

export interface ThreeDMolViewer {
  clear: () => void;
  addModel: (data: string, format: "sdf" | "mol" | "xyz") => void;
  setStyle: (
    sel: Record<string, unknown>,
    style: Record<string, unknown>
  ) => void;
  zoomTo: () => void;
  render: () => void;
  zoom: (factor: number) => void;
  rotate: (angle: number, axis: [number, number, number]) => void;
  translate: (x: number, y: number, z: number) => void;
  getZoom?: () => number;
  setBackgroundColor: (color: string) => void;

  // Métodos para salvar/restaurar a visão
  getView?: () => MolView;
  setView: (view: MolView) => void;
}

export interface ThreeDMolNamespace {
  createViewer: (
    element: HTMLElement,
    options?: {
      backgroundColor?: string;
      backgroundAlpha?: number;
      [key: string]: unknown;
    }
  ) => ThreeDMolViewer;
}

declare global {
  interface Window {
    $3Dmol?: ThreeDMolNamespace;
  }
}

export {};
