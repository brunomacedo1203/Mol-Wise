import { KeyConfig } from "./keyboard";

export type ScientificCategory = 'trigonometric' | 'logarithmic' | 'exponential' | 'other';

export interface ScientificButtonConfig extends KeyConfig {
  category: ScientificCategory;
}

export const SCIENTIFIC_BUTTONS: ScientificButtonConfig[] = [
  // Trigonométricas
  { value: 'sin', type: 'function', label: 'sin', category: 'trigonometric' },
  { value: 'cos', type: 'function', label: 'cos', category: 'trigonometric' },
  { value: 'tan', type: 'function', label: 'tan', category: 'trigonometric' },
  { value: 'asin', type: 'function', label: 'asin', category: 'trigonometric' },
  { value: 'acos', type: 'function', label: 'acos', category: 'trigonometric' },
  { value: 'atan', type: 'function', label: 'atan', category: 'trigonometric' },
  
  // Logarítmicas
  { value: 'log10', type: 'function', label: 'log', category: 'logarithmic' },
  { value: 'log', type: 'function', label: 'ln', category: 'logarithmic' },
  
  // Exponenciais
  { value: 'exp', type: 'function', label: 'exp', category: 'exponential' },
  { value: 'pow', type: 'operator', label: 'x^y', category: 'exponential' },
  { value: 'sqrt', type: 'function', label: '√', category: 'exponential' },
  { value: 'cbrt', type: 'function', label: '∛', category: 'exponential' },
  
  // Outros
  { value: 'PI', type: 'number', label: 'π', category: 'other' },
  { value: 'E', type: 'number', label: 'e', category: 'other' },
  { value: 'factorial', type: 'function', label: 'x!', category: 'other' },
  { value: 'abs', type: 'function', label: '|x|', category: 'other' },
  { value: 'mod', type: 'operator', label: 'mod', category: 'other' },
]; 