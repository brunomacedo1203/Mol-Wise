import { Element } from "./element";
import { PeriodicTableConfig } from "./config";

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

export interface PeriodicTableProps {
  /**
   * Callback chamado quando um elemento é selecionado
   */
  onElementSelect?: (element: Element | null) => void;

  /**
   * Callback chamado quando a configuração da tabela é alterada
   */
  onConfigChange?: (config: PeriodicTableConfig) => void;
}

/**
 * Props do container da tabela periódica
 */
export interface PeriodicTableContainerProps extends PeriodicTableProps {
  /**
   * Conteúdo do container
   */
  children: React.ReactNode;
}

/**
 * Props do card de elemento
 */
export interface ElementCardProps {
  /**
   * Elemento químico a ser exibido
   */
  element: Element;

  /**
   * Indica se o elemento está selecionado
   */
  isSelected: boolean;

  /**
   * Callback chamado quando o elemento é clicado
   */
  onClick: (atomicNumber: number) => void;

  /**
   * Configuração da tabela periódica
   */
  config: PeriodicTableConfig;
}

export interface ElementCardsGridProps {
  /**
   * Lista de elementos químicos a serem exibidos
   */
  elements: Element[];

  /**
   * Callback chamado quando um elemento é selecionado
   */
  onElementSelect?: (element: Element | null) => void;
}

/**
 * Props do painel de detalhes
 */
export interface ElementDetailsPanelProps {
  /**
   * Elemento químico selecionado
   */
  element: Element | null;

  /**
   * Callback chamado quando o painel é fechado
   */
  onClose: () => void;
}

export interface PeriodicTableHeaderProps {
  /**
   * Configuração atual da tabela periódica
   */
  config: PeriodicTableConfig;

  /**
   * Callback chamado quando a configuração é alterada
   */
  onConfigChange: (config: PeriodicTableConfig) => void;
} 