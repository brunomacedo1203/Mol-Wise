import type { KekuleViewerConfig, ElementColor } from '../types/kekuleViewer.types';

export const DEFAULT_ELEMENT_COLORS: ElementColor = {
  C: '#000000', // Preto
  H: '#FFFFFF', // Branco
  N: '#0000FF', // Azul
  O: '#FF0000', // Vermelho
  S: '#FFFF00', // Amarelo
  P: '#FFA500', // Laranja
  F: '#00FF00', // Verde
  Cl: '#00FF00', // Verde
  Br: '#8B0000', // Vermelho escuro
  I: '#800080', // Roxo
  Si: '#FFA500', // Laranja
  B: '#FFA500', // Laranja
  Li: '#FF0000', // Vermelho
  Na: '#FF0000', // Vermelho
  K: '#FF0000', // Vermelho
  Mg: '#FFA500', // Laranja
  Ca: '#FFA500', // Laranja
  Fe: '#FFA500', // Laranja
  Cu: '#FFA500', // Laranja
  Zn: '#FFA500', // Laranja
};

export const DEFAULT_KEKULE_CONFIG: KekuleViewerConfig = {
  renderStyle: 'complete',
  elementColors: DEFAULT_ELEMENT_COLORS,
  atomRadius: 12,
  bondWidth: 2,
  showHydrogens: true,
  showCharges: true,
  showIsotopes: true,
  backgroundColor: 'transparent',
  enabledTools: ['select', 'draw', 'erase', 'rotate', 'move'],
};

export const KEKULE_LOAD_TIMEOUT = 10000; // 10 segundos
export const KEKULE_RETRY_ATTEMPTS = 3;

export const RENDER_STYLE_LABELS = {
  complete: 'Estrutura Completa',
  ballStick: 'Bastão e Esfera',
  skeleton: 'Esqueleto',
  wireframe: 'Arame',
} as const;

export const EDIT_TOOL_LABELS = {
  select: 'Selecionar',
  draw: 'Desenhar',
  erase: 'Apagar',
  rotate: 'Rotacionar',
  move: 'Mover',
} as const;

export const EDIT_TOOL_ICONS = {
  select: 'cursor',
  draw: 'pen',
  erase: 'eraser',
  rotate: 'rotate-cw',
  move: 'move',
} as const;
