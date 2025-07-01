import { ChemicalCompound } from "./ChemicalCompound";

export type ExtraColumn = "solubilityNumeric" | "solubilityQualitative";
export type TableColumnKey = keyof ChemicalCompound | ExtraColumn; 