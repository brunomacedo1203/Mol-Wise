// src/features/visualization/utils/translation/translationHelpers.ts

const CACHE_KEY = "molclass:translation-cache";
const CACHE_TTL_DAYS = 30;

/* -------------------------------
   🔧 LOGGING E DEBUG
-------------------------------- */
export function isDebug(): boolean {
  try {
    return localStorage.getItem("DEBUG_TRANSLATION") === "true";
  } catch {
    return false;
  }
}

export function dbg(label: string, ...args: unknown[]) {
  if (isDebug()) console.info(label, ...args);
}

/* -------------------------------
   💾 CACHE MANAGEMENT
-------------------------------- */
export function loadCache(): Record<string, { translated: string; timestamp: number }> {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return {};
    const cache = JSON.parse(raw);
    return typeof cache === "object" && cache !== null ? cache : {};
  } catch {
    return {};
  }
}

export function saveCache(cache: Record<string, { translated: string; timestamp: number }>) {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify(cache));
  } catch {
    console.warn("[translateNameToEnglish] Falha ao salvar cache");
  }
}

export function cleanOldEntries(cache: Record<string, { translated: string; timestamp: number }>) {
  const now = Date.now();
  const ttlMs = CACHE_TTL_DAYS * 24 * 60 * 60 * 1000;
  for (const key in cache) {
    if (now - cache[key].timestamp > ttlMs) delete cache[key];
  }
}

/* -------------------------------
   🧹 NORMALIZAÇÃO DE TEXTO
-------------------------------- */
export function stripDiacritics(text: string): string {
  return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

export function normalizeToASCII(text: string): string {
  return stripDiacritics(text)
    .replace(/[^\x00-\x7F]/g, "")
    .replace(/\s{2,}/g, " ")
    .trim();
}

export function lcNoAccents(s: string): string {
  return stripDiacritics(s).toLowerCase().trim();
}

/* -------------------------------
   🌍 DETECÇÃO DE IDIOMA
-------------------------------- */
export function detectLanguage(raw: string): "pt" | "es" | "fr" | "auto" {
  const s = lcNoAccents(raw);
  if (/\b(acido|oxido|hidroxido|peroxido|de)\b/.test(s)) return "pt";
  if (/\b(acide|oxyde|hydroxyde|peroxyde|de)\b/.test(s)) return "fr";
  if (/\b(acido|oxido|hidroxido|peroxido|de)\b/.test(s) && /cloruro|nitrato|sulfato/.test(s)) return "es";
  return "auto";
}

/* -------------------------------
   🌐 API EXTERNA (LibreTranslate)
-------------------------------- */
export async function callTranslateAPI(
  q: string,
  source: "pt" | "es" | "fr" | "auto",
  target: "en"
): Promise<string | null> {
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

/* -------------------------------
   🧼 LIMPAR CACHE PUBLICAMENTE
-------------------------------- */
export function clearTranslationCache() {
  try {
    localStorage.removeItem(CACHE_KEY);
    console.info("[translateNameToEnglish] Cache limpo.");
  } catch {
    console.warn("[translateNameToEnglish] Falha ao limpar cache.");
  }
}

/* ---------------------------------------------
   ✅ Correções comuns de PT sem acentos (ajuda o tradutor)
---------------------------------------------- */
const PT_WORD_FIXES: Record<string, string> = {
  acido: "ácido",
  oxido: "óxido",
  hidroxido: "hidróxido",
  peroxido: "peróxido",
  amonia: "amônia",
  sodio: "sódio",
  potassio: "potássio",
  calcio: "cálcio",
  magnesio: "magnésio",
  aluminio: "alumínio",
  nitrogenio: "nitrogênio",
};

export function applyCommonPtFixes(raw: string): string {
  const tokens = raw.split(/\s+/);
  const fixed = tokens.map((t) => {
    const key = stripDiacritics(t).toLowerCase();
    return PT_WORD_FIXES[key] ? PT_WORD_FIXES[key] : t;
  });
  return fixed.join(" ");
}

/* ---------------------------------------------
   ✅ Tradução com fallbacks de idioma (quando detectLanguage() não ajuda)
---------------------------------------------- */
import type { LanguageCode } from "./translationTypes";

export async function callTranslateAPIWithFallbacks(
  q: string,
  preferred?: LanguageCode
): Promise<string> {
  const tried = new Set<LanguageCode>();
  const order: LanguageCode[] = [];

  if (preferred) order.push(preferred);
  // detecta automaticamente
  const det = detectLanguage(q);
  if (det && !order.includes(det)) order.push(det);
  // fallbacks explícitos
  (['pt', 'es', 'fr', 'auto'] as LanguageCode[]).forEach((lang) => {
    if (!order.includes(lang)) order.push(lang);
  });

  for (const source of order) {
    if (tried.has(source)) continue;
    tried.add(source);
    const out = await callTranslateAPI(q, source, 'en');
    if (out && normalizeToASCII(out) !== normalizeToASCII(q)) {
      return out;
    }
  }
  return q; // não mudou
}

/* ---------------------------------------------
   ✅ Fetch JSON com retry leve para lidar com 503
---------------------------------------------- */
export async function fetchJsonWithRetry<T = unknown>(
  url: string,
  { retries = 1, backoffMs = 250 }: { retries?: number; backoffMs?: number } = {}
): Promise<T | null> {
  for (let i = 0; i <= retries; i++) {
    try {
      const res = await fetch(url, { cache: 'no-store' });
      if (res.ok) {
        return (await res.json()) as T;
      }
      if (res.status === 503 && i < retries) {
        if (isDebug())
          console.info(
            `[fetchJsonWithRetry] 503 → retry ${i + 1} in ${backoffMs}ms: ${url}`
          );
        await new Promise((r) => setTimeout(r, backoffMs));
        continue;
      }
      return null; // 404 e outros tratamos como "não encontrado"
    } catch {
      return null;
    }
  }
  return null;
}
