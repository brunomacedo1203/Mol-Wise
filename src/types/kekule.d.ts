// Permite que o objeto global 'window' conheça o namespace Kekule
declare global {
    interface Window {
      Kekule: KekuleLibrary;
    }
  }
  
  // Tipagens para o módulo Kekule.js
  declare module 'kekule' {
    // Interface para o widget principal do Kekule (ChemSpaceWidget)
    export interface KekuleWidget {
      setRenderMode(mode: string): void;
      setEditMode(mode: string): void;
      setMolecule(molecule: KekuleMolecule | null): void;
      enableTool(tool: string, enabled: boolean): void;
      repaint(): void;
      getChemObj(): KekuleMolecule | null;
      setChemObj(molecule: KekuleMolecule | null): void;
      getEditController(): object | null;
      [key: string]: unknown;
    }
  
    // Interface para a estrutura molecular (molécula Kekule)
    export interface KekuleMolecule {
      getNodeCount(): number;
      getBondCount(): number;
      getNodes(): object[];
      getBonds(): object[];
      clone(): KekuleMolecule;
      toSmiles(): string;
      toMolfile(): string;
      getAtomCount(): number;
      [key: string]: unknown;
    }
  
    // Estrutura geral da biblioteca Kekule
    export interface KekuleLibrary {
      Widget: {
        ChemSpaceWidget: new (container: HTMLElement, options?: Record<string, unknown>) => KekuleWidget;
      };
      Style: {
        RenderMode: {
          COMPLETE: string;
          BALL_STICK: string;
          SKELETON: string;
          WIREFRAME: string;
        };
      };
      EditMode: {
        SELECT: string;
      };
      Chem: {
        Molecule: {
          fromMolfile(sdf: string): KekuleMolecule;
          fromSmiles(smiles: string): KekuleMolecule;
        };
      };
    }
  
    const Kekule: KekuleLibrary;
    export default Kekule;
  }
  
  export {};
  