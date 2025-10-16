"use client";

import React from "react";
import { useTranslations } from "next-intl";
import Logo from "@/shared/components/brand/Logo";
import { X, ArrowLeft } from "lucide-react";

interface MobileDrawerHeaderProps {
  showSettings: boolean;
  onClose: () => void;
  onBack: () => void;
}

export default function MobileDrawerHeader({
  showSettings,
  onClose,
  onBack,
}: MobileDrawerHeaderProps) {
  const tSidebar = useTranslations("sidebar");
  const tNav = useTranslations("navigation");
  return (
    <div className="px-5 h-16 border-b border-zinc-400 dark:border-zinc-700">
      {!showSettings ? (
        <div className="flex items-center justify-between h-full">
          <Logo collapsed={false} />
          <button
            className="p-2 rounded-md hover:bg-zinc-200 dark:hover:bg-zinc-800"
            onClick={onClose}
            aria-label={tNav("close")}
          >
            <X size={22} className="text-zinc-800 dark:text-zinc-100" />
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-[auto_1fr_auto] items-center h-full">
          <button
            className="flex items-center gap-2 font-medium text-zinc-700 dark:text-zinc-200 px-2 py-1 rounded-md hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors"
            onClick={onBack}
          >
            <ArrowLeft size={20} />
            {tSidebar("back")}
          </button>
          <span className="justify-self-center font-medium text-zinc-700 dark:text-zinc-200">
            {tSidebar("settings")}
          </span>
          <div />
        </div>
      )}
    </div>
  );
}