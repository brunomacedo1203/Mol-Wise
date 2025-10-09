// src/features/visualization/utils/chemicalDictionary/index.ts
import { INORGANIC_DICTIONARY } from "./inorganic";
import { ORGANIC_DICTIONARY } from "./organic";
import { COORDINATION_DICTIONARY } from "./coordination";
import { mapToEnglish } from "./lexicon";

type ChemicalEntry = { english: string; commonName?: string };

export const CHEMICAL_DICTIONARY: Record<string, ChemicalEntry> = {
  ...INORGANIC_DICTIONARY,
  ...ORGANIC_DICTIONARY,
  ...COORDINATION_DICTIONARY,
};

/**
 * Busca termo químico localmente antes de traduzir via API externa.
 */
export function findInChemicalDictionary(term: string): string | null {
  const normalized = term.trim().toLowerCase();
  const entry = CHEMICAL_DICTIONARY[normalized];
  return entry ? entry.english : null;
}

/**
 * Mapeia partes de nomes compostos (ex.: "nitrato", "chumbo") para inglês.
 */
export function mapLexiconTermToEnglish(term: string): string | null {
  return mapToEnglish(term);
}
