"use client";

import { memo } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { MenuItemProps } from "../types";
import { MENU_CLASSES } from "../constants";

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
      onClick={onClick}
      className={cn(baseClass, activeClass, collapsedClass)}
      aria-pressed={isActive}
      type="button"
      title={isCollapsed ? label : undefined}
    >
      {content}
    </button>
  );
});
