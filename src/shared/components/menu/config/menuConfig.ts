import { Calculator, FlaskConical, Book, FunctionSquare } from "lucide-react";
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
]; 