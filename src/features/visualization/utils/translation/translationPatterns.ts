// src/features/visualization/utils/translation/translationPatterns.ts
import { mapLexiconTermToEnglish } from "@/features/visualization/utils/chemicalDictionary";
import { dbg, lcNoAccents, detectLanguage, callTranslateAPI } from "./translationHelpers";

/* -------------------------------
   ÁCIDOS
-------------------------------- */
export async function trySmartAcidTranslation(name: string): Promise<string | null> {
  const s = lcNoAccents(name);
  const m = s.match(/^acido\s+(.+)$/i);
  if (!m) return null;

  const rest = m[1].trim();
  if (!/\s/.test(rest) && !/-/.test(rest)) {
    const lex = mapLexiconTermToEnglish(rest);
    if (lex && lex !== rest) {
      const out = `${lex} acid`;
      dbg("[trySmartAcidTranslation] via LEXICON:", { in: name, out });
      return out;
    }
  }

  const baseLang = detectLanguage(name);
  const api = await callTranslateAPI(rest, baseLang, "en");
  const translatedBase = api || rest;
  const out = `${translatedBase} acid`.toLowerCase();
  dbg("[trySmartAcidTranslation] via API parcial:", { in: name, out });
  return out;
}

/* -------------------------------
   BINÁRIOS
-------------------------------- */
export function trySmartBinaryTranslation(name: string): string | null {
  const s = lcNoAccents(name);
  if (!s.includes(" de ")) return null;

  const [part1, part2] = s.split(" de ");
  const t1 = mapLexiconTermToEnglish(part1.trim());
  const t2 = mapLexiconTermToEnglish(part2.trim());
  if (t1 && t2) {
    const out = `${t2} ${t1}`;
    dbg("[trySmartBinaryTranslation]", { in: name, out });
    return out;
  }
  return null;
}

/* -------------------------------
   ÓXIDOS
-------------------------------- */
export function trySmartOxideTranslation(name: string): string | null {
  const s = lcNoAccents(name);
  const mAdj = s.match(/^oxido\s+(\S+)/i);
  if (mAdj && !s.includes(" de ")) {
    const adj = mAdj[1];
    const lex = mapLexiconTermToEnglish(adj);
    if (lex && lex !== adj) return `${lex} oxide`;
  }

  const mRoman = s.match(/^oxido\s+de\s+([a-z\s]+)\s*\(([IVXLCDM]+)\)$/i);
  if (mRoman) {
    const el = mRoman[1].trim();
    const roman = mRoman[2].toUpperCase();
    const t = mapLexiconTermToEnglish(el) || el;
    return `${t}(${roman}) oxide`;
  }

  const mSimple = s.match(/^oxido\s+de\s+(\S+)$/i);
  if (mSimple) {
    const el = mSimple[1];
    const t = mapLexiconTermToEnglish(el);
    if (t && t !== el) return `${t} oxide`;
  }

  return null;
}

/* -------------------------------
   HIDRÓXIDOS
-------------------------------- */
export function trySmartHydroxideTranslation(name: string): string | null {
  const s = lcNoAccents(name);
  const m = s.match(/^hidroxido\s+de\s+(.+)$/i);
  if (!m) return null;

  const el = m[1].trim();
  const t = mapLexiconTermToEnglish(el);
  if (t && t !== el) return `${t} hydroxide`;
  return null;
}

/* -------------------------------
   SAIS
-------------------------------- */
export function trySmartSaltTranslation(name: string): string | null {
  const s = lcNoAccents(name);
  const m = s.match(/^(\S+)\s+de\s+(.+)$/i);
  if (!m) return null;

  const [anion, cation] = [m[1].trim(), m[2].trim()];
  const ta = mapLexiconTermToEnglish(anion);
  const tc = mapLexiconTermToEnglish(cation);
  if (ta && tc) return `${tc} ${ta}`;
  return null;
}

/* -------------------------------
   PERÓXIDOS
-------------------------------- */
export function trySmartPeroxideTranslation(name: string): string | null {
  const s = lcNoAccents(name);
  const m = s.match(/^peroxido\s+de\s+(.+)$/i);
  if (!m) return null;

  const el = m[1].trim();
  const t = mapLexiconTermToEnglish(el);
  if (t && t !== el) return `${t} peroxide`;
  return null;
}
