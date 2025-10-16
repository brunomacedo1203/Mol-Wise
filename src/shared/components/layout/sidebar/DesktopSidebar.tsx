"use client";

import React from "react";
import Logo from "@/shared/components/brand/Logo";
import {
  IconLayoutSidebarLeftCollapse,
  IconLayoutSidebarRightCollapse,
} from "@tabler/icons-react";
import { useTranslations } from "next-intl";

interface DesktopSidebarProps {
  collapsed: boolean;
  onToggleCollapse: () => void;
  children: React.ReactNode;
}

export default function DesktopSidebar({
  collapsed,
  onToggleCollapse,
  children,
}: DesktopSidebarProps) {
  const tNav = useTranslations("navigation");
  return (
    <aside
      className={`
        hidden md:flex flex-col
        ${collapsed ? "w-16" : "w-[17rem] min-w-[17rem]"}
        h-screen
        bg-zinc-100 dark:bg-neutral-900
        border-r border-zinc-300 dark:border-white/10
        shadow-md
        transition-all duration-200
        z-[50]
      `}
    >
      <div className="flex items-center justify-between px-5 h-16 border-b border-zinc-400 dark:border-zinc-700">
        <Logo collapsed={collapsed ?? false} />
        <button
          className="text-xl p-0 rounded-md"
          onClick={onToggleCollapse}
          aria-label={collapsed ? tNav("sidebar.expand") : tNav("sidebar.collapse")}
        >
          {collapsed ? (
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