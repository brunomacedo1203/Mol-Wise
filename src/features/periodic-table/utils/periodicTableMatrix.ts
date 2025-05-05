import elementsData from '../services/elementsData'; 

const NUM_ROWS = 10;
const NUM_COLS = 18;

export function generatePeriodicTableMatrix() {
  const matrix: (typeof elementsData[0] | null)[][] = Array.from({ length: NUM_ROWS }, () => Array(NUM_COLS).fill(null));

  elementsData.forEach((element) => {
    const row = (element.row ?? 1) - 1;
    const col = (element.column ?? 1) - 1;
    if (row >= 0 && row < NUM_ROWS && col >= 0 && col < NUM_COLS) {
      matrix[row][col] = element;
    }
  });

  return matrix;
}
