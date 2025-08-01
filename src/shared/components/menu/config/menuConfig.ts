import { Calculator, FlaskConical, Book, FunctionSquare, Atom } from "lucide-react";
import { MENU_SECTIONS } from "../constants";
import { MenuSectionConfig } from "../types";

export const menuSectionsConfig: MenuSectionConfig[] = [
  {
    id: MENU_SECTIONS.CALCULATORS,
    icon: Calculator,
    translationKey: "navigation.calculators",
    items: [
      {
        icon: FlaskConical,
        translationKey: "calculators.molarMass.title",
        type: "calculator",
        calculatorId: "molar-mass",
      } as const,
      {
        icon: FunctionSquare,
        translationKey: "calculators.scientific.title",
        type: "calculator",
        calculatorId: "scientific",
      } as const,
    ],
  },
  {
    id: MENU_SECTIONS.CATALOG,
    icon: Book,
    translationKey: "navigation.catalog",
    items: [
      {
        icon: Book,
        translationKey: "catalog.title", 
        type: "link",
        href: (locale: string) => `/${locale}/catalog`,
      } as const
    ],
  },
  {
    id: MENU_SECTIONS.MOLVIEW,
    icon: Atom,
    translationKey: "navigation.molview",
    items: [
      {
        icon: Atom,
        translationKey: "molview.title", 
        type: "link",
        href: (locale: string) => `/${locale}/molview`,
      } as const
    ],
  },
]; 