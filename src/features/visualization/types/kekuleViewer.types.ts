export type RenderStyle = 'complete' | 'ballStick' | 'skeleton' | 'wireframe';

export type EditTool = 'select' | 'draw' | 'erase' | 'rotate' | 'move';

// Kekule library types
export interface KekuleMolecule {
  getNodeCount(): number;
  getBondCount(): number;
  getNodes(): unknown[];
  getBonds(): unknown[];
  clone(): KekuleMolecule;
  [key: string]: unknown;
}

export interface KekuleChemSpaceWidget {
  getChemObj(): KekuleMolecule | null;
  setChemObj(molecule: KekuleMolecule | null): void;
  getEditController(): unknown;
  repaint(): void;
  [key: string]: unknown;
}

export interface ElementColor {
  [element: string]: string;
}

export interface KekuleViewerConfig {
  renderStyle: RenderStyle;
  elementColors: ElementColor;
  atomRadius: number;
  bondWidth: number;
  showHydrogens: boolean;
  showCharges: boolean;
  showIsotopes: boolean;
  backgroundColor: string;
  enabledTools: EditTool[];
}

export interface KekuleViewerState {
  isReady: boolean;
  hasError: boolean;
  errorMessage: string | null;
  isEditing: boolean;
  currentTool: EditTool | null;
  molecule: KekuleMolecule | null;
  widget: KekuleChemSpaceWidget | null;
}

export interface KekuleViewerProps {
  smiles?: string | null;
  sdf?: string | null;
  config?: Partial<KekuleViewerConfig>;
  onMoleculeChange?: (molecule: KekuleMolecule) => void;
  onError?: (error: Error) => void;
  className?: string;
  style?: React.CSSProperties;
}

export interface KekuleToolbarProps {
  enabledTools: EditTool[];
  currentTool: EditTool | null;
  onToolChange: (tool: EditTool) => void;
  onToolToggle: (tool: EditTool) => void;
  className?: string;
}
