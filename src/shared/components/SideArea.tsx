"use client";

import React from "react";
import Logo from '@/shared/components/Logo';
import { useCollapsedMenu } from '@/shared/hooks/useCollapsedMenu';
import { IconLayoutSidebarLeftCollapseFilled, IconLayoutSidebarRightCollapseFilled } from "@tabler/icons-react";

export interface SideAreaProps {
  title: string;
  bgClass: string;
  children?: React.ReactNode;
  className?: string;
}

export default function SideArea({
  title,
  bgClass,
  children,
  className,
}: SideAreaProps) {
  const { collapsed, toggleCollapsed } = useCollapsedMenu();

  return (
    <aside
      className={`flex flex-col gap-5 custom-shadow mr-2 transition-width duration-300 ${
        collapsed ? "w-16" : "w-70"
      } border-r border-zinc-300 shadow-md ${bgClass} ${className}`}
    >
      <div className="flex items-center justify-between px-5 h-16 border-b border-zinc-400 shadow-md">
        <Logo 
          collapsed={collapsed} 
          onClick={typeof window !== "undefined" && window.__molwiseSetSectionHome ? window.__molwiseSetSectionHome : undefined} 
        />
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
      {/* Remover Menu daqui, pois agora é passado como children */}
      {/* <Menu collapsed={collapsed} /> */}
      <div>{children}</div>
    </aside>
  );
}
