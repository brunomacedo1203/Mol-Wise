"use client";

import React from "react";
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
  return (
    <div className="flex items-center justify-between px-5 h-16 border-b border-zinc-400 dark:border-zinc-700">
      {!showSettings ? (
        <>
          <Logo collapsed={false} />
          <button
            className="p-2 rounded-md hover:bg-zinc-200 dark:hover:bg-zinc-800"
            onClick={onClose}
            aria-label="Fechar menu"
          >
            <X size={22} className="text-zinc-800 dark:text-zinc-100" />
          </button>
        </>
      ) : (
        <>
          <button
            className="flex items-center gap-6 font-medium text-zinc-700 dark:text-zinc-200"
            onClick={onBack}
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
  );
}