// Type declarations for kekule module
declare module 'kekule' {
  export interface ChemicalObject {
    [key: string]: unknown;
  }

  export interface ViewerWidget {
    setPredefinedSetting(setting: string): void;
    setEnableToolbar(enabled: boolean): void;
    setEnableEdit(enabled: boolean): void;
    setChemObj(obj: ChemicalObject): void;
    setViewSize(size: { width: string | number; height: string | number }): void;
    finalize?(): void;
    [key: string]: unknown;
  }

  export interface ChemWidgetNamespace {
    Viewer: new (container: HTMLElement) => ViewerWidget;
    [key: string]: unknown;
  }

  export interface IONamespace {
    loadFormatData(data: string, format: string): ChemicalObject;
    [key: string]: unknown;
  }

  export const Kekule: {
    ChemWidget: ChemWidgetNamespace;
    IO: IONamespace;
    [key: string]: unknown;
  };

  // Default export
  export default Kekule;
}

// Global window extension for Kekule
declare global {
  interface Window {
    Kekule?: {
      ChemWidget: {
        Viewer: new (container: HTMLElement) => ViewerWidget;
        [key: string]: unknown;
      };
      IO: {
        loadFormatData(data: string, format: string): ChemicalObject;
        [key: string]: unknown;
      };
      [key: string]: unknown;
    };
  }
}