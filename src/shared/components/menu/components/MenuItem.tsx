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
      <span
        className={cn(
          "text-base transition-all duration-300 ease-in-out flex-shrink-0",
          isCollapsed ? "hidden" : "whitespace-nowrap max-w-full"
        )}
      >
        {label}
      </span>
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
