// Utilitário para normalizar termos em uma chave de busca local.

// Normaliza o nome para busca local (remove símbolos e deixa minúsculo)
export function normalizeLocalKey(query: string): string {
  return query
    .toLowerCase()
    .replace(
      /[₂³⁴⁵⁶⁷⁸⁹₀₁]/g,
      (c) =>
        ({
          "₀": "0",
          "₁": "1",
          "₂": "2",
          "₃": "3",
          "₄": "4",
          "₅": "5",
          "₆": "6",
          "₇": "7",
          "₈": "8",
          "₉": "9",
        }[c] || "")
    )
    .replace(/[^a-z0-9\-]/g, "");
}