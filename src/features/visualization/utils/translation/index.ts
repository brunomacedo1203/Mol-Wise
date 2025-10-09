// src/features/visualization/utils/translation/index.ts
import { findInChemicalDictionary } from "@/features/visualization/utils/chemicalDictionary";
import {
  isDebug,
  dbg,
  loadCache,
  saveCache,
  cleanOldEntries,
  normalizeToASCII,
  detectLanguage,
  clearTranslationCache,
  applyCommonPtFixes,
  callTranslateAPIWithFallbacks,
} from "./translationHelpers";
import {
  trySmartAcidTranslation,
  trySmartBinaryTranslation,
  trySmartHydroxideTranslation,
  trySmartOxideTranslation,
  trySmartPeroxideTranslation,
  trySmartSaltTranslation,
} from "./translationPatterns";
import { pubchemHasName, generateNameVariants } from "./translationPubChem";
import { postProcessChemicalTranslation } from "./translationPostProcess";

/* -------------------------------
   🎯 FUNÇÃO PRINCIPAL
-------------------------------- */
export async function translateNameToEnglish(name: string): Promise<string> {
  const normalized = name.trim().toLowerCase();
  if (!normalized) return name;
  if (isDebug()) console.group(`[translateNameToEnglish] "${name}"`);

  // Caso o termo seja muito próximo foneticamente de compostos conhecidos
  if (normalized.endsWith("ia") && !normalized.endsWith("eia")) {
    const possible = normalized.replace(/ia$/, "y");
    if (await pubchemHasName(possible)) {
      dbg("✅ Fallback fonético →", possible);
      if (isDebug()) console.groupEnd();
      return possible;
    }
  }

  // 1️⃣ Dicionário completo
  const localMatch = findInChemicalDictionary(normalized);
  if (localMatch) {
    dbg("✅ Dicionário local →", localMatch);
    if (isDebug()) console.groupEnd();
    return localMatch;
  }

  // 2️⃣ Padrões inteligentes
  const smartFns = [
    () => trySmartAcidTranslation(name),
    () => trySmartPeroxideTranslation(name),
    () => trySmartOxideTranslation(name),
    () => trySmartHydroxideTranslation(name),
    () => trySmartSaltTranslation(name),
    () => trySmartBinaryTranslation(name),
  ];

  for (const fn of smartFns) {
    const result = await fn();
    if (result) {
      const cleaned = normalizeToASCII(postProcessChemicalTranslation(result));
      if (await pubchemHasName(cleaned)) {
        if (isDebug()) console.groupEnd();
        return cleaned;
      }

      const variants = generateNameVariants(cleaned);
      for (const v of variants) {
        if (await pubchemHasName(v)) {
          dbg("✅ Smart variant encontrada:", v);
          if (isDebug()) console.groupEnd();
          return v;
        }
      }
    }
  }

  // 3️⃣ Cache
  const cache = loadCache();
  cleanOldEntries(cache);
  const cached = cache[normalized];
  if (cached && cached.translated && cached.translated !== name) {
    dbg("💾 Cache →", cached.translated);
    if (isDebug()) console.groupEnd();
    return cached.translated;
  }

  // 4️⃣ Fallback: API externa (com correções PT e fallbacks de idioma)
  const srcLang = detectLanguage(name);
  // tenta reintroduzir acentos comuns do PT para ajudar a tradução
  const preFixed = applyCommonPtFixes(name);
  // usa estratégia de fallbacks de idioma
  const translatedTry = await callTranslateAPIWithFallbacks(preFixed, srcLang);
  const translated = normalizeToASCII(
    postProcessChemicalTranslation(translatedTry || name)
  );

  // PubChem + variantes
  let finalOut = translated;
  let validated = await pubchemHasName(finalOut);
  if (!validated) {
    const variants = generateNameVariants(finalOut);
    for (const v of variants) {
      if (await pubchemHasName(v)) {
        dbg("✅ Smart variant encontrada:", v);
        finalOut = v;
        validated = true;
        break;
      }
    }
  }

  // Cache apenas resultados validados
  if (validated) {
    cache[normalized] = { translated: finalOut, timestamp: Date.now() };
    saveCache(cache);
  } else {
    dbg("⚠️ Não validado no PubChem; não cacheado:", finalOut);
  }

  if (isDebug()) console.groupEnd();
  return finalOut;
}

export { clearTranslationCache };
