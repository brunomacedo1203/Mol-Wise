import type { Element } from "../domain/types/element";

export type PeriodicPropertyId =
  | "atomicRadius"
  | "electronegativity"
  | "electronAffinity"
  | "ionizationEnergy";

export interface PeriodicPropertyOption {
  id: PeriodicPropertyId;
  labelKey: string;
  unitKey?: string;
  getValue: (element: Element) => number | null;
}

function parseNumericValue(rawValue: string | number | undefined): number | null {
  if (rawValue === undefined || rawValue === null) {
    return null;
  }

  if (typeof rawValue === "number") {
    return Number.isFinite(rawValue) ? rawValue : null;
  }

  const normalized = rawValue.replace(",", ".").trim();
  const match = normalized.match(/-?\d+(\.\d+)?/);
  if (!match) {
    return null;
  }

  const parsed = parseFloat(match[0]);
  return Number.isFinite(parsed) ? parsed : null;
}

export const periodicPropertyOptions: PeriodicPropertyOption[] = [
  {
    id: "atomicRadius",
    labelKey: "periodicProperties.options.atomicRadius",
    unitKey: "periodicProperties.units.picometers",
    getValue: (element) => parseNumericValue(element.atomicRadius),
  },
  {
    id: "electronegativity",
    labelKey: "periodicProperties.options.electronegativity",
    getValue: (element) => parseNumericValue(element.electronegativity),
  },
  {
    id: "electronAffinity",
    labelKey: "periodicProperties.options.electronAffinity",
    unitKey: "periodicProperties.units.electronvolt",
    getValue: (element) => parseNumericValue(element.electronAffinity),
  },
  {
    id: "ionizationEnergy",
    labelKey: "periodicProperties.options.ionizationEnergy",
    unitKey: "periodicProperties.units.electronvolt",
    getValue: (element) => parseNumericValue(element.ionizationEnergy),
  },
];

export const periodicPropertyOptionsMap = Object.fromEntries(
  periodicPropertyOptions.map((option) => [option.id, option])
) as Record<PeriodicPropertyId, PeriodicPropertyOption>;
