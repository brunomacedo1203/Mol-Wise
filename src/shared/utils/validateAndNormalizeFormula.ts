import { getTranslations } from "next-intl/server";

export async function validateFormula(formula: string): Promise<string | null> {
  const t = await getTranslations();

  if (!formula || formula.trim() === "") {
    return t('common.errors.emptyFormula');
  }
  return null;
}

export function normalizeFormula(formula: string): string {
  return formula
    .replace(/\s+/g, "")
    .replace(/(^|[^a-zA-Z])([a-z])/g, (match, p1, p2) => p1 + p2.toUpperCase());
}
