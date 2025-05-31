/**
 * Constantes utilizadas pelos componentes de calculadora
 * Centraliza valores que podem ser reutilizados em diferentes partes da feature
 */

export const CALCULATOR_CONSTANTS = {
  // Seletores DOM
  SELECTORS: {
    MAIN_CONTENT: "#main-content-area",
  },

  // Dimensões e posições (valores que podem ser reutilizados)
  DIMENSIONS: {
    MIN_WIDTH: 500,
    MAX_WIDTH: 700,
    DEFAULT_WIDTH: 500,
    DEFAULT_HEIGHT: "auto",
    DEFAULT_X: 100,
    DEFAULT_Y: 100,
  },

  // Classes CSS
  CLASSES: {
    RESIZABLE: "calculator-resizable",
  },

  // Configurações de comportamento
  BEHAVIOR: {
    ENABLE_RESIZE: { right: true },
  },

  // Chaves de tradução
  TRANSLATIONS: {
    SHOW_KEYBOARD: "common.accessibility.showKeyboard",
    HIDE_KEYBOARD: "common.accessibility.hideKeyboard",
  },
} as const;

export type CalculatorConstants = typeof CALCULATOR_CONSTANTS; 