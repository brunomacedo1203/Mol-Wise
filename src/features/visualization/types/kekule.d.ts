declare global {
    interface Window {
      Kekule: {
        ChemWidget: {
          Viewer: new (container: HTMLElement) => KekuleViewer;
        };
        IO: {
          loadFormatData: (data: string, format: string) => KekuleMolecule;
        };
      };
    }
  
    interface KekuleMolecule {
      [key: string]: unknown;
    }
  
    interface KekuleViewer {
      setEnableToolbar: (enabled: boolean) => void;
      setEnableDirectInteraction: (enabled: boolean) => void;
      setPadding: (padding: { top: number; right: number; bottom: number; left: number }) => void;
      setChemObj: (obj: KekuleMolecule) => void;
      zoomToFit?: () => void;
      finalize?: () => void;
    }
  }
  
  export {};
  