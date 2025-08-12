export interface Element {
  atomicNumber: number;
  symbol: string;
  name: string;
  molarMass: number;
  category: "Alkali metal" | "Alkaline earth metal" | "Transition metal" | "Post-transition metal" | "Metalloid" | "Nonmetal" | "Halogen" | "Noble gas" | "Lanthanide" | "Actinide";
  standardState: "solid" | "liquid" | "gas";
  electronConfiguration: string;
  oxidationStates: string;
  electronegativity?: number;
  atomicRadius: string;
  ionizationEnergy: string;
  electronAffinity?: string;
  meltingPoint: string;
  boilingPoint: string;
  density: string;
  yearDiscovered: string;
  group: number;
  period: number;
  row: number;
  column: number;
  showColumnNumber?: number;
  isRareEarth?: boolean;
  isBoronFamily?: boolean;
  isCarbonFamily?: boolean;
  isNitrogenFamily?: boolean;
  isOxygenFamily?: boolean;
}