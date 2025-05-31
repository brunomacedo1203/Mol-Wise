import { CalculatorInstance } from "./calculator";
import { PositionWithWidth } from "./position";

/**
 * Props para o hook useCalculatorPage e componente CalculatorPageContent
 */
export interface UseCalculatorPageProps {
  /**
   * Tipo da calculadora
   */
  calculatorType: "molar-mass";

  /**
   * Posição inicial da calculadora
   */
  initialPosition?: { x: number; y: number };

  /**
   * Callback chamado quando uma calculadora é adicionada
   */
  onCalculatorAdd?: () => void;

  /**
   * Callback chamado quando uma calculadora é removida
   */
  onCalculatorRemove?: () => void;
}

/**
 * Handlers retornados pelo hook useCalculatorPage
 */
export interface CalculatorPageHandlers {
  /**
   * Handler para fechar a calculadora
   */
  onClose: () => void;

  /**
   * Handler para mudança de posição
   */
  onPositionChange: (position: PositionWithWidth) => void;

  /**
   * Handler para mudança de fórmula
   */
  onFormulaChange: (formula: string) => void;

  /**
   * Handler para mudança de resultado
   */
  onResultChange: (result: string | null) => void;

  /**
   * Handler para mudança de visibilidade do teclado
   */
  onKeyboardVisibilityChange: (isKeyboardVisible: boolean) => void;
}

/**
 * Retorno do hook useCalculatorPage
 */
export interface UseCalculatorPageReturn {
  /**
   * Instância da calculadora atual
   */
  calculator: CalculatorInstance | null;

  /**
   * Handlers para interação com a calculadora
   */
  handlers: CalculatorPageHandlers;
} 