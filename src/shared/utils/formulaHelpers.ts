// Funções auxiliares para manipulação de fórmulas químicas

export function resetFormula(setFormula: (val: string) => void) {
  setFormula("");
}

export function backspaceFormula(formula: string, setFormula: (val: string) => void) {
  setFormula(formula.slice(0, -1));
}
