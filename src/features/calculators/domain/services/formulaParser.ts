export function parseFormulaForEvaluation(formula: string): string {
  let parsedFormula = formula;

  // Converter vírgulas para pontos (separador decimal brasileiro)
  parsedFormula = parsedFormula.replace(/,/g, ".");

  // Substituir funções científicas para o formato mathjs
  parsedFormula = parsedFormula.replace(/sin\(/g, "sin(");
  parsedFormula = parsedFormula.replace(/cos\(/g, "cos(");
  parsedFormula = parsedFormula.replace(/tan\(/g, "tan(");
  parsedFormula = parsedFormula.replace(/asin\(/g, "asin(");
  parsedFormula = parsedFormula.replace(/acos\(/g, "acos(");
  parsedFormula = parsedFormula.replace(/atan\(/g, "atan(");
  parsedFormula = parsedFormula.replace(/log10\(/g, "log10(");
  parsedFormula = parsedFormula.replace(/ln\(/g, "log("); // Math.js usa log() para ln
  parsedFormula = parsedFormula.replace(/exp\(/g, "exp(");
  parsedFormula = parsedFormula.replace(/sqrt\(/g, "sqrt(");
  parsedFormula = parsedFormula.replace(/cbrt\(/g, "cbrt(");
  parsedFormula = parsedFormula.replace(/abs\(/g, "abs(");
  parsedFormula = parsedFormula.replace(/mod\(/g, "mod(");

  // Substituir constantes
  parsedFormula = parsedFormula.replace(/π/g, "PI");
  parsedFormula = parsedFormula.replace(/e/g, "E");

  // Tratar o fatorial
  parsedFormula = parsedFormula.replace(/(\d+)!/g, "factorial($1)");

  // Tratar potenciação (x^y) - mathjs usa pow(x, y)
  parsedFormula = parsedFormula.replace(/(\w+)\^(\w+)/g, "pow($1, $2)");

  // Para a raiz cúbica (∛), precisamos de um tratamento especial se não for uma função nativa como sqrt
  // Se a raiz cúbica for 'nthRoot', use nthRoot(x, 3)
  parsedFormula = parsedFormula.replace(/∛\(([^)]+)\)/g, "nthRoot($1, 3)");

  return parsedFormula;
} 