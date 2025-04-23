/**
 * Formata números em uma string para subscrito HTML, útil para fórmulas químicas.
 * Exemplo: H2O => H<sub>2</sub>O
 */
export function formatWithSub(str: string): string {
  return str.replace(/(\d+)/g, "<sub>$1</sub>");
}
