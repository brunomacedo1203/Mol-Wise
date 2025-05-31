/**
 * Tipos relacionados ao posicionamento de calculadoras
 */

// Posição básica (x, y)
export interface Position {
  x: number;
  y: number;
}

// Posição com largura
export interface PositionWithWidth extends Position {
  width: number;
}

// Posição com dimensões completas
export interface PositionWithDimensions extends PositionWithWidth {
  height: number;
}

// Configuração de redimensionamento
export interface ResizeConfig {
  minWidth: number;
  maxWidth: number;
  defaultWidth: number;
  defaultHeight: number;
  enable: {
    top: boolean;
    right: boolean;
    bottom: boolean;
    left: boolean;
    topRight: boolean;
    bottomRight: boolean;
    bottomLeft: boolean;
    topLeft: boolean;
  };
} 