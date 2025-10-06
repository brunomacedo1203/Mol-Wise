// Utilitário para classificar o tipo de busca (nome, fórmula, SMILES, CID).

export type SearchType = "name" | "formula" | "smiles" | "cid" | "unknown";

export function detectSearchType(query: string): SearchType {
  const trimmed = query.trim();
  if (/^\d+$/.test(trimmed)) return "cid";
  if(/[\[\]()=#@\\\/]/.test(trimmed)) return "smiles";
  if (/^[A-Za-z0-9]+$/.test(trimmed)) return "formula";
  if (/\s/.test(trimmed) || /[^A-Za-z0-9]/.test(trimmed)) return "name";
  return "unknown";
}