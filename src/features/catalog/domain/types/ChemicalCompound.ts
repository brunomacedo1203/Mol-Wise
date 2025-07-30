export type CompoundCategory = "ácido" | "base" | "sal" | "óxido";

export interface ChemicalCompound {
  id: number;
  name: string;
  synonym?: string;
  formula: string;
  casNumber: string;
  molarMass: number;
  physicalForm?: string;
  meltingPoint?: number;
  boilingPoint?: number;
  density?: number;
  refractiveIndex?: number | null;
  solubility: string;
  solubilityNumeric?: string;
  category: CompoundCategory;
}

// Tipo estendido com nome usual e função inorgânica
export type ExtendedCompound = ChemicalCompound & {
  commonName: string;
  category: "ácido" | "base" | "sal" | "óxido" | "desconhecida";
};

// Tipos para filtros avançados - Fase 1: Faixas de valores
export interface ValueRange {
  min: number | null;
  max: number | null;
}

export interface BasicAdvancedFilters {
  // Faixas de valores numéricos
  meltingPoint: ValueRange;
  boilingPoint: ValueRange;
  density: ValueRange;
  molarMass: ValueRange;
  
  // Estado físico (múltipla seleção)
  physicalForms: string[];
  
  // Solubilidade (múltipla seleção)
  solubilityTypes: string[];
}

export interface AdvancedFilterState {
  isOpen: boolean;
  filters: BasicAdvancedFilters;
  isActive: boolean;
}
