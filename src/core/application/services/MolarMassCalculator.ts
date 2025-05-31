import { IMolarMassCalculator } from '../../domain/interfaces/ICalculatorService';
import elementsData from '@/features/periodic-table/services/elementsData';

export class MolarMassCalculator implements IMolarMassCalculator {
  async calculate(formula: string): Promise<number> {
    if (!formula || formula.trim() === "") {
      throw new Error("A fórmula não pode estar vazia");
    }

    if (!/[a-zA-Z]/.test(formula)) {
      throw new Error("A fórmula deve conter pelo menos um elemento");
    }

    // Remove estados físicos como (s), (l), (g), (aq)
    const cleanFormula = formula.replace(/\([slgaq]\)/gi, "");
    
    return this.parseFormulaWithParentheses(cleanFormula);
  }

  validate(formula: string): string[] {
    const errors: string[] = [];
    
    if (!formula || formula.trim() === "") {
      errors.push("A fórmula não pode estar vazia");
    }

    if (!/[a-zA-Z]/.test(formula)) {
      errors.push("A fórmula deve conter pelo menos um elemento");
    }

    // Validação adicional pode ser adicionada aqui
    
    return errors;
  }

  async getElements(): Promise<Array<{ symbol: string; atomicMass: number }>> {
    return elementsData.map(element => ({
      symbol: element.symbol,
      atomicMass: element.molarMass
    }));
  }

  private parseFormulaWithParentheses(formula: string): number {
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
        
        const hydrateMass = this.parseFormulaWithParentheses(hydratePart);

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
          throw new Error("Parênteses não correspondem na fórmula");
        }

        const subFormula = formula.substring(i + 1, j - 1);
        let multiplier = "";
        while (j < formula.length && /\d/.test(formula[j])) {
          multiplier += formula[j];
          j++;
        }

        const mult = multiplier ? parseInt(multiplier, 10) : 1;
        const subMass = this.parseFormulaWithParentheses(subFormula);

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
          throw new Error(`Elemento inválido: ${element}`);
        }

        totalMolarMass += elementData.molarMass * elementCount;
      } 
      else {
        i++; // ignora caracteres inválidos
      }
    }

    return totalMolarMass;
  }
} 