// features/calculators/domain/types/scientific-constants.ts

import { KeyConfig } from "./keyboard";

export type ScientificCategory =
  | "trigonometric"
  | "logarithmic"
  | "exponential"
  | "other";

export interface ScientificButtonConfig extends KeyConfig {
  category: ScientificCategory;
}
export const SCIENTIFIC_BUTTONS: ScientificButtonConfig[] = [
  // Trigonométricas
  { value: "sin(", label: "sin", category: "trigonometric", type: "function" },
  { value: "cos(", label: "cos", category: "trigonometric", type: "function" },
  { value: "tan(", label: "tan", category: "trigonometric", type: "function" },
  { value: "asin(", label: "sin⁻¹", category: "trigonometric", type: "function" },
  { value: "acos(", label: "cos⁻¹", category: "trigonometric", type: "function" },
  { value: "atan(", label: "tan⁻¹", category: "trigonometric", type: "function" },

  // Logarítmicas
  { value: "log10(", label: "log", category: "logarithmic", type: "function" },
  { value: "ln(", label: "ln", category: "logarithmic", type: "function" },

  // Exponenciais
  { value: "exp(", label: "exp", category: "exponential", type: "function" },
  { value: "^", label: "xʸ", category: "exponential", type: "operator" },
  { value: "sqrt(", label: "√", category: "exponential", type: "function" },
  { value: "nthRoot(", label: "∛", category: "exponential", type: "function" },

  // Outros
  { value: "pi", label: "π", category: "other", type: "number" },
  { value: "e", label: "e", category: "other", type: "number" },
  { value: "!", label: "n!", category: "other", type: "operator" },
  { value: "abs(", label: "|x|", category: "other", type: "function" },
];

