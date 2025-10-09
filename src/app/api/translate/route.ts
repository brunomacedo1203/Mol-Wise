import { NextResponse } from "next/server";
import { LEXICON } from "@/features/visualization/utils/chemicalDictionary/lexicon";

type TranslateResponse = {
  translatedText: string;
  [key: string]: unknown;
};

/** 🧠 Cache em memória com timestamps para expiração */
interface TimedCache extends Map<string, string> {
  _timestamps?: Record<string, number>;
}

const translationCache: TimedCache = new Map();
translationCache._timestamps = {};
const CACHE_TTL_MS = 1000 * 60 * 30; // 30 minutos

let cleanupScheduled = false;
function scheduleCacheCleanup() {
  if (!cleanupScheduled) {
    cleanupScheduled = true;
    setTimeout(() => {
      const now = Date.now();
      for (const [key] of translationCache.entries()) {
        const entryTime = translationCache._timestamps?.[key];
        if (entryTime && now - entryTime > CACHE_TTL_MS) {
          translationCache.delete(key);
          if (translationCache._timestamps) {
            delete translationCache._timestamps[key];
          }
        }
      }
      cleanupScheduled = false;
    }, CACHE_TTL_MS);
  }
}

/**
 * 🌍 API de tradução química inteligente
 * - Prioriza o léxico local (LEXICON)
 * - Usa mirrors livres do LibreTranslate como fallback
 * - Corrige padrões comuns de tradução incorreta
 * - Implementa heurística para compostos binários (ex: “nitrato de chumbo”)
 * - Inclui fallback final com Google Translate público
 * - Armazena resultados em cache para acelerar futuras traduções
 */
export async function POST(req: Request) {
  try {
    const { q, source = "auto", target = "en" } = await req.json();

    if (!q || typeof q !== "string") {
      return NextResponse.json({ error: "Missing text to translate" }, { status: 400 });
    }

    const original = q.trim();
    console.info(`[translateNameToEnglish] (API) Recebido: "${original}"`);

    /** 0️⃣ Verifica cache */
    const cacheKey = `${source}:${target}:${original.toLowerCase()}`;
    const cached = translationCache.get(cacheKey);
    if (cached) {
      console.info(`[translateNameToEnglish] (cache) "${original}" → "${cached}"`);
      return NextResponse.json({ translatedText: cached });
    }

    /** 1️⃣ Verifica primeiro no léxico local */
    const lexiconMatch = findInLexicon(original);
    if (lexiconMatch) {
      console.info(`[translateNameToEnglish] (lexicon) "${original}" → "${lexiconMatch}"`);
      translationCache.set(cacheKey, lexiconMatch);
      translationCache._timestamps![cacheKey] = Date.now();
      return NextResponse.json({ translatedText: lexiconMatch });
    }

    /** 2️⃣ Fallback para tradutores externos (LibreTranslate + Google) */
    const endpoints = [
      "https://libretranslate.com/translate", // mirror principal
      "https://translate.argosopentech.com/translate", // mirror alternativo
      "https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=en&dt=t&q=", // fallback Google
    ];

    let translated = original;
    let success = false;

    for (const endpoint of endpoints) {
      try {
        let res: Response;

        // 🟦 Caso especial: Google Translate (GET simples)
        if (endpoint.includes("googleapis")) {
          res = await fetch(`${endpoint}${encodeURIComponent(original)}`);
          if (res.ok) {
            const text = await res.text();
            const match = text.match(/"([^"]+)"/);
            if (match) {
              translated = match[1];
              success = true;
              console.info(`[translateNameToEnglish] (Google) "${original}" → "${translated}"`);
              break;
            }
          }
          continue;
        }

        // 🌐 Requisição padrão (LibreTranslate / Argos)
        res = await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ q: original, source, target, format: "text" }),
        });

        const text = await res.text();

        // ⚠️ Alguns mirrors retornam HTML (páginas de erro)
        if (text.trim().startsWith("<")) {
          console.warn(`[translateNameToEnglish] ${endpoint} retornou HTML em vez de JSON.`);
          continue;
        }

        const data = JSON.parse(text) as TranslateResponse;
        translated = data.translatedText?.trim() || original;
        success = true;
        console.info(`[translateNameToEnglish] (API) "${original}" → "${translated}" via ${endpoint}`);
        break;
      } catch (err) {
        console.warn(`[translateNameToEnglish] Erro ao tentar ${endpoint}:`, err);
      }
    }

    /** 3️⃣ Corrige padrões de tradução automáticos */
    translated = postProcessChemicalTranslation(original, translated);

    /** 4️⃣ Fallback heurístico final (ex: “nitrato de chumbo”) */
    if (!success || translated === original) {
      const heuristic = heuristicChemicalTranslation(original);
      if (heuristic !== original) {
        translated = heuristic;
        console.info(`[translateNameToEnglish] (heurística) "${original}" → "${translated}"`);
      }
    }

    /** 🧠 Armazena no cache com timestamp */
    translationCache.set(cacheKey, translated);
    translationCache._timestamps![cacheKey] = Date.now();
    scheduleCacheCleanup();

    return NextResponse.json({ translatedText: translated });
  } catch (error) {
    console.error("[translateNameToEnglish] Erro interno:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

/**
 * 🔍 Busca no léxico local (suporta compostos “X de Y”)
 */
function findInLexicon(term: string): string | null {
  const normalized = normalize(term);

  // Termo simples
  if (LEXICON[normalized]?.english) {
    return LEXICON[normalized].english;
  }

  // Termo composto
  if (normalized.includes(" de ")) {
    const [partA, partB] = normalized.split(" de ").map(normalize);
    const a = LEXICON[partA]?.english;
    const b = LEXICON[partB]?.english;
    if (a && b) return `${b} ${a}`;
  }

  return null;
}

/**
 * 🔤 Normaliza o texto removendo acentos e espaços duplicados
 */
function normalize(term: string): string {
  return term
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, ""); // remove acentos
}

/**
 * 🔬 Corrige padrões errados comuns do tradutor automático
 * Ex: "nitrate of sodium" → "sodium nitrate"
 */
function postProcessChemicalTranslation(original: string, translated: string): string {
  let corrected = translated;

  // Corrige inversões com "of"
  if (/\bof\b/i.test(corrected)) {
    const parts = corrected.split(/\bof\b/i).map((p) => p.trim());
    if (parts.length === 2) corrected = `${parts[1]} ${parts[0]}`.trim();
  }

  // Remove artigos e espaços extras
  corrected = corrected
    .replace(/\b(the|a|an)\b/gi, "")
    .replace(/\s{2,}/g, " ")
    .trim()
    .toLowerCase();

  // Correções específicas
  const replacements: Record<string, string> = {
    "acid sulfuric": "sulfuric acid",
    "acid nitric": "nitric acid",
    "acid hydrochloric": "hydrochloric acid",
    "acid phosphoric": "phosphoric acid",
    "acid acetic": "acetic acid",
    "hydroxide of ammonia": "ammonium hydroxide",
  };

  for (const key in replacements) {
    const regex = new RegExp(`\\b${key}\\b`, "gi");
    corrected = corrected.replace(regex, replacements[key]);
  }

  return corrected;
}

/**
 * 🧠 Fallback simples: usa o LEXICON para montar compostos “X de Y”
 */
function heuristicChemicalTranslation(term: string): string {
  const parts = term.toLowerCase().split(" de ");
  if (parts.length === 2) {
    const [anionic, cationic] = parts;
    const a = LEXICON[normalize(anionic)]?.english || anionic;
    const b = LEXICON[normalize(cationic)]?.english || cationic;
    return `${b} ${a}`;
  }

  return term;
}
