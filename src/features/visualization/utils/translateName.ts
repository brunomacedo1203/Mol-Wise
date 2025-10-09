// src/features/visualization/utils/translateName.ts
import { findInChemicalDictionary, mapLexiconTermToEnglish } from "@/features/visualization/utils/chemicalDictionary";

/* =========================
   CONFIG / CACHE / LOG
========================= */
const CACHE_KEY = "molclass:translation-cache";
const CACHE_TTL_DAYS = 30;

/** Flag de debug (ligue com: localStorage.DEBUG_TRANSLATION="true") */
function isDebug() {
  try {
    return localStorage.getItem("DEBUG_TRANSLATION") === "true";
  } catch {
    return false;
  }
}
function dbg(label: string, ...args: unknown[]) {
  if (isDebug()) console.info(label, ...args);
}

/** Cache utils */
function loadCache(): Record<string, { translated: string; timestamp: number }> {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return {};
    const cache = JSON.parse(raw);
    return typeof cache === "object" && cache !== null ? cache : {};
  } catch {
    return {};
  }
}
function saveCache(cache: Record<string, { translated: string; timestamp: number }>) {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify(cache));
  } catch {
    console.warn("[translateNameToEnglish] Falha ao salvar cache");
  }
}
function cleanOldEntries(cache: Record<string, { translated: string; timestamp: number }>) {
  const now = Date.now();
  const ttlMs = CACHE_TTL_DAYS * 24 * 60 * 60 * 1000;
  for (const key in cache) {
    if (now - cache[key].timestamp > ttlMs) delete cache[key];
  }
}

/* =========================
   NORMALIZAÇÃO E AJUDANTES
========================= */
function stripDiacritics(text: string): string {
  return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}
function normalizeToASCII(text: string): string {
  return stripDiacritics(text)
    .replace(/[^\x00-\x7F]/g, "")
    .replace(/\s{2,}/g, " ")
    .trim();
}
function lcNoAccents(s: string) {
  return stripDiacritics(s).toLowerCase().trim();
}

/** Detecção leve de idioma para orientar a API /api/translate */
function detectLanguage(raw: string): "pt" | "es" | "fr" | "auto" {
  const s = lcNoAccents(raw);
  if (/\b(acido|oxido|hidroxido|peroxido|de)\b/.test(s)) return "pt"; // PT (também cobre BR)
  if (/\b(acido|oxido|hidroxido|peroxido|de)\b/.test(s) && /cloruro|nitrato|sulfato/.test(s)) return "es";
  if (/\b(acide|oxyde|hydroxyde|peroxyde|de)\b/.test(s)) return "fr";
  return "auto";
}

/* =========================
   PADRÕES "INTELIGENTES"
========================= */
/** 1) “ácido X …” amplo: usa LEXICON quando possível; senão chama /api/translate na parte “X …” */
async function trySmartAcidTranslation(name: string): Promise<string | null> {
  const s = lcNoAccents(name);
  const m = s.match(/^acido\s+(.+)$/i);
  if (!m) return null;

  const rest = m[1].trim(); // pode conter números/hifens (ex.: 2-hidroxibenzoico)
  // Se for UMA palavra e estiver no LEXICON (ex.: latico → lactic)
  if (!/\s/.test(rest) && !/-/.test(rest)) {
    const lex = mapLexiconTermToEnglish(rest);
    if (lex && lex !== rest) {
      const out = `${lex} acid`;
      dbg("[trySmartAcidTranslation] via LEXICON:", { in: name, out });
      return out;
    }
  }

  // Caso geral: traduz só a parte do radical pela API e concatena “acid”
  const baseLang = detectLanguage(name);
  const api = await callTranslateAPI(rest, baseLang, "en");
  const translatedBase = api || rest;
  const out = `${translatedBase} acid`.toLowerCase();
  dbg("[trySmartAcidTranslation] via API parcial:", { in: name, rest, out });
  return out;
}

/** 2) “X de Y” para sais/básicos: “nitrato de chumbo” → “lead nitrate” via LEXICON */
function trySmartBinaryTranslation(name: string): string | null {
  const s = lcNoAccents(name);
  if (!s.includes(" de ")) return null;

  const parts = s.split(" de ");
  if (parts.length !== 2) return null;

  const [part1, part2] = parts;
  const t1 = mapLexiconTermToEnglish(part1.trim());
  const t2 = mapLexiconTermToEnglish(part2.trim());
  if (t1 && t2) {
    const out = `${t2} ${t1}`;
    dbg("[trySmartBinaryTranslation]", { in: name, out });
    return out;
  }
  return null;
}

/** 3) Óxidos (três formas) */
function trySmartOxideTranslation(name: string): string | null {
  const s = lcNoAccents(name);

  // a) “óxido férrico” (adjetivo metálico → ferric/ferrous/cupric/cuprous)
  const mAdj = s.match(/^oxido\s+(\S+)/i);
  if (mAdj && !s.includes(" de ")) {
    const adj = mAdj[1];
    const lex = mapLexiconTermToEnglish(adj);
    if (lex && lex !== adj) {
      const out = `${lex} oxide`;
      dbg("[trySmartOxideTranslation] adjetivo:", { in: name, out });
      return out;
    }
  }

  // b) “óxido de ferro (III)”
  const mRoman = s.match(/^oxido\s+de\s+([a-z\s]+)\s*\(([IVXLCDM]+)\)$/i);
  if (mRoman) {
    const el = mRoman[1].trim();
    const roman = mRoman[2].toUpperCase();
    const t = mapLexiconTermToEnglish(el) || el;
    const out = `${t}(${roman}) oxide`;
    dbg("[trySmartOxideTranslation] romano:", { in: name, out });
    return out;
  }

  // c) “óxido de ferro”
  const mSimple = s.match(/^oxido\s+de\s+(\S+)$/i);
  if (mSimple) {
    const el = mSimple[1].trim();
    const t = mapLexiconTermToEnglish(el);
    if (t && t !== el) {
      const out = `${t} oxide`;
      dbg("[trySmartOxideTranslation] simples:", { in: name, out });
      return out;
    }
  }

  return null;
}

/** 4) Hidróxidos: “hidróxido de X” → “X hydroxide” */
function trySmartHydroxideTranslation(name: string): string | null {
  const s = lcNoAccents(name);
  const m = s.match(/^hidroxido\s+de\s+(.+)$/i);
  if (!m) return null;

  const el = m[1].trim();
  const t = mapLexiconTermToEnglish(el);
  if (t && t !== el) {
    const out = `${t} hydroxide`;
    dbg("[trySmartHydroxideTranslation]", { in: name, out });
    return out;
  }
  return null;
}

/** 5) Sais direto: “nitrato de X” → “X nitrate” (mais genérico que 2) */
function trySmartSaltTranslation(name: string): string | null {
  const s = lcNoAccents(name);
  const m = s.match(/^(\S+)\s+de\s+(.+)$/i);
  if (!m) return null;

  const anion = m[1].trim();
  const cation = m[2].trim();
  const ta = mapLexiconTermToEnglish(anion);
  const tc = mapLexiconTermToEnglish(cation);
  if (ta && tc) {
    const out = `${tc} ${ta}`;
    dbg("[trySmartSaltTranslation]", { in: name, out });
    return out;
  }
  return null;
}

/** 6) Peróxidos: “peróxido de X” → “X peroxide” */
function trySmartPeroxideTranslation(name: string): string | null {
  const s = lcNoAccents(name);
  const m = s.match(/^peroxido\s+de\s+(.+)$/i);
  if (!m) return null;

  const el = m[1].trim();
  const t = mapLexiconTermToEnglish(el);
  if (t && t !== el) {
    const out = `${t} peroxide`;
    dbg("[trySmartPeroxideTranslation]", { in: name, out });
    return out;
  }
  return null;
}

/* =========================
   TRANSLATE API + PUBCHEM
========================= */
/** Chama sua API proxy com mirrors (sem lib externa) */
async function callTranslateAPI(q: string, source: "pt" | "es" | "fr" | "auto", target: "en"): Promise<string | null> {
  try {
    const res = await fetch("/api/translate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ q, source, target }),
    });
    if (!res.ok) return null;
    const data: { translatedText?: string } = await res.json();
    return (data.translatedText || "").trim() || null;
  } catch {
    return null;
  }
}

/** Verifica se o nome resolve na PubChem */
async function pubchemHasName(name: string): Promise<boolean> {
  const base = "https://pubchem.ncbi.nlm.nih.gov/rest/pug";
  const candidates = [
    encodeURIComponent(name),
    name.replace(/ /g, "%20"),
    name.replace(/ /g, "+"),
  ];
  for (const enc of candidates) {
    const url = `${base}/compound/name/${enc}/cids/TXT`;
    try {
      const r = await fetch(url, { cache: "no-store" });
      if (r.ok) {
        const txt = (await r.text()).trim();
        if (txt && /^\d+/.test(txt)) return true;
      }
    } catch {
      // ignora
    }
  }
  return false;
}

/** Gera variações conhecidas (ferric ⇄ iron(III), ferrous ⇄ iron(II), cupric ⇄ copper(II), cuprous ⇄ copper(I)) */
function generateNameVariants(en: string): string[] {
  const variants: string[] = [];
  const s = en.toLowerCase().trim();

  const mapPairs: Array<[RegExp, string]> = [
    [/ferric oxide\b/, "iron(III) oxide"],
    [/ferrous oxide\b/, "iron(II) oxide"],
    [/cupric oxide\b/, "copper(II) oxide"],
    [/cuprous oxide\b/, "copper(I) oxide"],
    [/iron\(iii\) oxide\b/, "ferric oxide"],
    [/iron\(ii\) oxide\b/, "ferrous oxide"],
    [/copper\(ii\) oxide\b/, "cupric oxide"],
    [/copper\(i\) oxide\b/, "cuprous oxide"],
  ];

  for (const [re, rep] of mapPairs) {
    if (re.test(s)) variants.push(s.replace(re, rep));
  }
  return Array.from(new Set(variants));
}

/* =========================
   PÓS-PROCESSAMENTO
========================= */
function postProcessChemicalTranslation(translated: string): string {
  let corrected = stripDiacritics(translated);

  // "X of Y" → "Y X"
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

/* =========================
   FUNÇÃO PRINCIPAL
========================= */
export async function translateNameToEnglish(name: string): Promise<string> {
  const normalized = name.trim().toLowerCase();
  if (!normalized) return name;

  if (isDebug()) console.group(`[translateNameToEnglish] "${name}"`);

  // 1) Dicionário local (orgânico/inorgânico/coordenação)
  const localMatch = findInChemicalDictionary(normalized);
  if (localMatch) {
    dbg("1️⃣ Dicionário local →", localMatch);
    if (isDebug()) console.groupEnd();
    return localMatch;
  }

  // 2) Smart patterns (rápidos, sem rede)
  const smarters: Array<() => Promise<string | null> | string | null> = [
    () => trySmartAcidTranslation(name),
    () => trySmartPeroxideTranslation(name),
    () => trySmartOxideTranslation(name),
    () => trySmartHydroxideTranslation(name),
    () => trySmartSaltTranslation(name),
    () => trySmartBinaryTranslation(name),
  ];

  for (const fn of smarters) {
    const r = await fn();
    if (r) {
      const cleaned = normalizeToASCII(postProcessChemicalTranslation(r));
      dbg("2️⃣ Smart pattern →", cleaned);
      // verifica PubChem; se bater, retorna
      if (await pubchemHasName(cleaned)) {
        if (isDebug()) console.groupEnd();
        return cleaned;
      }
      // tenta variações conhecidas (ferric/iron(III), etc.)
      const variants = generateNameVariants(cleaned);
      for (const v of variants) {
        if (await pubchemHasName(v)) {
          dbg("2️⃣✅ Smart pattern (variante) →", v);
          if (isDebug()) console.groupEnd();
          return v;
        }
      }
      // se não bateu, continua o fluxo (deixa a API tentar algo melhor)
      dbg("2️⃣ Smart pattern não encontrou no PubChem, segue…");
    }
  }

  // 3) Cache (apenas se diferente do original)
  const cache = loadCache();
  cleanOldEntries(cache);
  const cached = cache[normalized];
  if (cached && cached.translated && cached.translated !== name) {
    dbg("3️⃣ Cache →", cached.translated);
    if (isDebug()) console.groupEnd();
    return cached.translated;
  }

  // 4) API externa
  const srcLang = detectLanguage(name);
  let translated = (await callTranslateAPI(name, srcLang, "en")) || name;
  translated = postProcessChemicalTranslation(translated);
  translated = normalizeToASCII(translated);
  dbg("4️⃣ API →", translated);

  // 4.1) Verifica PubChem; se não bater, tenta variações conhecidas
  let finalOut = translated;
  let ok = await pubchemHasName(finalOut);
  if (!ok) {
    const variants = generateNameVariants(finalOut);
    for (const v of variants) {
      if (await pubchemHasName(v)) {
        finalOut = v;
        ok = true;
        dbg("4️⃣✅ API (variante) →", v);
        break;
      }
    }
  }

  // 5) Cacheia (inclusive se não bater—para evitar loops; mas preferimos cachear a melhor variante encontrada)
  cache[normalized] = { translated: finalOut, timestamp: Date.now() };
  saveCache(cache);

  if (isDebug()) console.groupEnd();
  return finalOut;
}

/* =========================
   UTIL PÚBLICA
========================= */
export function clearTranslationCache() {
  try {
    localStorage.removeItem(CACHE_KEY);
    console.info("[translateNameToEnglish] Cache limpo.");
  } catch {
    console.warn("[translateNameToEnglish] Falha ao limpar cache.");
  }
}
