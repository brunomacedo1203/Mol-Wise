// Funções utilitárias para identificar tipos de cards na tabela periódica

export function isLegendCard(element: any): element is { type: "legend" } {
  return element && element.type === "legend";
}

export function isLanthanidesLabel(element: any): element is { type: "lanthanides-label" } {
  return element && element.type === "lanthanides-label";
}

export function isActinidesLabel(element: any): element is { type: "actinides-label" } {
  return element && element.type === "actinides-label";
}

export function isLegendPlaceholder(element: any): element is { type: "legend-placeholder" } {
  return element && element.type === "legend-placeholder";
}

export function isElementCard(element: any): element is {
  atomicNumber: number;
  symbol: string;
  name: string;
  molarMass: number;
  showColummNumber?: number;
} {
  return element && typeof element.atomicNumber === "number";
} 