// src/features/visualization/utils/moleculeKey.ts
export function getMoleculeKey(smiles: string | null, sdf: string | null) {
  if (smiles) return `smiles:${smiles}`;
  if (!sdf) return "unknown";
  // hash leve para SDF
  let h = 0;
  for (let i = 0; i < sdf.length; i++) {
    h = (h * 31 + sdf.charCodeAt(i)) | 0;
  }
  return `sdf:${h}`;
}
