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
}

// Tipo estendido com nome usual e função inorgânica
export type ExtendedCompound = ChemicalCompound & {
  commonName: string;
  category: "ácido" | "base" | "sal" | "óxido" | "desconhecida";
};
