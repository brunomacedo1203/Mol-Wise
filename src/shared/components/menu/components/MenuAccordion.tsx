// MenuAccordion.tsx - CORRIGIDO
"use client";

import { memo } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { MenuAccordionProps } from "../types";
import { MENU_CLASSES } from "../constants";
import { useSidebarStore } from "@/shared/store/sidebarStore";
import { Submenu } from "./Submenu";

export const MenuAccordion = memo(function MenuAccordion({
  section,
}: MenuAccordionProps) {
  const isCollapsed = useSidebarStore((state) => state.collapsed);
  const isOpen = useSidebarStore((state) => state.openSections[section.id]);
  const toggleSection = useSidebarStore((state) => state.toggleSection);

  return (
    <li className={cn(isCollapsed && "flex")}>
      <button
        onClick={() => toggleSection(section.id)}
        className={cn(
          MENU_CLASSES.ITEM,
          isOpen && MENU_CLASSES.ACTIVE_ITEM,
          isCollapsed && "justify-center px-0 w-full"
        )}
        aria-expanded={isOpen}
        type="button"
      >
        <section.icon className={cn("w-5 h-5", isCollapsed && "mx-auto")} />
        {!isCollapsed && (
          <>
            <span className="text-base">{section.label}</span>
            {isOpen ? (
              <ChevronUp className="w-4 h-4" aria-hidden="true" />
            ) : (
              <ChevronDown className="w-4 h-4" aria-hidden="true" />
            )}
          </>
        )}
      </button>
      {!isCollapsed && (
        <Submenu
          isOpen={isOpen}
          items={section.items}
          isCollapsed={isCollapsed}
        />
      )}
    </li>
  );
});
