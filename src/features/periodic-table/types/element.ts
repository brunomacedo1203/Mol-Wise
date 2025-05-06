// Tipagem centralizada para elementos químicos

export interface Element {
  symbol: string;
  name: string;
  atomicNumber: number;
  molarMass: number;
  standardState?: string;
  electronConfiguration?: string;
  oxidationStates?: string;
  electronegativity?: number;
  atomicRadius?: string;
  ionizationEnergy?: string;
  electronAffinity?: string;
  meltingPoint?: string;
  boilingPoint?: string;
  density?: string;
  yearDiscovered?: string;
  category?: string;
  group?: string | number;
  period?: string | number;
  showColummNumber?: number;
} 