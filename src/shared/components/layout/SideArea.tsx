// features/sidebar/SideArea.tsx

"use client";

import React from "react";
import Logo from "../brand/Logo";
import {
  IconLayoutSidebarLeftCollapse,
  IconLayoutSidebarRightCollapse,
} from "@tabler/icons-react";
import { useSidebarStore } from "@/shared/store/sidebarStore";

export interface SideAreaProps {
  className?: string;
  collapsed?: boolean;
  onToggleCollapsed?: () => void;
  children?: React.ReactNode;
}

export default function SideArea({
  className = "",
  collapsed: collapsedProp,
  onToggleCollapsed,
  children,
}: SideAreaProps) {
  const collapsed = useSidebarStore((state) => state.collapsed);
  const toggleCollapsed = useSidebarStore((state) => state.toggleCollapsed);

  // Permite sobrescrever via prop, mas padrão é Zustand
  const isCollapsed =
    typeof collapsedProp === "boolean" ? collapsedProp : collapsed;

  const handleToggle = onToggleCollapsed || toggleCollapsed;

  return (
    <aside
      className={`
        flex flex-col
        ${isCollapsed ? "w-16" : "w-64 min-w-64"}
        h-screen
        bg-zinc-100 dark:bg-neutral-900
        border-r border-zinc-300 dark:border-white/10
        shadow-md
        transition-all duration-200
        ${className}
      `}
    >
      <div className="flex items-center justify-between px-5 h-16 border-b border-zinc-400 dark:border-zinc-700">
        <Logo collapsed={isCollapsed ?? false} />
        <button
          className="text-xl p-0 rounded-md"
          onClick={handleToggle}
          aria-label={isCollapsed ? "Expandir menu" : "Colapsar menu"}
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
      <div className="flex-1 overflow-y-auto">{children}</div>
    </aside>
  );
}
