import { RARE_EARTHS_LABEL } from "../domain/types/elementCategories";

export function getFilterOptions(t: (key: string) => string) {
  return [
    { value: "ALL", label: t("filterOptions.ALL") },
    { value: "Alkali metal", label: t("filterOptions.Alkali metal") },
    { value: "Alkaline earth metal", label: t("filterOptions.Alkaline earth metal") },
    { value: "Transition metal", label: t("filterOptions.Transition metal") },
    { value: "Post-transition metal", label: t("filterOptions.Post-transition metal") },
    { value: "Metalloid", label: t("filterOptions.Metalloid") },
    { value: "Nonmetal", label: t("filterOptions.Nonmetal") },
    { value: "Halogen", label: t("filterOptions.Halogen") },
    { value: "Noble gas", label: t("filterOptions.Noble gas") },
    { value: "Lanthanide", label: t("filterOptions.Lanthanide") },
    { value: "Actinide", label: t("filterOptions.Actinide") },
    { value: RARE_EARTHS_LABEL, label: t("filterOptions.RARE_EARTHS") },

  ];
} 