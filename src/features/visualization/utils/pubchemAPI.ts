const PUBCHEM = "https://pubchem.ncbi.nlm.nih.gov/rest/pug";

function looksLikeSmiles(input: string): boolean {
  // Heurística simples para SMILES
  return /[A-Z0-9=\-\[\]\(\)\\\/+#@]/i.test(input) && !/[\s,;]|^\d+$/.test(input);
}

async function fetchTxt(url: string): Promise<string | null> {
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) return null;
  const txt = (await res.text()).trim();
  return txt || null;
}

/** --------- SMILES --------- */
async function getSmilesFromCid(cid: string): Promise<string | null> {
  const url = `${PUBCHEM}/compound/cid/${encodeURIComponent(
    cid
  )}/property/IsomericSMILES/TXT`;
  return fetchTxt(url);
}

export async function getSmiles(query: string): Promise<string> {
  const q = query.trim();

  if (looksLikeSmiles(q)) return q;

  // Nome → SMILES
  {
    const url = `${PUBCHEM}/compound/name/${encodeURIComponent(
      q
    )}/property/IsomericSMILES/TXT`;
    const smiles = await fetchTxt(url);
    if (smiles) return smiles;
  }

  // Fórmula → CID → SMILES
  {
    const cidUrl = `${PUBCHEM}/compound/fastformula/${encodeURIComponent(q)}/cids/TXT`;
    const cidTxt = await fetchTxt(cidUrl);
    const cid = cidTxt?.split(/\s+/)?.[0];
    if (cid) {
      const smiles = await getSmilesFromCid(cid);
      if (smiles) return smiles;
    }
  }

  // Última tentativa: nome em minúsculas
  {
    const url = `${PUBCHEM}/compound/name/${encodeURIComponent(
      q.toLowerCase()
    )}/property/IsomericSMILES/TXT`;
    const smiles = await fetchTxt(url);
    if (smiles) return smiles;
  }

  throw new Error("Não foi possível obter SMILES na PubChem para esta entrada.");
}

/** --------- CID helpers --------- */
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

  // Se já parecer número (CID)
  if (/^\d+$/.test(q)) return q;

  // Se for SMILES
  if (looksLikeSmiles(q)) {
    const cid = await getCidFromSmiles(q);
    if (cid) return cid.split(/\s+/)[0];
  }

  // Tenta nome
  {
    const cidTxt = await getCidFromName(q);
    if (cidTxt) return cidTxt.split(/\s+/)[0];
  }

  // Tenta fórmula
  {
    const cidTxt = await getCidFromFormula(q);
    if (cidTxt) return cidTxt.split(/\s+/)[0];
  }

  // Última chance com nome minúsculo
  {
    const cidTxt = await getCidFromName(q.toLowerCase());
    if (cidTxt) return cidTxt.split(/\s+/)[0];
  }

  throw new Error("Não foi possível resolver um CID na PubChem para esta entrada.");
}

/** --------- SDF (3D com fallback para 2D) --------- */
async function getSdfByCid(cid: string): Promise<string> {
  // Tenta 3D primeiro
  const url3d = `${PUBCHEM}/compound/cid/${encodeURIComponent(cid)}/SDF?record_type=3d`;
  const sdf3d = await fetchTxt(url3d);
  if (sdf3d) return sdf3d;

  // Fallback: SDF padrão (geralmente 2D)
  const url2d = `${PUBCHEM}/compound/cid/${encodeURIComponent(cid)}/SDF`;
  const sdf2d = await fetchTxt(url2d);
  if (sdf2d) return sdf2d;

  throw new Error("Não foi possível obter SDF (3D ou 2D) na PubChem.");
}

/** Obtém SDF (tenta 3D; se não houver, 2D) a partir de SMILES/nome/fórmula/CID */
export async function getSdf(query: string): Promise<string> {
  const cid = await resolveCid(query);
  const sdf = await getSdfByCid(cid);
  return sdf;
}
