"use client";

import React from "react";
import Logo from "../brand/Logo";
import {
  IconLayoutSidebarLeftCollapse,
  IconLayoutSidebarRightCollapse,
} from "@tabler/icons-react";
import { X } from "lucide-react";
import { useSidebarStore } from "@/shared/store/sidebarStore";

export default function SideArea({ children }: { children: React.ReactNode }) {
  const { collapsed, toggleCollapsed, mobileOpen, setMobileOpen } =
    useSidebarStore();

  return (
    <>
      {/* ===== 🖥️ Sidebar (Desktop) ===== */}
      <aside
        className={`
          hidden md:flex flex-col
          ${collapsed ? "w-16" : "w-64 min-w-64"}
          h-screen
          bg-zinc-100 dark:bg-neutral-900
          border-r border-zinc-300 dark:border-white/10
          shadow-md
          transition-all duration-200
        `}
      >
        <div className="flex items-center justify-between px-5 h-16 border-b border-zinc-400 dark:border-zinc-700">
          <Logo collapsed={collapsed ?? false} />
          <button
            className="text-xl p-0 rounded-md"
            onClick={toggleCollapsed}
            aria-label={collapsed ? "Expandir menu" : "Colapsar menu"}
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

      {/* ===== 📱 Drawer (Mobile) ===== */}
      <div
        className={`fixed inset-0 z-[80] bg-black/40 transition-opacity duration-200 ${
          mobileOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setMobileOpen(false)}
      />

      {/* Drawer lateral */}
      <aside
        className={`md:hidden fixed top-0 left-0 h-full w-64 z-[90] bg-zinc-100 dark:bg-neutral-900 
          border-r border-b border-zinc-400 dark:border-zinc-700 
          transform transition-transform duration-300 ${
            mobileOpen ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        <div className="flex items-center justify-between px-5 h-16 border-b border-zinc-400 dark:border-zinc-700">
          <Logo collapsed={false} />
          <button
            className="p-2 rounded-md hover:bg-zinc-200 dark:hover:bg-zinc-800"
            onClick={() => setMobileOpen(false)}
            aria-label="Fechar menu"
          >
            <X size={22} className="text-zinc-800 dark:text-zinc-100" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto">{children}</div>
      </aside>
    </>
  );
}
