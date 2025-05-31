import elementsData from "@/features/periodic-table/data/elementsData";

export function calculateMolarMassFromFormula(formula: string, t: (key: string, params?: Record<string, any> /* eslint-disable-line @typescript-eslint/no-explicit-any */) => string): number {
  if (!formula || formula.trim() === "") {
    throw new Error("The formula cannot be empty");
  }

  if (!/[a-zA-Z]/.test(formula)) {
    throw new Error("The formula must contain at least one element");
  }

  // Remove estados físicos como (s), (l), (g), (aq)
  formula = formula.replace(/\([slgaq]\)/gi, "");

  return parseFormulaWithParentheses(formula, t);
}

function parseFormulaWithParentheses(formula: string, t: (key: string, params?: Record<string, any> /* eslint-disable-line @typescript-eslint/no-explicit-any */) => string): number {
  let totalMolarMass = 0;
  let i = 0;

  while (i < formula.length) {
    if (formula[i] === '.') {
      // Trata ponto de hidratação, ex: Fe.2H2O
      i++; // pula o ponto
      let multiplierStr = "";
      
      while (i < formula.length && /\d/.test(formula[i])) {
        multiplierStr += formula[i];
        i++;
      }

      const multiplier = multiplierStr ? parseInt(multiplierStr, 10) : 1;

      // Lê a parte da fórmula do hidratado (ex: H2O ou algo mais complexo)
      const start = i;
      while (i < formula.length && /[A-Za-z0-9()]/.test(formula[i])) {
        i++;
      }
      const hydratePart = formula.substring(start, i);
      
      const hydrateMass = parseFormulaWithParentheses(hydratePart, t);

      totalMolarMass += hydrateMass * multiplier;
    } 
    else if (formula[i] === '(') {
      // Processa subfórmulas entre parênteses
      let openParenCount = 1;
      let j = i + 1;

      while (j < formula.length && openParenCount > 0) {
        if (formula[j] === '(') openParenCount++;
        if (formula[j] === ')') openParenCount--;
        j++;
      }

      if (openParenCount !== 0) {
        throw new Error("Mismatched parentheses in the formula");
      }

      const subFormula = formula.substring(i + 1, j - 1);
      let multiplier = "";
      while (j < formula.length && /\d/.test(formula[j])) {
        multiplier += formula[j];
        j++;
      }

      const mult = multiplier ? parseInt(multiplier, 10) : 1;
      const subMass = parseFormulaWithParentheses(subFormula, t);

      totalMolarMass += subMass * mult;
      i = j;
    } 
    else if (/[A-Z]/.test(formula[i])) {
      // Processa elemento químico
      let element = formula[i];
      i++;

      if (i < formula.length && /[a-z]/.test(formula[i])) {
        element += formula[i];
        i++;
      }

      let count = "";
      while (i < formula.length && /\d/.test(formula[i])) {
        count += formula[i];
        i++;
      }

      const elementCount = count ? parseInt(count, 10) : 1;

      const elementData = elementsData.find(e => e.symbol === element);
      if (!elementData) {
        throw new Error(t('calculators.molarMass.errors.invalidElement', { symbol: element }));
      }

      totalMolarMass += elementData.molarMass * elementCount;
    } 
    else {
      i++; // ignora caracteres inválidos
    }
  }

  return totalMolarMass;
}
