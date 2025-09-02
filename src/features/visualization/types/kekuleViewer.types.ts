export type RenderStyle = 'complete' | 'ballStick' | 'skeleton' | 'wireframe';

export type EditTool = 'select' | 'draw' | 'erase' | 'rotate' | 'move';

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
  molecule: any | null; // Kekule.Chem.Molecule
  widget: any | null; // Kekule.Widget.ChemSpaceWidget
}

export interface KekuleViewerProps {
  smiles?: string | null;
  sdf?: string | null;
  config?: Partial<KekuleViewerConfig>;
  onMoleculeChange?: (molecule: any) => void;
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
