// src/features/visualization/utils/translation/translationPostProcess.ts
import { stripDiacritics } from "./translationHelpers";

export function postProcessChemicalTranslation(translated: string): string {
  let corrected = stripDiacritics(translated);

  if (/\bof\b/i.test(corrected)) {
    const parts = corrected.split(/\bof\b/i).map((p) => p.trim());
    if (parts.length === 2) corrected = `${parts[1]} ${parts[0]}`.trim();
  }

  corrected = corrected
    .replace(/\b(the|a|an)\b/gi, "")
    .replace(/\s{2,}/g, " ")
    .trim()
    .toLowerCase();

  const replacements: Record<string, string> = {
    "acid sulfuric": "sulfuric acid",
    "acid nitric": "nitric acid",
    "acid hydrochloric": "hydrochloric acid",
    "acid phosphoric": "phosphoric acid",
    "acid acetic": "acetic acid",
    "acid lactic": "lactic acid",
    "acid formic": "formic acid",
    "hydroxide of ammonia": "ammonium hydroxide",
  };

  for (const [wrong, correct] of Object.entries(replacements)) {
    const re = new RegExp(`\\b${wrong}\\b`, "gi");
    corrected = corrected.replace(re, correct);
  }

  return corrected;
}
