"use client";

import { usePathname, useRouter, useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { useCalculatorInstancesStore } from "@/features/calculators/store/calculatorInstancesStore";
import { MenuItemProps, MenuSection, MenuSectionConfig, MenuItemConfig } from "../types";
import { menuSectionsConfig } from "../config/menuConfig";

export function useMenuItems() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const addCalculator = useCalculatorInstancesStore((state) => state.addCalculator);
  const locale = params.locale as string;
  const t = useTranslations();

  const processMenuItem = (item: MenuItemConfig): MenuItemProps => {
    const label = t(item.translationKey);

    if (item.type === "calculator") {
      return {
        icon: item.icon,
        label,
        onClick: () => {
          if (pathname.endsWith(`/calculators`)) {
            const position = {
              x: 100 + Math.random() * 100,
              y: 100 + Math.random() * 100,
              width: 750,
            };
            // Agendar em próximo tick para evitar colisões de updates sincronizados
            setTimeout(() => {
              addCalculator(item.calculatorId, position);
            }, 0);
          } else {
            // Inclui timestamp para evitar que a mesma URL seja tratada como idêntica e ignorada
            const ts = Date.now();
            router.push(`/${locale}/calculators?open=${item.calculatorId}&ts=${ts}`);
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

  const menuSections = (menuSectionsConfig as unknown as MenuSectionConfig[]).map(processMenuSection);

  return {
    menuSections,
    locale,
    t,
  };
} 