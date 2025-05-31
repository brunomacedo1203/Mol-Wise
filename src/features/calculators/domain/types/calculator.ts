import { ReactNode } from "react";
import type { Position, PositionWithWidth } from "./position";

/**
 * Tipos de calculadoras disponíveis
 */
export type CalculatorType = "molar-mass";

/**
 * Estado de uma calculadora
 */
export interface CalculatorState {
  /**
   * Fórmula ou entrada atual
   */
  formula?: string;

  /**
   * Resultado do último cálculo
   */
  result?: string | null;

  /**
   * Mensagem de erro, se houver
   */
  error?: string | null;

  /**
   * Se o teclado está visível
   */
  isKeyboardVisible?: boolean;
}

/**
 * Instância de uma calculadora
 */
export interface CalculatorInstance {
  /**
   * ID único da calculadora
   */
  id: number;

  /**
   * Tipo da calculadora
   */
  type: CalculatorType;

  /**
   * Posição atual
   */
  position?: PositionWithWidth;

  /**
   * Estado atual
   */
  state?: CalculatorState;
}

/**
 * Props base para componentes de calculadora
 */
export interface CalculatorBaseProps {
  /**
   * Título da calculadora
   */
  title: string;

  /**
   * Subtítulo opcional
   */
  subtitle?: string;

  /**
   * Callback para fechar a calculadora
   */
  onClose?: () => void;

  /**
   * Posição inicial
   */
  initialPosition?: Position;

  /**
   * Callback quando a posição muda
   */
  onPositionChange?: (position: PositionWithWidth) => void;

  /**
   * Se o teclado está visível
   */
  isKeyboardVisible?: boolean;

  /**
   * Callback quando a visibilidade do teclado muda
   */
  onKeyboardVisibilityChange?: (visible: boolean) => void;
}

/**
 * Props do container de calculadora
 */
export interface CalculatorContainerProps extends CalculatorBaseProps {
  /**
   * ID único da calculadora
   */
  id: number;

  /**
   * Componente de entrada
   */
  input: ReactNode;

  /**
   * Componentes de ação (botões, etc)
   */
  actions: ReactNode;

  /**
   * Conteúdo adicional
   */
  children?: ReactNode;

  /**
   * Mensagem de erro
   */
  errorMessage?: string;
}

/**
 * Props do cabeçalho da calculadora
 */
export type CalculatorHeaderProps = Pick<CalculatorBaseProps, 'title' | 'subtitle' | 'onClose'>;

/**
 * Props do toggle do teclado
 */
export interface CalculatorKeyboardToggleProps {
  /**
   * Se o teclado está colapsado
   */
  isCollapsed: boolean;

  /**
   * Callback para alternar o teclado
   */
  onToggle: () => void;

  /**
   * Traduções para os textos
   */
  translations: {
    showKeyboard: string;
    hideKeyboard: string;
  };
}

/**
 * Props do teclado de calculadora
 */
export interface KeyboardCalculateProps {
  /**
   * Callback chamado quando uma tecla é pressionada
   */
  onKeyPress: (key: string) => void;

  /**
   * Callback chamado quando um botão de fórmula é clicado
   */
  onFormulaClick: (value: string) => void;

  /**
   * Callback para resetar a calculadora
   */
  onReset: () => void;

  /**
   * Callback chamado quando um parêntese é inserido
   */
  onParenthesis: (paren: string) => void;

  /**
   * Callback para calcular o resultado
   */
  onCalculate: () => void;

  /**
   * Callback para apagar o último caractere
   */
  onBackspace: () => void;
} 