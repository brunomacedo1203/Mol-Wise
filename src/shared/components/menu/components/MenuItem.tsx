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
      <Icon className="w-5 h-5" />
      {!isCollapsed && <span className="text-sm">{label}</span>}
    </>
  );

  if (href) {
    return (
      <Link
        href={href}
        className={cn(MENU_CLASSES.ITEM, isActive && MENU_CLASSES.ACTIVE_ITEM)}
        aria-current={isActive ? "page" : undefined}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      onClick={onClick}
      className={cn(MENU_CLASSES.ITEM, isActive && MENU_CLASSES.ACTIVE_ITEM)}
      aria-pressed={isActive}
      type="button"
    >
      {content}
    </button>
  );
});
