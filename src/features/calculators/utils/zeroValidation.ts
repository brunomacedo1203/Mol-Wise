/**
 * Valida se a inserção de um zero criaria um zero à esquerda inválido
 * @param currentFormula - A fórmula atual
 * @param newChar - O caractere a ser inserido (deve ser "0")
 * @returns true se a inserção é válida, false se criaria zero à esquerda inválido
 */
export function isValidZeroInsertion(currentFormula: string, newChar: string): boolean {
  if (newChar !== "0") return true;

  // Se a fórmula estiver vazia, permitir zero inicial
  if (currentFormula === "") return true;

  // Encontrar a posição atual no contexto da fórmula
  const lastChar = currentFormula[currentFormula.length - 1];

  if (lastChar === undefined) return true; // Tratar explicitamente 'undefined'

  // Se o último caractere não é um dígito, permitir o zero.
  // Neste ponto, lastChar é garantido como uma string, então não há erro de 'null' ou 'undefined'.
  if (!/\d/.test(lastChar)) return true;
  
  // Encontrar o número atual (o último número na fórmula)
  let currentNumber = "";
  let i = currentFormula.length - 1;
  
  // Percorrer para trás para encontrar o início do número atual
  while (i >= 0) {
    const charAtIndex = currentFormula[i];
    if (charAtIndex === undefined) {
        break; // Sai do loop se for undefined (não deveria ocorrer com i >= 0, mas para segurança)
    }
    if (/[\d.]/.test(charAtIndex)) {
      currentNumber = charAtIndex + currentNumber;
      i--;
    } else {
      break; // Sai do loop se não for dígito ou ponto
    }
  }
  
  // Se não encontrou um número, permitir
  if (!currentNumber) return true;
  
  // Casos onde não permitir zero adicional:
  
  // 1. Se o número atual é exatamente "0" (zero sozinho)
  if (currentNumber === "0") return false;
  
  // 2. Se o número começa com "0" mas não tem ponto decimal
  // Exemplos: "01", "02", "007" etc.
  if (currentNumber.startsWith("0") && !currentNumber.includes(".")) {
    return false;
  }
  
  // 3. Se estamos no início da fórmula e o número atual é "0"
  if (i < 0 && currentNumber === "0") return false;
  
  // 4. Verificar se estamos imediatamente após um operador e o número é "0"
  if (i >= 0) {
    const charBeforeNumber = currentFormula[i];
    if (charBeforeNumber !== undefined) {
      if (/[+\-*/()^!√]/.test(charBeforeNumber) && currentNumber === "0") {
        return false;
      }
    }
  }
  
  // Em todos os outros casos, permitir
  return true;
}

/**
 * Função auxiliar para validar uma fórmula completa
 * Remove zeros à esquerda inválidos de uma fórmula
 */
export function sanitizeFormula(formula: string): string {
  // Regex para encontrar números com zeros à esquerda inválidos
  const invalidZeroPattern = /(?:^|[+\-*/()^!√]|sin|cos|tan|log|ln|sqrt|abs)\s*0+(\d+)/g;
  
  return formula.replace(invalidZeroPattern, (match, digits) => {
    // Manter o prefixo (operador ou início) e substituir 0+digits por apenas digits
    // Usamos '!' para afirmar ao TypeScript que 'match.match(/0+/)[0]' não será nulo/indefinido,
    // pois a regex 'invalidZeroPattern' garante que '0+' sempre será correspondido.
    const prefix = match.substring(0, match.length - digits.length - match.match(/0+/)![0].length);
    return prefix + digits;
  });
}

/**
 * Função para validar se uma string representa um número válido
 */
export function isValidNumber(numberString: string): boolean {
  if (!numberString) return false;
  
  // Permitir números decimais, mas não zeros à esquerda em inteiros
  const numberPattern = /^(?:0|[1-9]\d*)(?:\.\d+)?(?:[eE][+-]?\d+)?$/;
  return numberPattern.test(numberString);
}

/**
 * Função para extrair todos os números de uma fórmula
 */
export function extractNumbers(formula: string): string[] {
  const numberRegex = /\d+\.?\d*(?:[eE][+-]?\d+)?/g;
  return formula.match(numberRegex) || [];
}

/**
 * Função principal para validar uma fórmula inteira
 */
export function validateFormula(formula: string): {
  isValid: boolean;
  errors: string[];
  sanitized: string;
} {
  const errors: string[] = [];
  
  // Extrair todos os números da fórmula
  const numbers = extractNumbers(formula);
  
  // Validar cada número
  numbers.forEach(num => {
    if (!isValidNumber(num)) {
      errors.push(`Número inválido: ${num}`);
    }
  });
  
  // Sanitizar a fórmula
  const sanitized = sanitizeFormula(formula);
  
  return {
    isValid: errors.length === 0,
    errors,
    sanitized
  };
}