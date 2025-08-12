import {
  RARE_EARTHS_LABEL,
  BORON_FAMILY_LABEL,
  CARBON_FAMILY_LABEL,
  NITROGEN_FAMILY_LABEL,
  OXYGEN_FAMILY_LABEL,
} from "../domain/types/elementCategories";

export function getFilterOptions(t: (key: string) => string) {
  return [
    { value: "Alkali metal", label: t("filterOptions.Alkali metal") },
    { value: "Alkaline earth metal", label: t("filterOptions.Alkaline earth metal") },
    { value: "Transition metal", label: t("filterOptions.Transition metal") },
    { value: "Post-transition metal", label: t("filterOptions.Post-transition metal") },
    { value: "Metalloid", label: t("filterOptions.Metalloid") },
    { value: "Nonmetal", label: t("filterOptions.Nonmetal") },   
    { value: BORON_FAMILY_LABEL,    label: t("filterOptions.Boron Family") },
    { value: CARBON_FAMILY_LABEL,   label: t("filterOptions.Carbon Family") },
    { value: NITROGEN_FAMILY_LABEL, label: t("filterOptions.Nitrogen Family") },
    { value: OXYGEN_FAMILY_LABEL,   label: t("filterOptions.Chalcogens Family") },
    { value: "Halogen", label: t("filterOptions.Halogen") },
    { value: "Noble gas", label: t("filterOptions.Noble gas") },
    { value: "Lanthanide", label: t("filterOptions.Lanthanide") },
    { value: "Actinide", label: t("filterOptions.Actinide") },
    { value: RARE_EARTHS_LABEL, label: t("filterOptions.RARE_EARTHS") },
  ];
}
