import { findInChemicalDictionary, mapLexiconTermToEnglish } from "@/features/visualization/utils/chemicalDictionary";

const CACHE_KEY = "molclass:translation-cache";
const CACHE_TTL_DAYS = 30;

/** 🧰 Carrega o cache atual */
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

/** 💾 Salva o cache atualizado */
function saveCache(cache: Record<string, { translated: string; timestamp: number }>) {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify(cache));
  } catch {
    console.warn("[translateNameToEnglish] Falha ao salvar cache");
  }
}

/** 🧹 Remove entradas antigas (TTL > 30 dias) */
function cleanOldEntries(cache: Record<string, { translated: string; timestamp: number }>) {
  const now = Date.now();
  const ttlMs = CACHE_TTL_DAYS * 24 * 60 * 60 * 1000;
  for (const key in cache) {
    if (now - cache[key].timestamp > ttlMs) {
      delete cache[key];
    }
  }
}

/**
 * 🌍 Traduz um nome químico para inglês.
 * 1. Verifica o dicionário local
 * 2. Verifica o cache
 * 3. Faz fallback para a API /api/translate
 * 4. Corrige padrões químicos comuns
 * 5. Usa heurística caso o tradutor falhe
 */
export async function translateNameToEnglish(name: string): Promise<string> {
  const normalized = name.trim().toLowerCase();
  if (!normalized) return name;

  // 📚 1️⃣ Verifica no dicionário químico local modular
  const localMatch = findInChemicalDictionary(normalized);
  if (localMatch) {
    console.info(`[translateNameToEnglish] (dicionário local) "${name}" → "${localMatch}"`);
    return localMatch;
  }

  // 💾 2️⃣ Verifica no cache
  // 💾 2️⃣ Verifica no cache
const cache = loadCache();
cleanOldEntries(cache);
const cached = cache[normalized];

// ⚠️ Só usa o cache se a tradução for diferente do original
if (cached && cached.translated !== name) {
  console.info(`[translateNameToEnglish] (cache) "${name}" → "${cached.translated}"`);
  return cached.translated;
}


  // 🌍 3️⃣ Faz fallback para tradução via API
  let translated = name;
  try {
    const response = await fetch("/api/translate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ q: name, source: "auto", target: "en" }),
    });

    if (response.ok) {
      const data = await response.json();
      translated = data.translatedText?.trim() || name;

      // 🔬 Corrige padrões de tradução automática inadequados
      translated = postProcessChemicalTranslation(name, translated);
      console.info(`[translateNameToEnglish] (API) "${name}" → "${translated}"`);
    } else {
      console.warn(
        `[translateNameToEnglish] API retornou ${response.status} (${response.statusText})`
      );
    }
  } catch (error) {
    console.warn("[translateNameToEnglish] Falha na tradução via API:", error);
  }

  // 🧠 4️⃣ Heurística extra: tenta tradução manual básica se o tradutor falhar
  if (translated === name) {
    const heuristic = heuristicChemicalTranslation(name);
    if (heuristic !== name) {
      translated = heuristic;
      console.info(`[translateNameToEnglish] (heurística) "${name}" → "${translated}"`);
    }
  }

  // 💾 5️⃣ Armazena no cache (traduzido ou original)
  cache[normalized] = { translated, timestamp: Date.now() };
  saveCache(cache);

  if (translated === name) {
    console.warn(
      `[translateNameToEnglish] Nenhuma tradução encontrada. Mantendo nome original: "${name}"`
    );
  }

  return translated;
}

/**
 * 🔬 Corrige padrões comuns de tradução automática inadequados para nomes químicos.
 * Exemplo: "nitrate of sodium" → "sodium nitrate"
 */
function postProcessChemicalTranslation(original: string, translated: string): string {
  let corrected = translated;

  // Corrige inversões com "of"
  if (/\bof\b/i.test(corrected)) {
    const parts = corrected.split(/\bof\b/i).map((p) => p.trim());
    if (parts.length === 2) {
      corrected = `${parts[1]} ${parts[0]}`.trim();
    }
  }

  // Remove artigos e espaços desnecessários
  corrected = corrected
    .replace(/\b(the|a|an)\b/gi, "")
    .replace(/\s{2,}/g, " ")
    .trim();

  // Normaliza capitalização
  corrected = corrected.toLowerCase();

  // Correções específicas adicionais
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
 * 🧠 Heurística simples para traduzir compostos inorgânicos comuns
 * ex: "nitrato de chumbo" → "lead nitrate"
 */
function heuristicChemicalTranslation(term: string): string {
  const words = term.toLowerCase().split(" de ");
  if (words.length === 2) {
    const [anionic, cationic] = words;

    const a = mapLexiconTermToEnglish(anionic) || anionic;
    const b = mapLexiconTermToEnglish(cationic) || cationic;

    return `${b} ${a}`;
  }

  return term;
}

/** 🧽 Função para limpar cache manualmente */
export function clearTranslationCache() {
  try {
    localStorage.removeItem(CACHE_KEY);
    console.info("[translateNameToEnglish] Cache de tradução limpo com sucesso.");
  } catch {
    console.warn("[translateNameToEnglish] Falha ao limpar cache de tradução.");
  }
}
