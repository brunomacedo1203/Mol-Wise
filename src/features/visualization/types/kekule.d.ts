export type KekuleChemObject = object;

export interface KekuleChemViewer {
  setRenderType: (type: "2D" | "3D") => void;
  setChemObj: (obj: KekuleChemObject) => void;
  setToolButtonsVisible?: (visible: boolean) => void;
  setEnableToolbar?: (enabled: boolean) => void;
  setMolDisplayType?: (type: string) => void;
  setAutoAdjustAspect?: (v: boolean) => void;
  setZoom?: (z: number) => void;
  finalize?: () => void;
}

export interface KekuleIO {
  loadFormatData: (data: string, format: "smi" | "mol" | "sdf") => KekuleChemObject;
}

export interface KekuleNamespace {
  IO: KekuleIO;
  ChemWidget: {
    Viewer: new (
      container: HTMLElement,
      options?: { renderType?: "2D" | "3D" }
    ) => KekuleChemViewer;
  };
}

declare global {
  interface Window {
    Kekule?: KekuleNamespace;
  }
}

export {};
