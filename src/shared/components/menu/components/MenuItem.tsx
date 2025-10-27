"use client";

import { memo } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { MenuItemProps } from "../types";
import { MENU_CLASSES } from "../constants";
import { trackMenuInteraction } from "@/shared/events/interfaceEvents";
import { useSidebarStore } from "@/shared/store/sidebarStore"; // ✅ Adicione isto

type MenuItemPropsExtended = MenuItemProps & { isSubmenuItem?: boolean };

export const MenuItem = memo(function MenuItem({
  icon: Icon,
  label,
  href,
  onClick,
  isActive,
  isCollapsed,
  isSubmenuItem = false,
}: MenuItemPropsExtended) {
  const { setMobileOpen } = useSidebarStore();

  const handleClick = () => {
    // Rastrear interação do menu
    trackMenuInteraction({
      menu_item: label,
      action_type: "click",
      menu_section: isSubmenuItem ? "dropdown" : "sidebar",
      section: "navigation",
    });

    // ✅ Fecha o menu móvel automaticamente
    if (href) {
      setTimeout(() => setMobileOpen(false), 200);
    } else {
      setMobileOpen(false);
    }

    // Executar onClick original se existir
    if (onClick) onClick();
  };

  const content = (
    <>
      <Icon className={cn("w-5 h-5 flex-shrink-0", isCollapsed && "mx-auto")} />
      {!isCollapsed && (
        <span className="text-base whitespace-nowrap overflow-hidden">
          {label}
        </span>
      )}
    </>
  );

  const baseClass = isSubmenuItem
    ? MENU_CLASSES.SUBMENU_ITEM
    : MENU_CLASSES.ITEM;
  const activeClass = isActive && MENU_CLASSES.ACTIVE_ITEM;
  const collapsedClass = isCollapsed && "justify-center px-0";

  if (href) {
    return (
      <Link
        href={href}
        onClick={handleClick}
        className={cn(baseClass, activeClass, collapsedClass)}
        aria-current={isActive ? "page" : undefined}
        title={isCollapsed ? label : undefined}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      onClick={handleClick}
      className={cn(baseClass, activeClass, collapsedClass)}
      aria-pressed={isActive}
      type="button"
      title={isCollapsed ? label : undefined}
    >
      {content}
    </button>
  );
});
