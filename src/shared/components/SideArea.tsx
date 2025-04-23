"use client";

import React, { useState } from "react";
import Logo from '@/shared/components/Logo';
import Menu from '@/shared/components/Menu';

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
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={`flex flex-col gap-5 custom-shadow mr-2 transition-width duration-300 ${
        collapsed ? "w-16" : "w-70"
      }`}
      style={{ backgroundColor: color }}
    >
      <Logo setCollapsed={setCollapsed} collapsed={collapsed} />
      <Menu collapsed={collapsed} />
      <h1>{title}</h1>
      <div>{children}</div>
    </aside>
  );
}
