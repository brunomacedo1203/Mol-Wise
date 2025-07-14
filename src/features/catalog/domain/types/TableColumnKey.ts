import { ChemicalCompound } from "./ChemicalCompound";

export type ExtraColumn = "solubilityNumeric" | "solubilityQualitative" | "commonName" | "category";
export type TableColumnKey = keyof ChemicalCompound | ExtraColumn; 