// src/features/visualization/utils/chemicalDictionary/index.ts
import { INORGANIC_DICTIONARY } from "./inorganic";
import { ORGANIC_DICTIONARY } from "./organic";
import { COORDINATION_DICTIONARY } from "./coordination";
import { mapToEnglish } from "./lexicon";

type ChemicalEntry = {
  english: string;
  french?: string;
  german?: string;
  spanish?: string;
  arabic?: string;
  hindi?: string;
  russian?: string;
  chinese?: string;
  indonesian?: string;
  bengali?: string;
  commonName?: string;
};

export const CHEMICAL_DICTIONARY: Record<string, ChemicalEntry> = {
  ...INORGANIC_DICTIONARY,
  ...ORGANIC_DICTIONARY,
  ...COORDINATION_DICTIONARY,
};

// Normalização leve para comparação independente de acentos/maiúsculas
function normalizeKey(text: string): string {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

// Construir um índice de aliases multilíngues → inglês
const ALIAS_TO_ENGLISH: Record<string, string> = {};
const LANGUAGE_FIELDS: (keyof ChemicalEntry)[] = [
  "english",
  "french",
  "german",
  "spanish",
  "arabic",
  "hindi",
  "russian",
  "chinese",
  "indonesian",
  "bengali",
  "commonName",
];

for (const [key, entry] of Object.entries(CHEMICAL_DICTIONARY)) {
  // chave original
  ALIAS_TO_ENGLISH[normalizeKey(key)] = entry.english;
  // todas as variantes por idioma
  for (const field of LANGUAGE_FIELDS) {
    const value = entry[field];
    if (value) {
      ALIAS_TO_ENGLISH[normalizeKey(value)] = entry.english;
    }
  }
}

/**
 * Busca termo químico localmente antes de traduzir via API externa.
 */
export function findInChemicalDictionary(term: string): string | null {
  const normalized = term.trim().toLowerCase();
  const direct = CHEMICAL_DICTIONARY[normalized];
  if (direct) return direct.english;
  // fallback por aliases sem acentos
  const alias = ALIAS_TO_ENGLISH[normalizeKey(term)];
  return alias ?? null;
}

/**
 * Mapeia partes de nomes compostos (ex.: "nitrato", "chumbo") para inglês.
 */
export function mapLexiconTermToEnglish(term: string): string | null {
  return mapToEnglish(term);
}
