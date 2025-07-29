export function getCompoundName(
  t: (key: string) => string,
  formula: string,
  fallback: string
): string {
  try {
    const translated = t(`catalog.compoundNames.${formula}`);
    return translated || fallback;
  } catch {
    return fallback;
  }
}

export function getCompoundSynonym(
  t: (key: string) => string,
  formula: string,
  fallback: string
): string {
  try {
    const translated = t(`catalog.compoundSynonyms.${formula}`);
    return translated || fallback;
  } catch {
    return fallback;
  }
}

export function getSolubilityTranslation(
  t: (key: string) => string,
  solubility: string
): string {
  // Se a solubilidade estiver vazia, retornar string vazia
  if (!solubility || solubility.trim() === "") {
    return "";
  }
  
  try {
    const translated = t(`solubilityTerms.${solubility}`);
    return translated || solubility;
  } catch {
    return solubility;
  }
}

export function getPhysicalFormTranslation(
  t: (key: string) => string,
  physicalForm: string | undefined
): string {
  if (!physicalForm) return "";
  try {
    const translated = t(`physicalFormTerms.${physicalForm}`);
    return translated || physicalForm;
  } catch {
    return physicalForm;
  }
} 