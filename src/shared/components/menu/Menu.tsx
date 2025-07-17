"use client";

import { motion } from "framer-motion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { Table2 } from "lucide-react";
import { usePathname } from "next/navigation";
import { MENU_WIDTHS, MENU_CLASSES } from "./constants";
import { MenuItem } from "./components/MenuItem";
import { MenuAccordion } from "./components/MenuAccordion";
import { MenuProps } from "./types";
import { useMenuItems } from "./hooks/useMenuItems";

export default function Menu({ collapsed }: MenuProps) {
  const { menuSections, locale, t } = useMenuItems();
  const pathname = usePathname();

  return (
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

      <ScrollArea className="flex-1 scrollbar-hide overflow-x-hidden">
        <ul className="flex flex-col">
          {menuSections.map((section) => (
            <MenuAccordion key={section.id} section={section} />
          ))}
        </ul>
      </ScrollArea>
    </motion.nav>
  );
}
