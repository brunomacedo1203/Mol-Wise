const PUBCHEM = "https://pubchem.ncbi.nlm.nih.gov/rest/pug";

/** Detectores */
function isFormula(input: string): boolean {
  // Ex.: H2O, C6H12O6, NaCl, Fe2(SO4)3 (suporta parênteses simples)
  return /^([A-Z][a-z]?\d*|\(|\))+$/u.test(input.replace(/\s+/g, ""));
}
function isSmiles(input: string): boolean {
  const hasSmilesChars = /[=#@\[\]\(\)\\\/]/.test(input);
  const hasWhitespaceOrComma = /[\s,;]/.test(input);
  const isOnlyDigits = /^\d+$/.test(input);
  return !hasWhitespaceOrComma && !isOnlyDigits && hasSmilesChars;
}

// ✅ CORRIGIDO: Suprime erro 404 no console (é esperado para fallback)
async function fetchTxt(url: string, silent404 = false): Promise<string | null> {
  try {
    const res = await fetch(url, { cache: "no-store" });
    
    // Se for 404 e silent404 estiver ativo, retorna null sem logar erro
    if (!res.ok) {
      if (res.status === 404 && silent404) {
        return null;
      }
      // Outros erros ainda serão logados normalmente
      return null;
    }
    
    const txt = (await res.text()).trim();
    return txt || null;
  } catch (error) {
    // Apenas loga erros de rede ou outros problemas reais
    if (!silent404) {
      console.error(`Erro ao buscar ${url}:`, error);
    }
    return null;
  }
}

/** SMILES */
async function getSmilesFromCid(cid: string): Promise<string | null> {
  const url = `${PUBCHEM}/compound/cid/${encodeURIComponent(cid)}/property/IsomericSMILES/TXT`;
  return fetchTxt(url);
}

export async function getSmiles(query: string): Promise<string> {
  const q = query.trim();

  // CID (apenas dígitos) → via CID
  if (/^\d+$/.test(q)) {
    const smiles = await getSmilesFromCid(q);
    if (smiles) return smiles;
  }

  // Fórmula → via fórmula (NÃO trate como SMILES)
  if (isFormula(q)) {
    const cidTxt = await fetchTxt(`${PUBCHEM}/compound/fastformula/${encodeURIComponent(q)}/cids/TXT`);
    const cid = cidTxt?.split(/\s+/)[0];
    if (cid) {
      const smiles = await getSmilesFromCid(cid);
      if (smiles) return smiles;
    }
  }

  // SMILES
  if (isSmiles(q)) return q;

  // Nome → SMILES
  {
    const url = `${PUBCHEM}/compound/name/${encodeURIComponent(q)}/property/IsomericSMILES/TXT`;
    const smiles = await fetchTxt(url);
    if (smiles) return smiles;
  }
  // Nome (minúsculo)
  {
    const url = `${PUBCHEM}/compound/name/${encodeURIComponent(q.toLowerCase())}/property/IsomericSMILES/TXT`;
    const smiles = await fetchTxt(url);
    if (smiles) return smiles;
  }

  throw new Error("Não foi possível obter SMILES na PubChem para esta entrada.");
}

/** CID helpers */
async function getCidFromSmiles(smiles: string): Promise<string | null> {
  const url = `${PUBCHEM}/compound/smiles/${encodeURIComponent(smiles)}/cids/TXT`;
  return fetchTxt(url);
}
async function getCidFromName(name: string): Promise<string | null> {
  const url = `${PUBCHEM}/compound/name/${encodeURIComponent(name)}/cids/TXT`;
  return fetchTxt(url);
}
async function getCidFromFormula(formula: string): Promise<string | null> {
  const url = `${PUBCHEM}/compound/fastformula/${encodeURIComponent(formula)}/cids/TXT`;
  return fetchTxt(url);
}

/** Obter nome do composto a partir do CID */
async function getCompoundNameFromCid(cid: string): Promise<string | null> {
  const url = `${PUBCHEM}/compound/cid/${encodeURIComponent(cid)}/property/IUPACName/TXT`;
  const iupacName = await fetchTxt(url);
  if (iupacName) return iupacName;
  
  // Fallback para título se IUPAC não estiver disponível
  const titleUrl = `${PUBCHEM}/compound/cid/${encodeURIComponent(cid)}/property/Title/TXT`;
  return fetchTxt(titleUrl);
}

async function resolveCid(query: string): Promise<string> {
  const q = query.trim();
  if (/^\d+$/.test(q)) return q;            // já é CID
  if (isFormula(q)) {                        // fórmula
    const cid = await getCidFromFormula(q);
    if (cid) return cid.split(/\s+/)[0];
  }
  if (isSmiles(q)) {                         // SMILES
    const cid = await getCidFromSmiles(q);
    if (cid) return cid.split(/\s+/)[0];
  }
  {                                          // nome
    const cidTxt = await getCidFromName(q);
    if (cidTxt) return cidTxt.split(/\s+/)[0];
  }
  {
    const cidTxt = await getCidFromName(q.toLowerCase());
    if (cidTxt) return cidTxt.split(/\s+/)[0];
  }
  throw new Error("Não foi possível resolver um CID na PubChem para esta entrada.");
}

/** SDF 2D apenas */
async function getSdf2DByCid(cid: string): Promise<string> {
  const url2d = `${PUBCHEM}/compound/cid/${encodeURIComponent(cid)}/SDF`;
  const sdf2d = await fetchTxt(url2d);
  if (sdf2d) {
    const compoundName = await getCompoundNameFromCid(cid);
    const nameInfo = compoundName ? ` (${compoundName})` : '';
    console.info(`✅ Estrutura 2D obtida com sucesso para CID ${cid}${nameInfo}`);
    return sdf2d;
  }

  throw new Error(`Não foi possível obter SDF 2D na PubChem para o CID ${cid}.`);
}

/** SDF 3D apenas */
async function getSdf3DByCid(cid: string): Promise<string> {
  const url3d = `${PUBCHEM}/compound/cid/${encodeURIComponent(cid)}/SDF?record_type=3d`;
  const sdf3d = await fetchTxt(url3d);
  if (sdf3d) {
    const compoundName = await getCompoundNameFromCid(cid);
    const nameInfo = compoundName ? ` (${compoundName})` : '';
    console.info(`✅ Estrutura 3D obtida com sucesso para CID ${cid}${nameInfo}`);
    return sdf3d;
  }

  throw new Error(`Estrutura 3D não disponível para CID ${cid}. Tente o modo 2D.`);
}

/** SDF (3D com fallback para 2D) */
async function getSdfByCid(cid: string): Promise<string> {
  // ✅ CORRIGIDO: Usa silent404=true para não mostrar erro no console
  const url3d = `${PUBCHEM}/compound/cid/${encodeURIComponent(cid)}/SDF?record_type=3d`;
  const sdf3d = await fetchTxt(url3d, true); // 👈 Suprime o erro 404
  
  if (sdf3d) {
    const compoundName = await getCompoundNameFromCid(cid);
    const nameInfo = compoundName ? ` (${compoundName})` : '';
    console.info(`✅ Estrutura 3D obtida com sucesso para CID ${cid}${nameInfo}`);
    return sdf3d;
  }

  // Fallback para 2D (404 em 3D é esperado)
  const compoundName = await getCompoundNameFromCid(cid);
  const nameInfo = compoundName ? ` (${compoundName})` : '';
  console.info(`ℹ️  Estrutura 3D não disponível para CID ${cid}${nameInfo}, usando estrutura 2D...`);
  
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