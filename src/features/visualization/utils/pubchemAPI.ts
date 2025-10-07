import { translateNameToEnglish } from "./translateName";

const PUBCHEM = "https://pubchem.ncbi.nlm.nih.gov/rest/pug";

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
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) {
      if (res.status === 404 && silent404) return null;
      return null;
    }
    const txt = (await res.text()).trim();
    return txt || null;
  } catch (error) {
    if (!silent404) console.error(`Erro ao buscar ${url}:`, error);
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
  const translated = await translateNameToEnglish(name);
  const trimmed = translated.trim();

  // 🔍 Tenta múltiplas estratégias de codificação
  const strategies = [
    // 1. Nome direto (funciona para a maioria)
    encodeURIComponent(trimmed),
    // 2. Substituir espaços por %20 explicitamente
    trimmed.replace(/ /g, "%20"),
    // 3. Substituir espaços por + (alguns endpoints aceitam)
    trimmed.replace(/ /g, "+"),
  ];

  for (const encoded of strategies) {
    const url = `${PUBCHEM}/compound/name/${encoded}/property/IsomericSMILES/TXT`;
    const smiles = await fetchTxt(url, true);
    if (smiles) {
      console.info(`✅ SMILES encontrado para "${name}" usando estratégia: ${encoded}`);
      return smiles;
    }
  }

  // fallback para o original
  const fallbackUrl = `${PUBCHEM}/compound/name/${encodeURIComponent(
    name.trim()
  )}/property/IsomericSMILES/TXT`;
  return fetchTxt(fallbackUrl, true);
}

export async function getSmiles(query: string): Promise<string> {
  const q = query.trim();

  if (/^\d+$/.test(q)) {
    const smiles = await getSmilesFromCid(q);
    if (smiles) return smiles;
  }

  if (isFormula(q)) {
    const cidTxt = await fetchTxt(`${PUBCHEM}/compound/fastformula/${encodeURIComponent(q)}/cids/TXT`);
    const cid = cidTxt?.split(/\s+/)[0];
    if (cid) {
      const smiles = await getSmilesFromCid(cid);
      if (smiles) return smiles;
    }
  }

  if (isSmiles(q)) return q;

  const smiles = await getSmilesByNameWithTranslation(q);
  if (smiles) return smiles;

  throw new Error("Não foi possível obter SMILES na PubChem para esta entrada.");
}

/** CID helpers */
async function getCidFromSmiles(smiles: string): Promise<string | null> {
  const url = `${PUBCHEM}/compound/smiles/${encodeURIComponent(smiles)}/cids/TXT`;
  return fetchTxt(url);
}

async function getCidFromName(name: string): Promise<string | null> {
  const translated = await translateNameToEnglish(name);
  const trimmed = translated.trim();

  // 🔍 Tenta múltiplas estratégias de codificação
  const strategies = [
    encodeURIComponent(trimmed),
    trimmed.replace(/ /g, "%20"),
    trimmed.replace(/ /g, "+"),
  ];

  for (const encoded of strategies) {
    const url = `${PUBCHEM}/compound/name/${encoded}/cids/TXT`;
    const cid = await fetchTxt(url, true);
    if (cid) {
      console.info(`✅ CID encontrado para "${name}" usando estratégia: ${encoded}`);
      return cid;
    }
  }

  // fallback para o original
  const fallbackUrl = `${PUBCHEM}/compound/name/${encodeURIComponent(
    name.trim()
  )}/cids/TXT`;
  return fetchTxt(fallbackUrl, true);
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
    console.info(`✅ Estrutura 2D obtida com sucesso para CID ${cid}${nameInfo}`);
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
    console.info(`✅ Estrutura 3D obtida com sucesso para CID ${cid}${nameInfo}`);
    return sdf3d;
  }
  throw new Error(`Estrutura 3D não disponível para CID ${cid}. Tente o modo 2D.`);
}

async function getSdfByCid(cid: string): Promise<string> {
  const url3d = `${PUBCHEM}/compound/cid/${encodeURIComponent(cid)}/SDF?record_type=3d`;
  const sdf3d = await fetchTxt(url3d, true);
  if (sdf3d) {
    const compoundName = await getCompoundNameFromCid(cid);
    const nameInfo = compoundName ? ` (${compoundName})` : "";
    console.info(`✅ Estrutura 3D obtida com sucesso para CID ${cid}${nameInfo}`);
    return sdf3d;
  }

  const compoundName = await getCompoundNameFromCid(cid);
  const nameInfo = compoundName ? ` (${compoundName})` : "";
  console.info(`ℹ️ Estrutura 3D não disponível para CID ${cid}${nameInfo}, usando estrutura 2D...`);

  const url2d = `${PUBCHEM}/compound/cid/${encodeURIComponent(cid)}/SDF`;
  const sdf2d = await fetchTxt(url2d);
  if (sdf2d) {
    console.info(`✅ Estrutura 2D obtida com sucesso para CID ${cid}${nameInfo}`);
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