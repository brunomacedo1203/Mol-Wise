import { translateNameToEnglish } from "./translateName";

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

async function fetchTxt(url: string, silent404 = false): Promise<string | null> {
  try {
    console.debug(`[fetchTxt] Tentando: ${url}`);
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) {
      if (!silent404) {
        console.warn(`[fetchTxt] ❌ ${res.status} ${res.statusText} - ${url}`);
      }
      if (res.status === 404 && silent404) return null;
      return null;
    }
    const txt = (await res.text()).trim();
    if (txt) {
      console.debug(`[fetchTxt] ✅ Sucesso: ${url}`);
    }
    return txt || null;
  } catch (error) {
    if (!silent404) console.error(`[fetchTxt] Erro ao buscar ${url}:`, error);
    return null;
  }
}

/** SMILES */
async function getSmilesFromCid(cid: string): Promise<string | null> {
  const url = `${PUBCHEM}/compound/cid/${encodeURIComponent(cid)}/property/IsomericSMILES/TXT`;
  return fetchTxt(url);
}

/** 🔥 Tradução automática + múltiplas estratégias de codificação */
async function getSmilesByNameWithTranslation(name: string): Promise<string | null> {
  console.group(`[getSmilesByNameWithTranslation] Processando: "${name}"`);
  
  console.log("🔄 Etapa 1: Tradução");
  const translated = await translateNameToEnglish(name);
  console.log(`   Traduzido: "${translated}"`);
  
  console.log("🔄 Etapa 2: Verificando se precisa normalizar");
  console.log(`   Contém caracteres não-ASCII: ${/[^\x00-\x7F]/.test(translated)}`);
  
  // IMPORTANTE: Só normaliza se realmente tiver caracteres não-ASCII
  const normalized = /[^\x00-\x7F]/.test(translated) 
    ? normalizeToASCII(translated) 
    : translated;
  console.log(`   Normalizado: "${normalized}"`);
  
  const trimmed = normalized.trim();

  // 🔍 Estratégias de codificação
  const strategies = [
    { name: "encodeURIComponent", value: encodeURIComponent(trimmed) },
    { name: "manual %20", value: trimmed.replace(/ /g, "%20") },
    { name: "plus sign", value: trimmed.replace(/ /g, "+") },
  ];

  console.log("🔄 Etapa 3: Tentando estratégias de codificação");
  for (const strategy of strategies) {
    const url = `${PUBCHEM}/compound/name/${strategy.value}/property/IsomericSMILES/TXT`;
    console.log(`   Tentando ${strategy.name}: ${strategy.value}`);
    const smiles = await fetchTxt(url, true);
    if (smiles) {
      console.log(`   ✅ SUCESSO com ${strategy.name}!`);
      console.groupEnd();
      return smiles;
    }
  }

  // fallback para o original
  console.log("🔄 Etapa 4: Fallback com nome original");
  const fallbackUrl = `${PUBCHEM}/compound/name/${encodeURIComponent(name.trim())}/property/IsomericSMILES/TXT`;
  const result = await fetchTxt(fallbackUrl, true);
  
  console.groupEnd();
  return result;
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
  console.group(`[getCidFromName] Nome: "${name}"`);
  
  const translated = await translateNameToEnglish(name);
  console.log(`Traduzido: "${translated}"`);
  
  const normalized = normalizeToASCII(translated);
  console.log(`Normalizado: "${normalized}"`);
  
  const trimmed = normalized.trim();

  const strategies = [
    encodeURIComponent(trimmed),
    trimmed.replace(/ /g, "%20"),
    trimmed.replace(/ /g, "+"),
  ];

  for (const encoded of strategies) {
    try {
      // 1️⃣ Tenta via descrição JSON (mais confiável)
      const descUrl = `${PUBCHEM}/compound/name/${encoded}/description/JSON`;
      const descRes = await fetch(descUrl, { cache: "no-store" });
      if (descRes.ok) {
        const json = await descRes.json();
        const cid = json?.InformationList?.Information?.[0]?.CID;
        if (cid) {
          console.log(`✅ CID ${cid} encontrado via descrição`);
          console.groupEnd();
          return String(cid);
        }
      }

      // 2️⃣ Tenta via propriedade (antiga)
      const smilesUrl = `${PUBCHEM}/compound/name/${encoded}/property/IsomericSMILES/TXT`;
      const smilesTxt = await fetchTxt(smilesUrl, true);
      if (smilesTxt) {
        const cidFromSmiles = await getCidFromSmiles(smilesTxt);
        if (cidFromSmiles) {
          console.log(`✅ CID encontrado via SMILES`);
          console.groupEnd();
          return cidFromSmiles;
        }
      }

      // 3️⃣ Fallback clássico
      const cidUrl = `${PUBCHEM}/compound/name/${encoded}/cids/TXT`;
      const cid = await fetchTxt(cidUrl, true);
      if (cid) {
        console.log(`✅ CID encontrado via fallback`);
        console.groupEnd();
        return cid;
      }
    } catch (err) {
      console.warn(`Falha com encoding ${encoded}:`, err);
    }
  }

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