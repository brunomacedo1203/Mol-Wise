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

async function fetchTxt(url: string): Promise<string | null> {
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) return null;
  const txt = (await res.text()).trim();
  return txt || null;
}

/** SMILES */
async function getSmilesFromCid(cid: string): Promise<string | null> {
  const url = `${PUBCHEM}/compound/cid/${encodeURIComponent(cid)}/property/IsomericSMILES/TXT`;
  return fetchTxt(url);
}

export async function getSmiles(query: string): Promise<string> {
  const q = query.trim();

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

/** SDF (3D com fallback) */
async function getSdfByCid(cid: string): Promise<string> {
  const url3d = `${PUBCHEM}/compound/cid/${encodeURIComponent(cid)}/SDF?record_type=3d`;
  const sdf3d = await fetchTxt(url3d);
  if (sdf3d) return sdf3d;

  const url2d = `${PUBCHEM}/compound/cid/${encodeURIComponent(cid)}/SDF`;
  const sdf2d = await fetchTxt(url2d);
  if (sdf2d) return sdf2d;

  throw new Error("Não foi possível obter SDF (3D ou 2D) na PubChem.");
}

export async function getSdf(query: string): Promise<string> {
  const cid = await resolveCid(query);
  return getSdfByCid(cid);
}
