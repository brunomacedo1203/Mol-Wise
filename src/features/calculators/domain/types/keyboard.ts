/**
 * Tipos relacionados ao teclado virtual
 */

// Tipo de tecla
export type KeyType = 
  | "number"    // Números (0-9)
  | "operator"  // Operadores (+, -, *, /)
  | "function"  // Funções (sin, cos, etc)
  | "special"   // Teclas especiais (Enter, Backspace, etc)
  | "formula"   // Fórmulas químicas (H2O, NaCl, etc)
  | "parenthesis"; // Parênteses

// Configuração de uma tecla
export interface KeyConfig {
  value: string;
  type: KeyType;
  label?: string;
  className?: string;
}

// Props base para teclados
export interface KeyboardBaseProps {
  onKeyPress: (key: string) => void;
  onReset?: () => void;
}

// Props para teclado de fórmulas
export interface FormulaKeyboardProps extends KeyboardBaseProps {
  onFormulaClick: (value: string) => void;
  onParenthesis: (paren: string) => void;
  onCalculate: () => void;
  onBackspace: () => void;
}

// Props para teclado científico
export interface ScientificKeyboardProps extends KeyboardBaseProps {
  onFunction: (func: string) => void;
  onMemory: (action: "store" | "recall" | "clear") => void;
  onCalculate: () => void;
  onBackspace: () => void;
}

/**
 * Props do hook useCalculatorKeyboard
 */
export interface UseCalculatorKeyboardProps {
  /**
   * Visibilidade inicial do teclado
   */
  initialVisibility?: boolean;

  /**
   * Callback chamado quando a visibilidade do teclado muda
   */
  onVisibilityChange?: (isVisible: boolean) => void;
}

/**
 * Retorno do hook useCalculatorKeyboard
 */
export interface UseCalculatorKeyboardReturn {
  /**
   * Se o teclado está colapsado
   */
  isCollapsed: boolean;

  /**
   * Handler para alternar a visibilidade do teclado
   */
  handleKeyboardToggle: () => void;
} 