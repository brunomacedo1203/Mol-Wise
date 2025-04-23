export function validateFormula(formula: string): string | null {
  if (!formula || formula.trim() === "") {
    return "Please enter an element symbol or a formula.";
  }
  return null;
}

export function normalizeFormula(formula: string): string {
  return formula
    .replace(/\s+/g, "")
    .replace(/(^|[^a-zA-Z])([a-z])/g, (match, p1, p2) => p1 + p2.toUpperCase());
}
