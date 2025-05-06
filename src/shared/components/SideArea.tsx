"use client";

import React from "react";
import Logo from "@/shared/components/Logo";
import { useCollapsedMenu } from "@/shared/hooks/useCollapsedMenu";
import {
  IconLayoutSidebarLeftCollapse,
  IconLayoutSidebarRightCollapse,
} from "@tabler/icons-react";

export interface SideAreaProps {
  bgClass: string;
  children?: React.ReactNode;
  className?: string;
  collapsed?: boolean;
  onToggleCollapsed?: () => void;
  title?: string;
}

export default function SideArea({
  bgClass,
  children,
  className,
  collapsed = false,
  onToggleCollapsed,
}: SideAreaProps) {
  const { collapsed: collapsedState, toggleCollapsed } = useCollapsedMenu();

  const isCollapsed =
    typeof collapsed === "boolean" ? collapsed : collapsedState;

  const handleToggle = onToggleCollapsed || toggleCollapsed;

  return (
    <aside
      className={`flex flex-col gap-5 custom-shadow mr-1 transition-width duration-300 ${
        isCollapsed ? "w-16" : "w-70"
      } border-r border-zinc-300 shadow-md ${bgClass} ${className}`}
    >
      <div className="flex items-center justify-between px-5 h-16 border-b border-zinc-400 shadow-md">
        <Logo collapsed={isCollapsed ?? false} />
        <button
          className="text-xl p-0 rounded-md"
          onClick={handleToggle}
          aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {isCollapsed ? (
            <IconLayoutSidebarRightCollapse
              size={30}
              stroke={1}
              color="black"
            />
          ) : (
            <IconLayoutSidebarLeftCollapse size={30} stroke={1} color="black" />
          )}
        </button>
      </div>
      <div>{children}</div>
    </aside>
  );
}
