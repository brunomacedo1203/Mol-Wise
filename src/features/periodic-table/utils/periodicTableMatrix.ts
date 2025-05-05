import elementsData from '../services/elementsData'; 

const NUM_ROWS = 10;
const NUM_COLS = 18;

export function generatePeriodicTableMatrix() {
  const matrix: (typeof elementsData[0] | { type: "legend" } | { type: "legend-placeholder" } | null)[][] = Array.from({ length: NUM_ROWS }, () => Array(NUM_COLS).fill(null));

  elementsData.forEach((element) => {
    const row = (element.row ?? 1) - 1;
    const col = (element.column ?? 1) - 1;
    if (row >= 0 && row < NUM_ROWS && col >= 0 && col < NUM_COLS) {
      matrix[row][col] = element;
    }
  });

  // Adiciona o card de legenda ocupando 2x2 no canto inferior esquerdo
  matrix[NUM_ROWS - 2][0] = { type: "legend" };
  matrix[NUM_ROWS - 2][1] = { type: "legend-placeholder" };
  matrix[NUM_ROWS - 1][0] = { type: "legend-placeholder" };
  matrix[NUM_ROWS - 1][1] = { type: "legend-placeholder" };

  return matrix;
}
