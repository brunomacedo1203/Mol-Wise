"use client";

import React, { useState } from "react";
import Logo from "../brand/Logo";
import {
  IconLayoutSidebarLeftCollapse,
  IconLayoutSidebarRightCollapse,
} from "@tabler/icons-react";
import { X, Settings, ArrowLeft } from "lucide-react";
import { useSidebarStore } from "@/shared/store/sidebarStore";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import LanguageSwitcher from "@/shared/components/settings/LanguageSwitcher";
import Link from "next/link";

export default function SideArea({ children }: { children: React.ReactNode }) {
  const { collapsed, toggleCollapsed, mobileOpen, setMobileOpen } =
    useSidebarStore();
  const [showSettings, setShowSettings] = useState(false);

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
          z-[50]
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
      {/* Fundo escurecido */}
      <div
        className={`fixed inset-0 z-[90] bg-black/40 backdrop-blur-sm transition-opacity duration-200 ${
          mobileOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={() => {
          setMobileOpen(false);
          setShowSettings(false);
        }}
      />

      {/* Drawer lateral */}
      {/* Drawer lateral */}
{/* Drawer lateral */}
<aside
  className={`md:hidden fixed top-0 left-0 h-full w-64 z-[100]
    bg-zinc-100 dark:bg-neutral-900
    border-r border-zinc-300 dark:border-zinc-700
    shadow-lg transform transition-transform duration-300
    ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
  `}
>
  {/* Cabeçalho */}
  <div className="flex items-center justify-between px-5 h-16 border-b border-zinc-400 dark:border-zinc-700">
    {!showSettings ? (
      <>
        <Logo collapsed={false} />
        <button
          className="p-2 rounded-md hover:bg-zinc-200 dark:hover:bg-zinc-800"
          onClick={() => setMobileOpen(false)}
          aria-label="Fechar menu"
        >
          <X size={22} className="text-zinc-800 dark:text-zinc-100" />
        </button>
      </>
    ) : (
      <>
        <button
          className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-300"
          onClick={() => setShowSettings(false)}
        >
          <ArrowLeft size={18} />
          Back
        </button>
        <span className="font-semibold text-zinc-700 dark:text-zinc-200">
          Settings
        </span>
        <div className="w-6" />
      </>
    )}
  </div>

  {/* ===== Conteúdo principal ===== */}
  {!showSettings ? (
  // ===== Default menu with Settings button =====
  <div className="relative h-[calc(100%-4rem)]">
    <div className="overflow-y-auto h-full pb-16">{children}</div>

    <div className="absolute bottom-0 left-0 right-0 border-t border-zinc-300 dark:border-zinc-700 bg-zinc-100 dark:bg-neutral-900">
      <button
        onClick={() => setShowSettings(true)}
        className="flex items-center gap-3 w-full px-5 py-3 text-zinc-700 dark:text-zinc-200 hover:bg-zinc-200/50 dark:hover:bg-zinc-800 transition-colors"
      >
        <Settings size={20} />
        <span>Settings</span>
      </button>
    </div>
  </div>
) : (
  // ===== SETTINGS PANEL =====
  <div className="flex flex-col justify-between h-[calc(100%-4rem)]">
    <div className="flex-1 overflow-y-auto px-5 py-6 text-zinc-700 dark:text-zinc-200">
      {/* Theme & Language */}
      <div className="flex flex-col gap-5">
        {/* Theme */}
        <div className="flex justify-between items-center py-2 px-3 rounded-lg bg-zinc-200/40 dark:bg-zinc-800/40">
          <span className="font-medium text-sm">Theme</span>
          <ThemeToggle />
        </div>

        {/* Language */}
        <div className="flex justify-between items-center py-2 px-3 rounded-lg bg-zinc-200/40 dark:bg-zinc-800/40">
          <span className="font-medium text-sm">Language</span>
          <LanguageSwitcher />
        </div>
      </div>

      {/* Divider */}
      <div className="my-6 border-t border-zinc-300 dark:border-zinc-700" />

      {/* Footer Links */}
      <div className="flex flex-col gap-3 text-sm">
        <Link
          href="/privacy-policy"
          className="flex items-center gap-2 text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white transition-colors"
          onClick={() => setMobileOpen(false)}
        >
          <span className="underline-offset-2 hover:underline">
            Privacy Policy
          </span>
        </Link>

        <Link
          href="/terms-of-use"
          className="flex items-center gap-2 text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white transition-colors"
          onClick={() => setMobileOpen(false)}
        >
          <span className="underline-offset-2 hover:underline">
            Terms of Use
          </span>
        </Link>

        <Link
          href="/contact"
          className="flex items-center gap-2 text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white transition-colors"
          onClick={() => setMobileOpen(false)}
        >
          <span className="underline-offset-2 hover:underline">Contact</span>
        </Link>
      </div>
    </div>

    {/* Footer with Back Button */}
    <div className="border-t border-zinc-300 dark:border-zinc-700 bg-zinc-100 dark:bg-neutral-900">
      <button
        onClick={() => setShowSettings(false)}
        className="flex items-center gap-2 w-full px-5 py-3 text-sm font-medium text-zinc-700 dark:text-zinc-200 hover:bg-zinc-200/50 dark:hover:bg-zinc-800 transition-colors"
      >
        <ArrowLeft size={18} />
        Back to menu
      </button>
    </div>
  </div>
)}

</aside>


    </>
  );
}
