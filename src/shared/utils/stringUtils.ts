export function toCamelCase(str: string): string {
  return str
    .toLowerCase()
    .replace(/[-\s]+(.)?/g, (_, c) => (c ? c.toUpperCase() : ""))
    .replace(/^./, (c) => c.toLowerCase());
} 