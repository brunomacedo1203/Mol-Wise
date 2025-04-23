"use client";

import React from "react";
import Logo from '@/shared/components/Logo';
import Menu from '@/shared/components/Menu';
import { useCollapsedMenu } from '@/shared/hooks/useCollapsedMenu';
import { IconLayoutSidebarLeftCollapseFilled, IconLayoutSidebarRightCollapseFilled } from "@tabler/icons-react";

export interface SideAreaProps {
  title: string;
  color: string;
  children?: React.ReactNode;
}

export default function SideArea({
  title,
  color,
  children,
}: SideAreaProps) {
  const { collapsed, toggleCollapsed } = useCollapsedMenu();

  return (
    <aside
      className={`flex flex-col gap-5 custom-shadow mr-2 transition-width duration-300 ${
        collapsed ? "w-16" : "w-70"
      } border-r border-zinc-300 shadow-md`}
      style={{ backgroundColor: color }}
    >
      <div className="flex items-center justify-between px-5 h-16 border-b border-zinc-400 shadow-md">
        <Logo collapsed={collapsed} />
        <button
          className="text-xl p-0 rounded-md"
          onClick={toggleCollapsed}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? (
            <IconLayoutSidebarRightCollapseFilled size={30} stroke={1} color="black" />
          ) : (
            <IconLayoutSidebarLeftCollapseFilled size={30} stroke={1} color="black" />
          )}
        </button>
      </div>
      <Menu collapsed={collapsed} />
      <h1>{title}</h1>
      <div>{children}</div>
    </aside>
  );
}
