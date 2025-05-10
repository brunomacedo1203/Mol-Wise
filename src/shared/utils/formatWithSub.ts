export function formatWithSub(input: string): string {
  // Substitui ponto de hidratação por ponto médio visual e mantém número normal
  const hydrated = input.replace(/\.(\d+)([A-Z][a-z]*\d*)/g, "·$1$2");

  // Aplica subscrito apenas aos números **que vêm depois de letras**, como H2, O4, etc.
  return hydrated.replace(/([A-Za-z])(\d+)/g, "$1<sub>$2</sub>");
}
