export type OpenChemLibModule = typeof import("openchemlib");

export type ViewBox = {
  minX: number;
  minY: number;
  width: number;
  height: number;
};

/** ======= Ajustes do enquadramento inicial ======= */
export const INITIAL_SCALE = 3; // >1 aproxima (maior desenho)
export const INITIAL_Y_OFFSET_PX = 0; // + desce | - sobe
export const PRESERVE_RATIO = "xMidYMid meet"; // centraliza no palco