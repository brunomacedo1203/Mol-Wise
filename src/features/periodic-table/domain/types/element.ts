/**
 * Represents a chemical element
 */
export interface Element {
  /**
   * Atomic number
   */
  atomicNumber: number;

  /**
   * Element symbol
   */
  symbol: string;

  /**
   * Element name
   */
  name: string;

  /**
   * Atomic mass (molar mass)
   */
  molarMass: number;

  /**
   * Element category
   */
  category: "Alkali metal" | "Alkaline earth metal" | "Transition metal" | "Post-transition metal" | "Metalloid" | "Nonmetal" | "Halogen" | "Noble gas" | "Lanthanide" | "Actinide";

  /**
   * Standard state at room temperature
   */
  standardState: "solid" | "liquid" | "gas";

  /**
   * Electron configuration
   */
  electronConfiguration: string;

  /**
   * Oxidation states
   */
  oxidationStates: string;

  /**
   * Electronegativity (Pauling scale)
   */
  electronegativity?: number;

  /**
   * Atomic radius
   */
  atomicRadius: string;

  /**
   * Ionization energy
   */
  ionizationEnergy: string;

  /**
   * Electron affinity
   */
  electronAffinity?: string;

  /**
   * Melting point in Kelvin
   */
  meltingPoint: string;

  /**
   * Boiling point in Kelvin
   */
  boilingPoint: string;

  /**
   * Density in g/cm³
   */
  density: string;

  /**
   * Year of discovery
   */
  yearDiscovered: string;

  /**
   * Group number
   */
  group: number;

  /**
   * Period number
   */
  period: number;

  /**
   * Row in periodic table
   */
  row: number;

  /**
   * Column in periodic table
   */
  column: number;

  /**
   * Column number to display
   */
  showColumnNumber?: number;

  isRareEarth?: boolean;
} 