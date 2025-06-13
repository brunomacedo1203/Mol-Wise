import { Calculator, FlaskConical, Table2, Book, FunctionSquare } from "lucide-react";
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
        icon: Table2,
        translationKey: "catalog.elements.title",
        type: "link",
        href: (locale: string) => `/${locale}/catalog/elements`,
      } as const,
      {
        icon: FlaskConical,
        translationKey: "catalog.compounds.title",
        type: "link",
        href: (locale: string) => `/${locale}/catalog/compounds`,
      } as const,
    ],
  },
  // Seção Games comentada temporariamente
  /*
  {
    id: MENU_SECTIONS.GAMES,
    icon: Gamepad2,
    translationKey: "navigation.games",
    items: [
      {
        icon: Gamepad2,
        translationKey: "games.elementQuiz.title",
        type: "link",
        href: (locale: string) => `/${locale}/games/element-quiz`,
      } as const,
      {
        icon: Gamepad2,
        translationKey: "games.compoundBuilder.title",
        type: "link",
        href: (locale: string) => `/${locale}/games/compound-builder`,
      } as const,
    ],
  },
  */
]; 