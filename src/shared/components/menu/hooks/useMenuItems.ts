"use client";

import { usePathname, useRouter, useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { useCalculatorInstances } from "@/features/calculators/contexts/CalculatorInstancesContext";
import { MenuItemProps, MenuSection, MenuSectionConfig, MenuItemConfig } from "../types";
import { menuSectionsConfig } from "../config/menuConfig";

export function useMenuItems() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const { addCalculator } = useCalculatorInstances();
  const locale = params.locale as string;
  const t = useTranslations();

  const processMenuItem = (item: MenuItemConfig): MenuItemProps => {
    const label = t(item.translationKey);

    if (item.type === "calculator") {
      return {
        icon: item.icon,
        label,
        onClick: () => {
          if (pathname === `/${locale}/calculators`) {
            const position = {
              x: 100 + Math.random() * 100,
              y: 100 + Math.random() * 100,
              width: 750,
            };
            addCalculator(item.calculatorId, position);
          } else {
            router.push(`/${locale}/calculators?open=${item.calculatorId}`);
          }
        },
      };
    }

    const href = item.href(locale);
    return {
      icon: item.icon,
      label,
      href,
      isActive: pathname === href,
    };
  };

  const processMenuSection = (config: MenuSectionConfig): MenuSection => ({
    id: config.id,
    icon: config.icon,
    label: t(config.translationKey),
    items: config.items.map(processMenuItem),
  });

  const menuSections = menuSectionsConfig.map(processMenuSection);

  return {
    menuSections,
    locale,
    t,
  };
} 