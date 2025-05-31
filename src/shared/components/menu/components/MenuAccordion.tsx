"use client";

import { memo } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { MenuAccordionProps } from "../types";
import { MENU_CLASSES } from "../constants";
import { useMenu } from "../context/MenuContext";
import { Submenu } from "./Submenu";

export const MenuAccordion = memo(function MenuAccordion({
  section,
}: MenuAccordionProps) {
  const { state, toggleSection } = useMenu();
  const isOpen = state.openSections[section.id];
  const isCollapsed = state.collapsed;

  return (
    <li>
      <button
        onClick={() => toggleSection(section.id)}
        className={cn(MENU_CLASSES.ITEM, isOpen && MENU_CLASSES.ACTIVE_ITEM)}
        aria-expanded={isOpen}
        type="button"
      >
        <section.icon className="w-5 h-5" />
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
      <Submenu isOpen={isOpen && !isCollapsed} items={section.items} />
    </li>
  );
});
