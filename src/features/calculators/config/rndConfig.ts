/**
 * Configurações do componente Rnd (react-rnd) para as calculadoras
 * Define as dimensões e posições padrão, limites e comportamentos
 */

import { CALCULATOR_CONSTANTS } from "./constants";

export const rndConfig = {
  minWidth: CALCULATOR_CONSTANTS.DIMENSIONS.MIN_WIDTH,
  maxWidth: CALCULATOR_CONSTANTS.DIMENSIONS.MAX_WIDTH,
  defaultWidth: CALCULATOR_CONSTANTS.DIMENSIONS.DEFAULT_WIDTH,
  defaultHeight: CALCULATOR_CONSTANTS.DIMENSIONS.DEFAULT_HEIGHT,
  defaultX: CALCULATOR_CONSTANTS.DIMENSIONS.DEFAULT_X,
  defaultY: CALCULATOR_CONSTANTS.DIMENSIONS.DEFAULT_Y,
  bounds: CALCULATOR_CONSTANTS.SELECTORS.MAIN_CONTENT,
  enable: CALCULATOR_CONSTANTS.BEHAVIOR.ENABLE_RESIZE,
  className: CALCULATOR_CONSTANTS.CLASSES.RESIZABLE,
} as const;

export type RndConfig = typeof rndConfig; 