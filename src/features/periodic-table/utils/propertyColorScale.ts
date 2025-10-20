import type { PeriodicPropertyId } from "../config/propertyFilterOptions";
import {
  periodicPropertyOptions,
  periodicPropertyOptionsMap,
} from "../config/propertyFilterOptions";
import elementsData from "../data/elementsData";
import type { Element } from "../domain/types/element";

type PropertyRange = {
  min: number;
  max: number;
};

const propertyRanges: Partial<Record<PeriodicPropertyId, PropertyRange>> = {};

periodicPropertyOptions.forEach((option) => {
  const values = elementsData
    .map((element) => option.getValue(element as Element))
    .filter((value): value is number => value !== null && Number.isFinite(value));

  if (!values.length) {
    return;
  }

  const min = Math.min(...values);
  const max = Math.max(...values);

  propertyRanges[option.id] = { min, max };
});

export function getPropertyRange(propertyId: PeriodicPropertyId) {
  return propertyRanges[propertyId] ?? null;
}

export function getPropertyValue(propertyId: PeriodicPropertyId, element: Element) {
  const option = periodicPropertyOptionsMap[propertyId];
  if (!option) {
    return null;
  }

  return option.getValue(element);
}

export function getNormalizedPropertyValue(
  propertyId: PeriodicPropertyId,
  element: Element
) {
  const value = getPropertyValue(propertyId, element);
  const range = getPropertyRange(propertyId);

  if (value === null || !range) {
    return null;
  }

  const { min, max } = range;
  if (max === min) {
    return 0;
  }

  const normalized = (value - min) / (max - min);
  return Math.min(1, Math.max(0, normalized));
}

export function getPropertyBackgroundColor(normalizedValue: number) {
  // Light theme: 88% -> 48% lightness | Dark theme: 28% -> 58% lightness
  const lightThemeLightness = 88 - normalizedValue * 40;
  const darkThemeLightness = 28 + normalizedValue * 30;

  return {
    light: `hsl(0 0% ${lightThemeLightness}%)`,
    dark: `hsl(0 0% ${darkThemeLightness}%)`,
  };
}
