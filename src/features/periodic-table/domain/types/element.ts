/**
 * Representa um elemento químico
 */
export interface Element {
  /**
   * Número atômico
   */
  atomicNumber: number;

  /**
   * Símbolo do elemento
   */
  symbol: string;

  /**
   * Nome do elemento
   */
  name: string;

  /**
   * Massa atômica
   */
  atomicMass: number;

  /**
   * Grupo do elemento
   */
  group: number;

  /**
   * Período do elemento
   */
  period: number;

  /**
   * Categoria do elemento
   */
  category: "metal" | "nonmetal" | "metalloid";

  /**
   * Estado físico em temperatura ambiente
   */
  phase: "solid" | "liquid" | "gas";

  /**
   * Densidade em g/cm³
   */
  density: number;

  /**
   * Ponto de fusão em K
   */
  meltingPoint: number;

  /**
   * Ponto de ebulição em K
   */
  boilingPoint: number;

  /**
   * Eletronegatividade (escala de Pauling)
   */
  electronegativity: number;

  /**
   * Energia de ionização em kJ/mol
   */
  ionizationEnergy: number;

  /**
   * Configuração eletrônica
   */
  electronConfiguration: string;

  /**
   * Descrição do elemento
   */
  description: string;
} 