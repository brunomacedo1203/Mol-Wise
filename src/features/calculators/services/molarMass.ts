import elementsData from "@/features/periodic-table/services/elementsData";

interface ElementData {
  symbol: string;
  molarMass: number;
}

export function calculateMolarMassFromFormula(formula: string): number {
  const stack: { element: string; count: number }[] = [];
  let currentElement = "";
  let currentCount = "";
  const length = formula.length;

  for (let i = 0; i < length; i++) {
    const char = formula[i];
    if (/[A-Z]/.test(char)) {
      if (currentElement) {
        stack.push({
          element: currentElement,
          count: currentCount ? parseInt(currentCount, 10) : 1,
        });
        currentElement = "";
        currentCount = "";
      }
      currentElement += char;
    } else if (/[a-z]/.test(char)) {
      currentElement += char;
    } else if (/\d/.test(char)) {
      currentCount += char;
    }
  }
  if (currentElement) {
    stack.push({
      element: currentElement,
      count: currentCount ? parseInt(currentCount, 10) : 1,
    });
  }

  let totalMolarMass = 0;
  while (stack.length > 0) {
    const item = stack.pop();
    if (item) {
      const elementSymbol: ElementData | undefined = elementsData.find(
        (i) => i.symbol === item.element
      );
      if (elementSymbol) {
        totalMolarMass += elementSymbol.molarMass * item.count;
      } else {
        throw new Error(
          `The element with the symbol "${item.element}" was not found in the periodic table`
        );
      }
    }
  }

  return totalMolarMass;
}
