// Torna este .d.ts um MÓDULO (exports em topo) e, ao mesmo tempo, faz augmentation do window.

export interface ThreeDMolViewer {
  clear: () => void;
  addModel: (data: string, format: "sdf" | "mol" | "xyz") => void;
  setStyle: (
    sel: Record<string, unknown>,
    style: Record<string, unknown>
  ) => void;
  zoomTo: () => void;
  render: () => void;
}

export interface ThreeDMolNamespace {
  createViewer: (
    element: HTMLElement,
    options?: Record<string, unknown>
  ) => ThreeDMolViewer;
}

declare global {
  interface Window {
    $3Dmol?: ThreeDMolNamespace;
  }
}

export {};
