// Funções utilitárias para identificar tipos de cards na tabela periódica

export function isLegendCard(element: unknown): element is { type: "legend" } {
  return typeof element === "object" && element !== null && (element as any).type === "legend";
}

export function isLanthanidesLabel(element: unknown): element is { type: "lanthanides-label" } {
  return typeof element === "object" && element !== null && (element as any).type === "lanthanides-label";
}

export function isActinidesLabel(element: unknown): element is { type: "actinides-label" } {
  return typeof element === "object" && element !== null && (element as any).type === "actinides-label";
}

export function isLegendPlaceholder(element: unknown): element is { type: "legend-placeholder" } {
  return typeof element === "object" && element !== null && (element as any).type === "legend-placeholder";
}

export function isElementCard(element: unknown): element is {
  atomicNumber: number;
  symbol: string;
  name: string;
  molarMass: number;
  showColummNumber?: number;
} {
  return (
    typeof element === "object" &&
    element !== null &&
    typeof (element as any).atomicNumber === "number"
  );
}
