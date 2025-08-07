import { Calculator, FlaskConical, Book, FunctionSquare, Eye, Atom } from "lucide-react";
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
    id: MENU_SECTIONS.VISUALIZATION,
    icon: Eye,
    translationKey: "navigation.visualization",
    items: [
      {
        icon: Atom,
        translationKey: "visualization.molecules2D3D.title", 
        type: "link",
        href: (locale: string) => `/${locale}/visualization`,
      } as const
    ],
  },
]; 