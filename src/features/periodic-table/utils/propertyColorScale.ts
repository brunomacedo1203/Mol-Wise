import type { PeriodicPropertyId } from "../config/propertyFilterOptions";
import {
  periodicPropertyOptions,
  periodicPropertyOptionsMap,
  DEFAULT_PROPERTY_COLOR_CONFIG,
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

function interpolate(start: number, end: number, factor: number) {
  return start + (end - start) * factor;
}

export function getPropertyBackgroundColor(
  propertyId: PeriodicPropertyId,
  normalizedValue: number
) {
  const option = periodicPropertyOptionsMap[propertyId];
  const config = option?.colorConfig ?? DEFAULT_PROPERTY_COLOR_CONFIG;

  const lightL = interpolate(
    config.lightRange[0],
    config.lightRange[1],
    normalizedValue
  );
  const darkL = interpolate(
    config.darkRange[0],
    config.darkRange[1],
    normalizedValue
  );

  return {
    light: `hsl(${config.hue} ${config.saturation}% ${lightL}%)`,
    dark: `hsl(${config.hue} ${config.saturation}% ${darkL}%)`,
  };
}
