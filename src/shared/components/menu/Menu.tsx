"use client";

import { motion } from "framer-motion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { Calculator, FlaskConical, Table2, Book, Gamepad2 } from "lucide-react";
import { usePathname, useRouter, useParams } from "next/navigation";
import { useCalculatorInstances } from "@/features/calculators/contexts/CalculatorInstancesContext";
import { useTranslations } from "next-intl";
import { MENU_SECTIONS, MENU_WIDTHS, MENU_CLASSES } from "./constants";
import { MenuProvider } from "./context/MenuContext";
import { MenuItem } from "./components/MenuItem";
import { MenuAccordion } from "./components/MenuAccordion";
import { MenuProps } from "./types";

export default function Menu({ collapsed }: MenuProps) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const { addCalculator } = useCalculatorInstances();
  const locale = params.locale as string;
  const t = useTranslations();

  const menuSections = [
    {
      id: MENU_SECTIONS.CALCULATORS,
      icon: Calculator,
      label: t("navigation.calculators"),
      items: [
        {
          icon: FlaskConical,
          label: t("calculators.molarMass.title"),
          onClick: () => {
            if (pathname === `/${locale}/calculators`) {
              const position = {
                x: 100 + Math.random() * 100,
                y: 100 + Math.random() * 100,
                width: 750,
              };
              addCalculator("molar-mass", position);
            } else {
              router.push(`/${locale}/calculators?open=molar-mass`);
            }
          },
        },
      ],
    },
    {
      id: MENU_SECTIONS.CATALOG,
      icon: Book,
      label: t("navigation.catalog"),
      items: [
        {
          icon: Table2,
          label: t("catalog.elements.title"),
          href: `/${locale}/catalog/elements`,
        },
        {
          icon: FlaskConical,
          label: t("catalog.compounds.title"),
          href: `/${locale}/catalog/compounds`,
        },
      ],
    },
    {
      id: MENU_SECTIONS.GAMES,
      icon: Gamepad2,
      label: t("navigation.games"),
      items: [
        {
          icon: Gamepad2,
          label: t("games.elementQuiz.title"),
          href: `/${locale}/games/element-quiz`,
        },
        {
          icon: Gamepad2,
          label: t("games.compoundBuilder.title"),
          href: `/${locale}/games/compound-builder`,
        },
      ],
    },
  ];

  return (
    <MenuProvider initialCollapsed={collapsed}>
      <motion.nav
        className={cn(
          MENU_CLASSES.BASE,
          collapsed ? MENU_WIDTHS.COLLAPSED : MENU_WIDTHS.EXPANDED
        )}
      >
        <MenuItem
          icon={Table2}
          label={t("navigation.periodicTable")}
          href={`/${locale}/periodicTable`}
          isActive={pathname === `/${locale}/periodicTable`}
          isCollapsed={collapsed}
        />

        <ScrollArea className="flex-1 scrollbar-hide">
          <ul className="flex flex-col pt-4">
            {menuSections.map((section) => (
              <MenuAccordion key={section.id} section={section} />
            ))}
          </ul>
        </ScrollArea>
      </motion.nav>
    </MenuProvider>
  );
}
