import type { Element } from "../domain/types/element";

export type PeriodicPropertyId =
  | "atomicRadius"
  | "electronegativity"
  | "electronAffinity"
  | "ionizationEnergy";

export interface PeriodicPropertyColorConfig {
  hue: number;
  saturation: number;
  lightRange: [number, number];
  darkRange: [number, number];
}

export interface PeriodicPropertyOption {
  id: PeriodicPropertyId;
  labelKey: string;
  unitKey?: string;
  getValue: (element: Element) => number | null;
  colorConfig?: PeriodicPropertyColorConfig;
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
    colorConfig: {
      hue: 210,
      saturation: 55,
      lightRange: [98, 40],
      darkRange: [10, 72],
    },
  },
  {
    id: "electronegativity",
    labelKey: "periodicProperties.options.electronegativity",
    getValue: (element) => parseNumericValue(element.electronegativity),
    colorConfig: {
      hue: 160,
      saturation: 45,
      lightRange: [96, 46],
      darkRange: [12, 66],
    },
  },
  {
    id: "electronAffinity",
    labelKey: "periodicProperties.options.electronAffinity",
    unitKey: "periodicProperties.units.electronvolt",
    getValue: (element) => parseNumericValue(element.electronAffinity),
    colorConfig: {
      hue: 285,
      saturation: 50,
      lightRange: [92, 42],
      darkRange: [12, 68],
    },
  },
  {
    id: "ionizationEnergy",
    labelKey: "periodicProperties.options.ionizationEnergy",
    unitKey: "periodicProperties.units.electronvolt",
    getValue: (element) => parseNumericValue(element.ionizationEnergy),
    colorConfig: {
      hue: 30,
      saturation: 55,
      lightRange: [94, 50],
      darkRange: [16, 70],
    },
  },
];

export const periodicPropertyOptionsMap = Object.fromEntries(
  periodicPropertyOptions.map((option) => [option.id, option])
) as Record<PeriodicPropertyId, PeriodicPropertyOption>;

export const DEFAULT_PROPERTY_COLOR_CONFIG: PeriodicPropertyColorConfig = {
  hue: 0,
  saturation: 0,
  lightRange: [88, 48],
  darkRange: [28, 58],
};
