import { toCamelCase } from "@/shared/utils/stringUtils";
import { Element } from "../domain/types/element";

export function getElementFields(element: Element, t: (key: string) => string) {
  const generalFields = [
    {
      label: t("element.atomicNumber"),
      value: element.atomicNumber,
    },
    {
      label: t("element.molarMass"),
      value: `${Number(element.molarMass).toFixed(2)} g/mol`,
    },
    { label: t("element.group"), value: element.group },
    { label: t("element.period"), value: element.period },
    {
      label: t("element.category"),
      value: t(`element.categories.${toCamelCase(element.category)}`),
    },
    {
      label: t("element.standardState"),
      value: t(
        `element.standardStates.${element.standardState.toLowerCase()}`
      ),
    },
    { label: t("element.density"), value: element.density },
  ];

  const extraFields = [
    { label: t("element.atomicRadius"), value: element.atomicRadius },
    {
      label: t("element.electronAffinity"),
      value: element.electronAffinity,
    },
    {
      label: t("element.electronegativity"),
      value: element.electronegativity,
    },
    {
      label: t("element.ionizationEnergy"),
      value: element.ionizationEnergy,
    },
    { label: t("element.meltingPoint"), value: element.meltingPoint },
    { label: t("element.boilingPoint"), value: element.boilingPoint },
  ];

  return { generalFields, extraFields };
}
