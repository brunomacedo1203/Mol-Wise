"use client";

import React from "react";
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
  const {
    collapsed,
    toggleCollapsed,
    mobileOpen,
    setMobileOpen,
    showSettings,
    setShowSettings,
  } = useSidebarStore();

  return (
    <>
      {/* ===== 🖥️ Sidebar (Desktop) ===== */}
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
      <aside
        className={`md:hidden fixed top-0 left-0 h-full w-[17rem] z-[100]
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
                className="flex items-center gap-6 font-medium text-zinc-700 dark:text-zinc-200"
                onClick={() => setShowSettings(false)}
              >
                <ArrowLeft size={25} />
                Back
              </button>
              <span className="font-medium text-zinc-700 dark:text-zinc-200">
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

            <div className="absolute bottom-0 left-0 right-0 border-t border-zinc-500 dark:border-zinc-700 bg-zinc-100 dark:bg-neutral-900">
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
            <div className="flex-1 overflow-y-auto px-3 py-8 text-zinc-700 dark:text-zinc-200">

              {/* ===== Preferences Section ===== */}
              <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 px-1 mb-2">
                Preferences
              </h3>
              <div className="flex flex-col">
                {/* Language */}
                <div className="flex justify-start items-center gap-x-3 py-3 px-2">
                  <span className="font-medium">Language</span>
                  <LanguageSwitcher />
                </div>

                {/* Theme */}
                <div className="flex justify-start items-center gap-x-3 py-3 px-2">
                  <span className="font-medium">Theme</span>
                  <ThemeToggle />
                </div>
              </div>

              {/* Divider */}
              <div className="my-6 border-t border-zinc-300 dark:border-zinc-700" />

              {/* ===== About Section ===== */}
              <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 px-1 mb-2">
                About
              </h3>
              <div className="flex flex-col gap-2">
                <Link
                  href="/privacy-policy"
                  className="py-2 px-1 text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white transition-colors rounded hover:bg-zinc-200/30 dark:hover:bg-zinc-800/30"
                  onClick={() => setMobileOpen(false)}
                >
                  <span className="underline-offset-2 hover:underline">
                    Privacy Policy
                  </span>
                </Link>

                <Link
                  href="/terms-of-use"
                  className="py-2 px-1 text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white transition-colors rounded hover:bg-zinc-200/30 dark:hover:bg-zinc-800/30"
                  onClick={() => setMobileOpen(false)}
                >
                  <span className="underline-offset-2 hover:underline">
                    Terms of Use
                  </span>
                </Link>

                <Link
                  href="/contact"
                  className="py-2 px-1 text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white transition-colors rounded hover:bg-zinc-200/30 dark:hover:bg-zinc-800/30"
                  onClick={() => setMobileOpen(false)}
                >
                  <span className="underline-offset-2 hover:underline">
                    Contact
                  </span>
                </Link>
              </div>
            </div>       
       
          </div>
        )}
      </aside>
    </>
  );
}