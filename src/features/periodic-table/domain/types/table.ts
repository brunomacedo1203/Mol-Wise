import { Element } from "./element";

/**
 * Configurações da tabela periódica
 */
export interface PeriodicTableConfig {
  /**
   * Se deve mostrar números atômicos
   */
  showAtomicNumber: boolean;

  /**
   * Se deve mostrar massas atômicas
   */
  showAtomicMass: boolean;

  /**
   * Se deve mostrar nomes dos elementos
   */
  showElementName: boolean;

  /**
   * Se deve mostrar símbolos dos elementos
   */
  showElementSymbol: boolean;
}

/**
 * Estado da tabela periódica
 */
export interface PeriodicTableState {
  /**
   * Configurações atuais
   */
  config: PeriodicTableConfig;

  /**
   * Elemento selecionado
   */
  selectedElement: Element | null;

  /**
   * Elementos filtrados
   */
  filteredElements: Element[];

  /**
   * Termo de busca
   */
  searchTerm: string;
}

/**
 * Props do container da tabela periódica
 */
export interface PeriodicTableContainerProps {
  /**
   * Configuração inicial
   */
  initialConfig?: Partial<PeriodicTableConfig>;

  /**
   * Callback quando um elemento é selecionado
   */
  onElementSelect?: (element: Element | null) => void;

  /**
   * Callback quando a configuração muda
   */
  onConfigChange?: (config: PeriodicTableConfig) => void;
}

/**
 * Props do card de elemento
 */
export interface ElementCardProps {
  /**
   * Elemento a ser exibido
   */
  element: Element;

  /**
   * Se o elemento está selecionado
   */
  isSelected: boolean;

  /**
   * Callback quando o card é clicado
   */
  onClick: (element: Element) => void;

  /**
   * Configuração atual
   */
  config: PeriodicTableConfig;
}

/**
 * Props do painel de detalhes
 */
export interface ElementDetailsPanelProps {
  /**
   * Elemento selecionado
   */
  element: Element | null;

  /**
   * Callback para fechar o painel
   */
  onClose: () => void;
} 