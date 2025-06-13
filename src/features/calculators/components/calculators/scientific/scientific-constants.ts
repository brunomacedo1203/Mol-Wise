export type ScientificButton = {
  id: string;
  label: string;
  operation: string;
  type: 'function' | 'operator' | 'number';
  category: 'trigonometric' | 'logarithmic' | 'exponential' | 'other';
};

export const SCIENTIFIC_BUTTONS: ScientificButton[] = [
  // Trigonométricas
  { id: 'sin', label: 'sin', operation: 'sin', type: 'function', category: 'trigonometric' },
  { id: 'cos', label: 'cos', operation: 'cos', type: 'function', category: 'trigonometric' },
  { id: 'tan', label: 'tan', operation: 'tan', type: 'function', category: 'trigonometric' },
  { id: 'asin', label: 'asin', operation: 'asin', type: 'function', category: 'trigonometric' },
  { id: 'acos', label: 'acos', operation: 'acos', type: 'function', category: 'trigonometric' },
  { id: 'atan', label: 'atan', operation: 'atan', type: 'function', category: 'trigonometric' },
  
  // Logarítmicas
  { id: 'log', label: 'log', operation: 'log10', type: 'function', category: 'logarithmic' },
  { id: 'ln', label: 'ln', operation: 'log', type: 'function', category: 'logarithmic' },
  
  // Exponenciais
  { id: 'exp', label: 'exp', operation: 'exp', type: 'function', category: 'exponential' },
  { id: 'pow', label: 'x^y', operation: 'pow', type: 'operator', category: 'exponential' },
  { id: 'sqrt', label: '√', operation: 'sqrt', type: 'function', category: 'exponential' },
  { id: 'cbrt', label: '∛', operation: 'cbrt', type: 'function', category: 'exponential' },
  
  // Outros
  { id: 'pi', label: 'π', operation: 'PI', type: 'number', category: 'other' },
  { id: 'e', label: 'e', operation: 'E', type: 'number', category: 'other' },
  { id: 'factorial', label: 'x!', operation: 'factorial', type: 'function', category: 'other' },
  { id: 'abs', label: '|x|', operation: 'abs', type: 'function', category: 'other' },
  { id: 'mod', label: 'mod', operation: 'mod', type: 'operator', category: 'other' },
]; 