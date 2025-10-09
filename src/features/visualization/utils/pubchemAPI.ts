import { translateNameToEnglish } from "./translation";
import { isDebug, fetchJsonWithRetry } from "./translation/translationHelpers";
import { generateNameVariants } from "./translation/translationPubChem";

const PUBCHEM = "https://pubchem.ncbi.nlm.nih.gov/rest/pug";

/** 🔤 Normaliza texto removendo acentos e caracteres não ASCII */
function normalizeToASCII(text: string): string {
  const result = text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\x00-\x7F]/g, "")
    .replace(/\s{2,}/g, " ")
    .trim();
  console.debug(`[normalizeToASCII] "${text}" → "${result}"`);
  return result;
}

/** Detectores */
function isFormula(input: string): boolean {
  return /^([A-Z][a-z]?\d*|\(|\))+$/u.test(input.replace(/\s+/g, ""));
}
function isSmiles(input: string): boolean {
  const hasSmilesChars = /[=#@\[\]\(\)\\\/]/.test(input);
  const hasWhitespaceOrComma = /[\s,;]/.test(input);
  const isOnlyDigits = /^\d+$/.test(input);
  return !hasWhitespaceOrComma && !isOnlyDigits && hasSmilesChars;
}

async function fetchTxt(url: string, _silent404 = false): Promise<string | null> {
  try {
    if (isDebug?.()) console.debug(`[fetchTxt] ${url}`);
    const res = await fetch(url, { cache: "no-store" });

    if (!res.ok) {
      // Ignora 404 e 503 silenciosamente, evita spam no console
      if (res.status === 404 || res.status === 503) {
        if (isDebug?.()) console.debug(`[fetchTxt] ${res.status} ignorado: ${url}`);
        return null;
      }
      return null;
    }

    const txt = (await res.text()).trim();
    return txt || null;
  } catch (err) {
    if (isDebug?.()) console.debug(`[fetchTxt] erro: ${(err as Error).message}`);
    return null;
  }
}

/**
 * Miss cache para nomes (evita bombardear a API após falhas)
 */
const MISS_CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutos
// Miss caches separados por tipo para evitar interferência entre pipelines
const missCacheSmiles = new Map<string, number>();
const missCacheCid = new Map<string, number>();

function recentlyMissedSmiles(name: string): boolean {
  const key = name.toLowerCase().trim();
  const ts = missCacheSmiles.get(key);
  if (!ts) return false;
  if (Date.now() - ts < MISS_CACHE_TTL_MS) return true;
  missCacheSmiles.delete(key);
  return false;
}

function markMissSmiles(name: string): void {
  const key = name.toLowerCase().trim();
  missCacheSmiles.set(key, Date.now());
}

function recentlyMissedCid(name: string): boolean {
  const key = name.toLowerCase().trim();
  const ts = missCacheCid.get(key);
  if (!ts) return false;
  if (Date.now() - ts < MISS_CACHE_TTL_MS) return true;
  missCacheCid.delete(key);
  return false;
}

function markMissCid(name: string): void {
  const key = name.toLowerCase().trim();
  missCacheCid.set(key, Date.now());
}

/** SMILES */
async function getSmilesFromCid(cid: string): Promise<string | null> {
  const url = `${PUBCHEM}/compound/cid/${encodeURIComponent(cid)}/property/IsomericSMILES/TXT`;
  return fetchTxt(url);
}

/** 🔥 Tradução automática + múltiplas estratégias de codificação */
async function getSmilesByNameWithTranslation(name: string): Promise<string | null> {
  console.group(`[getSmilesByNameWithTranslation] Processando: "${name}"`);
  // Deduplicação local por chamada: evita repetir a mesma URL dentro desta execução
  const triedUrls = new Set<string>();
  const alreadyTried = (url: string) => {
    if (triedUrls.has(url)) return true;
    triedUrls.add(url);
    return false;
  };
  
  if (recentlyMissedSmiles(name)) {
    if (isDebug?.()) console.debug("⏭️ pulando (recent miss cache)");
    console.groupEnd();
    return null;
  }

  console.log("🔄 Etapa 1: Tradução");
  const translated = await translateNameToEnglish(name);
  console.log(`   Traduzido: "${translated}"`);

  const normalized = /[^\x00-\x7F]/.test(translated) ? normalizeToASCII(translated) : translated;
  const trimmed = normalized.trim();

  const encodes = [
    { name: "encodeURIComponent", value: encodeURIComponent(trimmed) },
    { name: "manual %20", value: trimmed.replace(/ /g, "%20") },
    { name: "plus sign", value: trimmed.replace(/ /g, "+") },
  ];

  console.log("🔄 Etapa 3: Tentando estratégias de codificação");
  for (const enc of encodes) {
    const url = `${PUBCHEM}/compound/name/${enc.value}/property/IsomericSMILES/TXT`;
    if (alreadyTried(url)) continue;
    const smiles = await fetchTxt(url, true);
    if (smiles) {
      console.log(`   ✅ SUCESSO com ${enc.name}!`);
      console.groupEnd();
      return smiles;
    }
  }

  // tenta variantes comuns (ex.: ammonia)
  const variants = generateNameVariants(trimmed);
  for (const v of variants) {
    const url = `${PUBCHEM}/compound/name/${encodeURIComponent(v)}/property/IsomericSMILES/TXT`;
    if (alreadyTried(url)) continue;
    const smiles = await fetchTxt(url, true);
    if (smiles) {
      console.log(`   ✅ SUCESSO com variante "${v}"`);
      console.groupEnd();
      return smiles;
    }
  }

  // fallback com nome original (ainda assim silenciado)
  const fallbackUrl = `${PUBCHEM}/compound/name/${encodeURIComponent(name.trim())}/property/IsomericSMILES/TXT`;
  if (!alreadyTried(fallbackUrl)) {
    const result = await fetchTxt(fallbackUrl, true);
    if (result) {
      console.groupEnd();
      return result;
    }
  }

  // marca como "miss" por um tempo
  markMissSmiles(name);
  console.groupEnd();
  return null;
}

export async function getSmiles(query: string): Promise<string> {
  console.group(`[getSmiles] Query: "${query}"`);
  const q = query.trim();

  // Teste 1: É um CID numérico?
  if (/^\d+$/.test(q)) {
    console.log("🔍 Detectado como CID numérico");
    const smiles = await getSmilesFromCid(q);
    if (smiles) {
      console.groupEnd();
      return smiles;
    }
  }

  // Teste 2: É uma fórmula?
  if (isFormula(q)) {
    console.log("🔍 Detectado como fórmula molecular");
    const cidTxt = await fetchTxt(`${PUBCHEM}/compound/fastformula/${encodeURIComponent(q)}/cids/TXT`);
    const cid = cidTxt?.split(/\s+/)[0];
    if (cid) {
      const smiles = await getSmilesFromCid(cid);
      if (smiles) {
        console.groupEnd();
        return smiles;
      }
    }
  }

  // Teste 3: É SMILES?
  if (isSmiles(q)) {
    console.log("🔍 Detectado como SMILES");
    console.groupEnd();
    return q;
  }

  // Teste 4: É um nome
  console.log("🔍 Tratando como nome químico");
  const smiles = await getSmilesByNameWithTranslation(q);
  if (smiles) {
    console.groupEnd();
    return smiles;
  }

  console.groupEnd();
  throw new Error("Não foi possível obter SMILES na PubChem para esta entrada.");
}

/** CID helpers */
async function getCidFromSmiles(smiles: string): Promise<string | null> {
  const url = `${PUBCHEM}/compound/smiles/${encodeURIComponent(smiles)}/cids/TXT`;
  return fetchTxt(url);
}

async function getCidFromName(name: string): Promise<string | null> {
  console.groupCollapsed(`[getCidFromName] Nome: "${name}"`);
  // Deduplicação local por chamada
  const triedUrls = new Set<string>();
  const alreadyTried = (url: string) => {
    if (triedUrls.has(url)) return true;
    triedUrls.add(url);
    return false;
  };
  
  if (recentlyMissedCid(name)) {
    if (isDebug?.()) console.debug("⏭️ pulando (recent miss cache)");
    console.groupEnd();
    return null;
  }

  const translated = await translateNameToEnglish(name);
  const normalized = normalizeToASCII(translated).trim();

  const strategies = [
    encodeURIComponent(normalized),
    normalized.replace(/ /g, "%20"),
    normalized.replace(/ /g, "+"),
  ];

  // 1) descrição JSON com retry leve
  for (const enc of strategies) {
    const descUrl = `${PUBCHEM}/compound/name/${enc}/description/JSON`;
    if (alreadyTried(descUrl)) continue;
    const json = await fetchJsonWithRetry<{ InformationList?: { Information?: Array<{ CID?: number | string }> } }>(
      descUrl,
      { retries: 1, backoffMs: 300 }
    );
    const cid = json?.InformationList?.Information?.[0]?.CID;
    if (cid) {
      console.log(`✅ CID ${cid} via descrição`);
      console.groupEnd();
      return String(cid);
    }
  }

  // 2) propriedade → SMILES → CID
  for (const enc of strategies) {
    const smilesUrl = `${PUBCHEM}/compound/name/${enc}/property/IsomericSMILES/TXT`;
    if (alreadyTried(smilesUrl)) continue;
    const smilesTxt = await fetchTxt(smilesUrl, true);
    if (smilesTxt) {
      const cidFromSmiles = await getCidFromSmiles(smilesTxt);
      if (cidFromSmiles) {
        console.log(`✅ CID via SMILES`);
        console.groupEnd();
        return cidFromSmiles.split(/\s+/)[0];
      }
    }
  }

  // 3) fallback clássico cids/TXT
  for (const enc of strategies) {
    const cidUrl = `${PUBCHEM}/compound/name/${enc}/cids/TXT`;
    if (alreadyTried(cidUrl)) continue;
    const cid = await fetchTxt(cidUrl, true);
    if (cid) {
      console.log(`✅ CID via fallback`);
      console.groupEnd();
      return cid.split(/\s+/)[0];
    }
  }

  // variantes (ex.: ammonia)
  const vars = generateNameVariants(normalized);
  for (const v of vars) {
    const cidUrl = `${PUBCHEM}/compound/name/${encodeURIComponent(v)}/cids/TXT`;
    if (alreadyTried(cidUrl)) continue;
    const cid = await fetchTxt(cidUrl, true);
    if (cid) {
      console.log(`✅ CID via variante "${v}"`);
      console.groupEnd();
      return cid.split(/\s+/)[0];
    }
  }

  markMissCid(name);
  console.groupEnd();
  return null;
}

async function getCidFromFormula(formula: string): Promise<string | null> {
  const url = `${PUBCHEM}/compound/fastformula/${encodeURIComponent(formula)}/cids/TXT`;
  return fetchTxt(url);
}

async function getCompoundNameFromCid(cid: string): Promise<string | null> {
  const url = `${PUBCHEM}/compound/cid/${encodeURIComponent(cid)}/property/IUPACName/TXT`;
  const iupacName = await fetchTxt(url);
  if (iupacName) return iupacName;

  const titleUrl = `${PUBCHEM}/compound/cid/${encodeURIComponent(cid)}/property/Title/TXT`;
  return fetchTxt(titleUrl);
}

async function resolveCid(query: string): Promise<string> {
  const q = query.trim();
  if (/^\d+$/.test(q)) return q;
  if (isFormula(q)) {
    const cid = await getCidFromFormula(q);
    if (cid) return cid.split(/\s+/)[0];
  }
  if (isSmiles(q)) {
    const cid = await getCidFromSmiles(q);
    if (cid) return cid.split(/\s+/)[0];
  }
  {
    const cidTxt = await getCidFromName(q);
    if (cidTxt) return cidTxt.split(/\s+/)[0];
  }
  {
    const cidTxt = await getCidFromName(q.toLowerCase());
    if (cidTxt) return cidTxt.split(/\s+/)[0];
  }
  throw new Error("Não foi possível resolver um CID na PubChem para esta entrada.");
}

/** SDFs */
async function getSdf2DByCid(cid: string): Promise<string> {
  const url2d = `${PUBCHEM}/compound/cid/${encodeURIComponent(cid)}/SDF`;
  const sdf2d = await fetchTxt(url2d);
  if (sdf2d) {
    const compoundName = await getCompoundNameFromCid(cid);
    const nameInfo = compoundName ? ` (${compoundName})` : "";
    console.info(`✅ Estrutura 2D obtida para CID ${cid}${nameInfo}`);
    return sdf2d;
  }
  throw new Error(`Não foi possível obter SDF 2D na PubChem para o CID ${cid}.`);
}

async function getSdf3DByCid(cid: string): Promise<string> {
  const url3d = `${PUBCHEM}/compound/cid/${encodeURIComponent(cid)}/SDF?record_type=3d`;
  const sdf3d = await fetchTxt(url3d);
  if (sdf3d) {
    const compoundName = await getCompoundNameFromCid(cid);
    const nameInfo = compoundName ? ` (${compoundName})` : "";
    console.info(`✅ Estrutura 3D obtida para CID ${cid}${nameInfo}`);
    return sdf3d;
  }
  throw new Error(`Estrutura 3D não disponível para CID ${cid}.`);
}

async function getSdfByCid(cid: string): Promise<string> {
  const url3d = `${PUBCHEM}/compound/cid/${encodeURIComponent(cid)}/SDF?record_type=3d`;
  const sdf3d = await fetchTxt(url3d, true);
  if (sdf3d) {
    const compoundName = await getCompoundNameFromCid(cid);
    const nameInfo = compoundName ? ` (${compoundName})` : "";
    console.info(`✅ Estrutura 3D obtida para CID ${cid}${nameInfo}`);
    return sdf3d;
  }

  const compoundName = await getCompoundNameFromCid(cid);
  const nameInfo = compoundName ? ` (${compoundName})` : "";
  console.info(`ℹ️ Estrutura 3D não disponível para CID ${cid}${nameInfo}, usando 2D...`);

  const url2d = `${PUBCHEM}/compound/cid/${encodeURIComponent(cid)}/SDF`;
  const sdf2d = await fetchTxt(url2d);
  if (sdf2d) {
    console.info(`✅ Estrutura 2D obtida para CID ${cid}${nameInfo}`);
    return sdf2d;
  }

  throw new Error(`Não foi possível obter SDF (3D ou 2D) na PubChem para o CID ${cid}.`);
}

export async function getSdf2D(query: string): Promise<string> {
  const cid = await resolveCid(query);
  return getSdf2DByCid(cid);
}
export async function getSdf3D(query: string): Promise<string> {
  const cid = await resolveCid(query);
  return getSdf3DByCid(cid);
}
export async function getSdf(query: string): Promise<string> {
  const cid = await resolveCid(query);
  return getSdfByCid(cid);
}