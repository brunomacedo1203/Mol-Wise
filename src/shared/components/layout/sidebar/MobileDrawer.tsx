"use client";

import React from "react";
import MobileDrawerHeader from "./MobileDrawerHeader";
import SettingsPanel from "./SettingsPanel";

interface MobileDrawerProps {
  open: boolean;
  showSettings: boolean;
  onClose: () => void;
  onBack: () => void;
  onOpenSettings: () => void;
  onNavigate: () => void;
  children: React.ReactNode;
}

export default function MobileDrawer({
  open,
  showSettings,
  onClose,
  onBack,
  onOpenSettings,
  onNavigate,
  children,
}: MobileDrawerProps) {
  return (
    <>
      <div
        className={`fixed inset-0 z-[90] bg-black/40 backdrop-blur-sm transition-opacity duration-200 ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      <aside
        className={`md:hidden fixed top-0 left-0 h-full w-[17rem] z-[100]
          bg-zinc-100 dark:bg-neutral-900
          border-r border-zinc-300 dark:border-zinc-700
          shadow-lg transform transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <MobileDrawerHeader showSettings={showSettings} onClose={onClose} onBack={onBack} />

        {!showSettings ? (
          <div className="relative h-[calc(100%-4rem)]">
            <div className="overflow-y-auto h-full pb-16">{children}</div>

            <div className="absolute bottom-0 left-0 right-0 border-t border-zinc-500 dark:border-zinc-700 bg-zinc-100 dark:bg-neutral-900">
              <button
                onClick={onOpenSettings}
                className="flex items-center gap-3 w-full px-5 py-3 text-zinc-700 dark:text-zinc-200 hover:bg-zinc-200/50 dark:hover:bg-zinc-800 transition-colors"
              >
                {/* Ícone de engrenagem em texto para manter dependência leve */}
                <span className="inline-block w-5 h-5">⚙️</span>
                <span>Settings</span>
              </button>
            </div>
          </div>
        ) : (
          <SettingsPanel onNavigate={onNavigate} />
        )}
      </aside>
    </>
  );
}