/**
 * Configuração da tabela periódica
 */
export interface PeriodicTableConfig {
  /**
   * Indica se o número atômico deve ser exibido
   */
  showAtomicNumber: boolean;

  /**
   * Indica se a massa atômica deve ser exibida
   */
  showAtomicMass: boolean;

  /**
   * Indica se o nome do elemento deve ser exibido
   */
  showElementName: boolean;

  /**
   * Indica se o símbolo do elemento deve ser exibido
   */
  showElementSymbol: boolean;
}

/**
 * Configuração padrão da tabela periódica
 */
export const defaultConfig: PeriodicTableConfig = {
  showAtomicNumber: true,
  showAtomicMass: true,
  showElementName: true,
  showElementSymbol: true,
} as const; 