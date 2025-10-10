"use client";

import { motion } from "framer-motion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { MENU_WIDTHS, MENU_CLASSES } from "./constants";
import { MenuItem } from "./components/MenuItem";
import { MenuAccordion } from "./components/MenuAccordion";
import { MenuProps } from "./types";
import { useMenuItems } from "./hooks/useMenuItems";

// Definindo os itens isolados diretamente no componente por enquanto
import { Table2, LucideIcon } from "lucide-react";

interface StandaloneItem {
  icon: LucideIcon;
  translationKey: string;
  href: (locale: string) => string;
}

const menuStandaloneItems: StandaloneItem[] = [
  {
    icon: Table2,
    translationKey: "navigation.periodicTable",
    href: (locale: string) => `/${locale}/periodicTable`,
  },
];

export default function Menu({ collapsed }: MenuProps) {
  const { menuSections, locale, t } = useMenuItems();
  const pathname = usePathname();

  return (
    <div className="mt-4">
      <motion.nav
        className={cn(
          MENU_CLASSES.BASE,
          collapsed ? MENU_WIDTHS.COLLAPSED : MENU_WIDTHS.EXPANDED
        )}
      >
        <ScrollArea className="flex-1 scrollbar-hide overflow-x-hidden ">
          <ul className="flex flex-col w-full">
            {/* Itens isolados primeiro */}
            {menuStandaloneItems.map((item: StandaloneItem) => (
              <MenuItem
                key={`${item.translationKey}-standalone`}
                icon={item.icon}
                label={t(item.translationKey)}
                href={item.href(locale)}
                isActive={pathname === item.href(locale)}
                isCollapsed={collapsed}
              />
            ))}

            {/* Depois as seções com submenu */}
            {menuSections.map((section) => (
              <MenuAccordion key={section.id} section={section} isCollapsed={collapsed} />
            ))}
          </ul>
        </ScrollArea>
      </motion.nav>
    </div>
  );
}
