"use client";

import { memo } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { MenuItemProps } from "../types";
import { MENU_CLASSES } from "../constants";

export const MenuItem = memo(function MenuItem({
  icon: Icon,
  label,
  href,
  onClick,
  isActive,
  isCollapsed,
}: MenuItemProps) {
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

  if (href) {
    return (
      <Link
        href={href}
        className={cn(
          MENU_CLASSES.ITEM,
          isActive && MENU_CLASSES.ACTIVE_ITEM,
          isCollapsed && "justify-center px-0"
        )}
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
      className={cn(
        MENU_CLASSES.ITEM,
        isActive && MENU_CLASSES.ACTIVE_ITEM,
        isCollapsed && "justify-center px-0"
      )}
      aria-pressed={isActive}
      type="button"
      title={isCollapsed ? label : undefined}
    >
      {content}
    </button>
  );
});
