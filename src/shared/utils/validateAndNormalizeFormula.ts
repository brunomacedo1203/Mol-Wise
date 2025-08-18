import { getTranslations } from "next-intl/server";

export async function validateFormula(formula: string): Promise<string | null> {
  const t = await getTranslations();

  if (!formula || formula.trim() === "") {
    return t('common.errors.emptyFormula');
  }
  return null;
}

// Função para converter subscritos Unicode para números normais
function convertUnicodeSubscripts(formula: string): string {
  const subscriptMap: Record<string, string> = {
    '₀': '0', '₁': '1', '₂': '2', '₃': '3', '₄': '4',
    '₅': '5', '₆': '6', '₇': '7', '₈': '8', '₉': '9'
  };
  
  return formula.replace(/[₀₁₂₃₄₅₆₇₈₉]/g, (match) => subscriptMap[match] || match);
}

export function normalizeFormula(formula: string): string {
  // Primeiro converte subscritos Unicode para números normais
  const normalizedSubscripts = convertUnicodeSubscripts(formula);
  
  return normalizedSubscripts
    .replace(/\s+/g, "")
    .replace(/(^|[^a-zA-Z])([a-z])/g, (match, p1, p2) => p1 + p2.toUpperCase());
}
