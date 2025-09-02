declare module 'kekule' {
  // Tipos auxiliares para melhor tipagem
  export type KekuleCanvas = HTMLCanvasElement | SVGSVGElement | HTMLElement;
  export type KekuleEventCallback<T = unknown> = (event: T) => void;
  export type KekuleCoordinate = { x: number; y: number };
  
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
        getNodeCount(): number;
        getBonds(): Bond[];
        getNodes(): Atom[];
        clone(): Molecule;
      }

      export class Atom {
        constructor();
        setElement(element: string): void;
        getElement(): string;
        setCoord2D(x: number, y: number): void;
        getCoord2D(): KekuleCoordinate;
        setCharge(charge: number): void;
        getCharge(): number;
        getId(): string;
        setId(id: string): void;
      }

      export class Bond {
        constructor();
        setOrder(order: number): void;
        getOrder(): number;
        setSourceAtom(atom: Atom): void;
        setTargetAtom(atom: Atom): void;
        getSourceAtom(): Atom;
        getTargetAtom(): Atom;
        getId(): string;
        setId(id: string): void;
      }
    }

    export namespace Render {
      export interface RenderOptions {
        atomRadius?: number;
        bondWidth?: number;
        backgroundColor?: string;
        atomColorScheme?: string;
        bondColorScheme?: string;
      }

      export class ChemSpacePainter {
        constructor(options?: RenderOptions);
        setRenderMode(mode: string): void;
        setAtomColorScheme(scheme: string): void;
        setBondColorScheme(scheme: string): void;
        setAtomRadius(radius: number): void;
        setBondWidth(width: number): void;
        paint(molecule: Chem.Molecule, canvas: KekuleCanvas): void;
        setOptions(options: RenderOptions): void;
        getOptions(): RenderOptions;
      }

      export interface EditorEvent {
        type: string;
        target: ChemSpaceEditor;
        data?: unknown;
      }

      export class ChemSpaceEditor {
        constructor(options?: RenderOptions);
        setEditMode(mode: string): void;
        setMolecule(molecule: Chem.Molecule | null): void;
        getMolecule(): Chem.Molecule | null;
        setCanvas(canvas: KekuleCanvas): void;
        enableTool(toolName: string, enabled: boolean): void;
        on(eventName: string, callback: KekuleEventCallback<EditorEvent>): void;
        off(eventName: string, callback: KekuleEventCallback<EditorEvent>): void;
        clear(): void;
        undo(): void;
        redo(): void;
      }
    }

    export namespace Widget {
      export interface WidgetEvent {
        type: string;
        target: ChemSpaceWidget;
        molecule?: Chem.Molecule;
        data?: unknown;
      }

      export interface WidgetOptions {
        width?: number;
        height?: number;
        renderMode?: string;
        editMode?: string;
        enabledTools?: string[];
      }

      export class ChemSpaceWidget {
        constructor(container: HTMLElement, options?: WidgetOptions);
        setMolecule(molecule: Chem.Molecule | null): void;
        getMolecule(): Chem.Molecule | null;
        getChemObj(): Chem.Molecule | null;
        setChemObj(molecule: Chem.Molecule | null): void;
        setRenderMode(mode: string): void;
        getRenderMode(): string;
        setEditMode(mode: string): void;
        getEditMode(): string;
        enableTool(toolName: string, enabled: boolean): void;
        isToolEnabled(toolName: string): boolean;
        on(eventName: string, callback: KekuleEventCallback<WidgetEvent>): void;
        off(eventName: string, callback: KekuleEventCallback<WidgetEvent>): void;
        repaint(): void;
        clear(): void;
        getEditController(): Render.ChemSpaceEditor;
        getPainter(): Render.ChemSpacePainter;
        setDimension(width: number, height: number): void;
        getDimension(): { width: number; height: number };
      }
    }

    export namespace Style {
      export const RenderMode: {
        readonly COMPLETE: string;
        readonly BALL_STICK: string;
        readonly SKELETON: string;
        readonly WIREFRAME: string;
        readonly SPACE_FILL: string;
      };

      export const AtomColorScheme: {
        readonly ELEMENT: string;
        readonly CUSTOM: string;
        readonly MONOCHROME: string;
      };

      export const BondColorScheme: {
        readonly DEFAULT: string;
        readonly CUSTOM: string;
        readonly MONOCHROME: string;
      };

      export const AtomDisplayStyle: {
        readonly ELEMENT_SYMBOL: string;
        readonly BALL: string;
        readonly DOT: string;
      };

      export const BondDisplayStyle: {
        readonly LINE: string;
        readonly STICK: string;
        readonly TUBE: string;
      };
    }

    export namespace EditMode {
      export const SELECT: string;
      export const DRAW: string;
      export const ERASE: string;
      export const ROTATE: string;
      export const MOVE: string;
      export const ZOOM: string;
      export const PAN: string;
    }

    export namespace Tool {
      export const SELECT: string;
      export const ATOM: string;
      export const BOND: string;
      export const RING: string;
      export const CHARGE: string;
      export const ERASE: string;
      export const ROTATE: string;
      export const MOVE: string;
      export const ZOOM_IN: string;
      export const ZOOM_OUT: string;
    }

    // Tipos para configuração e eventos comuns
    export interface KekuleConfig {
      renderMode?: string;
      editMode?: string;
      enabledTools?: string[];
      atomColorScheme?: string;
      bondColorScheme?: string;
      width?: number;
      height?: number;
    }

    export interface MoleculeChangeEvent {
      type: 'moleculeChange';
      molecule: Chem.Molecule | null;
      source: Widget.ChemSpaceWidget | Render.ChemSpaceEditor;
    }

    export interface ToolChangeEvent {
      type: 'toolChange';
      tool: string;
      enabled: boolean;
      source: Widget.ChemSpaceWidget | Render.ChemSpaceEditor;
    }

    export interface EditModeChangeEvent {
      type: 'editModeChange';
      mode: string;
      source: Widget.ChemSpaceWidget | Render.ChemSpaceEditor;
    }

    // Utilitários para validação e conversão
    export namespace Utils {
      export function isValidSmiles(smiles: string): boolean;
      export function isValidMolfile(molfile: string): boolean;
      export function validateMolecule(molecule: Chem.Molecule): boolean;
    }
  }

  export default Kekule;
}