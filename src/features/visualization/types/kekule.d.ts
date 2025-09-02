declare module 'kekule' {
  export namespace Kekule {
    export namespace Chem {
      export class Molecule {
        constructor();
        static fromSmiles(smiles: string): Molecule;
        static fromMolfile(molfile: string): Molecule;
        toSmiles(): string;
        toMolfile(): string;
        getAtomCount(): number;
        getBondCount(): number;
      }

      export class Atom {
        constructor();
        setElement(element: string): void;
        getElement(): string;
        setCoord2D(x: number, y: number): void;
        getCoord2D(): { x: number; y: number };
        setCharge(charge: number): void;
        getCharge(): number;
      }

      export class Bond {
        constructor();
        setOrder(order: number): void;
        getOrder(): number;
        setSourceAtom(atom: Atom): void;
        setTargetAtom(atom: Atom): void;
        getSourceAtom(): Atom;
        getTargetAtom(): Atom;
      }
    }

    export namespace Render {
      export class ChemSpacePainter {
        constructor();
        setRenderMode(mode: string): void;
        setAtomColorScheme(scheme: string): void;
        setBondColorScheme(scheme: string): void;
        setAtomRadius(radius: number): void;
        setBondWidth(width: number): void;
        paint(molecule: Chem.Molecule, canvas: any): void;
      }

      export class ChemSpaceEditor {
        constructor();
        setEditMode(mode: string): void;
        setMolecule(molecule: Chem.Molecule): void;
        setCanvas(canvas: any): void;
        enableTool(toolName: string, enabled: boolean): void;
        on(eventName: string, callback: (...args: unknown[]) => void): void;
        off(eventName: string, callback: (...args: unknown[]) => void): void;
      }
    }

    export namespace Widget {
      export class ChemSpaceWidget {
        constructor(container: HTMLElement);
        setMolecule(molecule: Chem.Molecule): void;
        getMolecule(): Chem.Molecule;
        setRenderMode(mode: string): void;
        setEditMode(mode: string): void;
        enableTool(toolName: string, enabled: boolean): void;
        on(eventName: string, callback: (...args: unknown[]) => void): void;
        off(eventName: string, callback: (...args: unknown[]) => void): void;
        repaint(): void;
      }
    }

    export namespace Style {
      export const RenderMode: {
        COMPLETE: string;
        BALL_STICK: string;
        SKELETON: string;
        WIREFRAME: string;
      };

      export const AtomColorScheme: {
        ELEMENT: string;
        CUSTOM: string;
      };

      export const BondColorScheme: {
        DEFAULT: string;
        CUSTOM: string;
      };
    }

    export namespace EditMode {
  export const SELECT: string;
  export const DRAW: string;
  export const ERASE: string;
  export const ROTATE: string;
  export const MOVE: string;
}
  }

  export default Kekule;
}
