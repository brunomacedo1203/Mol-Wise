export const RARE_EARTHS_LABEL = "Terras Raras";
export const RARE_EARTHS_COLOR = "bg-yellow-500 dark:bg-yellow-700";

export const CATEGORY_COLOR_MAP: Record<string, string> = {
  "Alkali metal": "bg-yellow-300 dark:bg-yellow-700",
  "Alkaline earth metal": "bg-orange-300 dark:bg-orange-700",
  "Transition metal": "bg-blue-300 dark:bg-blue-700",
  "Post-transition metal": "bg-green-300 dark:bg-green-700",
  "Metalloid": "bg-teal-300 dark:bg-teal-700",
  "Nonmetal": "bg-gray-300 dark:bg-gray-700",
  "Halogen": "bg-purple-300 dark:bg-purple-700",
  "Noble gas": "bg-pink-300 dark:bg-pink-700",
  "Lanthanide": "bg-red-300 dark:bg-red-700",
  "Actinide": "bg-indigo-300 dark:bg-indigo-700",
};

/** ===== Novas Famílias (grupos 13–16) ===== */
export const BORON_FAMILY_LABEL = "Boron Family";
export const CARBON_FAMILY_LABEL = "Carbon Family";
export const NITROGEN_FAMILY_LABEL = "Nitrogen Family";
export const OXYGEN_FAMILY_LABEL = "Chalcogens";

/** Cores exclusivas para as famílias (sem conflitar com as já usadas) */
export const BORON_FAMILY_COLOR = "bg-emerald-300 dark:bg-emerald-700";
export const CARBON_FAMILY_COLOR = "bg-lime-300 dark:bg-lime-700";
export const NITROGEN_FAMILY_COLOR = "bg-cyan-300 dark:bg-cyan-700";
export const OXYGEN_FAMILY_COLOR = "bg-rose-300 dark:bg-rose-700";

/** Mapa de rótulo -> classe Tailwind para famílias */
export const FAMILY_COLOR_MAP: Record<string, string> = {
  [BORON_FAMILY_LABEL]: BORON_FAMILY_COLOR,
  [CARBON_FAMILY_LABEL]: CARBON_FAMILY_COLOR,
  [NITROGEN_FAMILY_LABEL]: NITROGEN_FAMILY_COLOR,
  [OXYGEN_FAMILY_LABEL]: OXYGEN_FAMILY_COLOR,
};
