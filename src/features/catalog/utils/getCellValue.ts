import type { ExtendedCompound } from "@/features/catalog/hooks/common/useCompoundData";
import { TableColumnKey } from "@/features/catalog/domain/types/TableColumnKey";
import {
  getCompoundName,
  getCompoundSynonym,
  getSolubilityTranslation,
  getPhysicalFormTranslation,
} from "@/features/catalog/utils/compoundFormatters";

export function getCellValue(
  compound: ExtendedCompound,
  key: TableColumnKey,
  t: (key: string) => string
): string {
  function extractSolubilityQualitative(solubility: string) {
    if (!/([\d,.]+)\s*g\/(?:100\s*(?:mL|g))\s*water/i.test(solubility)) {
      return getSolubilityTranslation(t, solubility);
    }
    return "";
  }
  switch (key) {
    case "id":
      return compound.id?.toString() || "";
    case "name":
      return getCompoundName(t, compound.formula, compound.name ?? "");
    case "synonym":
      return getCompoundSynonym(
        t,
        compound.formula,
        compound.synonym ?? ""
      );
    case "formula":
      return compound.formula || "";
    case "casNumber":
      return compound.casNumber || "";
    case "molarMass":
      return compound.molarMass?.toString() || "";
    case "physicalForm":
      return getPhysicalFormTranslation(t, compound.physicalForm);
    case "meltingPoint":
      return compound.meltingPoint?.toString() || "";
    case "boilingPoint":
      return compound.boilingPoint?.toString() || "";
    case "density":
      return compound.density?.toString() || "";
    case "refractiveIndex":
      return compound.refractiveIndex?.toString() || "";
    case "solubilityNumeric":
      return compound.solubilityNumeric || "";
    case "solubilityQualitative":
      return extractSolubilityQualitative(compound.solubility);
    case "solubility":
      return getSolubilityTranslation(t, compound.solubility);
    case "commonName":
      return compound.commonName || "";
    default:
      return "";
  }
} 