"use client";

import React from "react";
import Logo from "../brand/Logo";
import { useCollapsedMenu } from "@/shared/hooks/useCollapsedMenu";
import {
  IconLayoutSidebarLeftCollapse,
  IconLayoutSidebarRightCollapse,
} from "@tabler/icons-react";
import { useTranslations } from "next-intl";

export interface SideAreaProps {
  bgClass?: string;
  children?: React.ReactNode;
  className?: string;
  collapsed?: boolean;
  onToggleCollapsed?: () => void;
}

export default function SideArea({
  children,
  className = "",
  collapsed = false,
  onToggleCollapsed,
}: SideAreaProps) {
  const { collapsed: collapsedState, toggleCollapsed } = useCollapsedMenu();
  const t = useTranslations("common.navigation.menu");

  const isCollapsed =
    typeof collapsed === "boolean" ? collapsed : collapsedState;

  const handleToggle = onToggleCollapsed || toggleCollapsed;

  return (
    <aside
      className={`flex flex-col gap-5 custom-shadow  
    ${isCollapsed ? "w-16" : "w-64 min-w-64"}
    bg-zinc-100 dark:bg-neutral-900 
    border-r border-zinc-300 dark:border-white/10
    shadow-md ${className}`}
    >
      <div className="flex items-center justify-between px-5 h-16 border-b border-zinc-400 dark:border-zinc-700">
        <Logo collapsed={isCollapsed ?? false} />
        <button
          className="text-xl p-0 rounded-md"
          onClick={handleToggle}
          aria-label={isCollapsed ? t("expand") : t("collapse")}
        >
          {isCollapsed ? (
            <IconLayoutSidebarRightCollapse
              size={30}
              stroke={1}
              className="text-black dark:text-white"
            />
          ) : (
            <IconLayoutSidebarLeftCollapse
              size={30}
              stroke={1}
              className="text-black dark:text-white"
            />
          )}
        </button>
      </div>
      <div>{children}</div>
    </aside>
  );
}
