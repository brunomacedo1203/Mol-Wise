"use client";

import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTheme } from "@/shared/contexts/ThemeContext";
import { useTranslations } from 'next-intl';

interface ThemeToggleProps {
  className?: string;
}

export function ThemeToggle({ className }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme(); // <-- Usa o contexto
  const isDark = theme === "dark";

  const t = useTranslations('common.theme');

  return (
    <button
      onClick={toggleTheme}
      className={cn(
        "relative w-20 h-9 flex items-center rounded-full border transition-colors duration-300 outline-none shadow focus:ring-2 focus:ring-cyan-500/50",
        isDark ? "bg-zinc-900 border-zinc-600" : "bg-zinc-100 border-zinc-200",
        className
      )}
      aria-label={t('toggle')}
      tabIndex={0}
    >
      {/* Fundo: só exibe o ícone NÃO coberto pelo knob */}
      <span className="grid grid-cols-2 w-full h-full z-10">
        <span className="flex items-center justify-center">
          {!isDark && (
            <Moon
              className="w-5 h-5 text-zinc-500 transition-colors duration-200"
              strokeWidth={1.4}
            />
          )}
        </span>
        <span className="flex items-center justify-center">
          {isDark && (
            <Sun
              className="w-5 h-5 text-yellow-300 transition-colors duration-200"
              strokeWidth={1.4}
            />
          )}
        </span>
      </span>
      {/* Knob animado com ícone destacado */}
      <span
        className={cn(
          "absolute  w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300 shadow-md z-10",
          isDark ? "left-1 bg-zinc-700" : "left-[55%] bg-zinc-300"
        )}
      >
        {isDark ? (
          <Moon className="w-5 h-5 text-white" strokeWidth={1.5} />
        ) : (
          <Sun className="w-5 h-5 text-yellow-600" strokeWidth={1.5} />
        )}
      </span>
    </button>
  );
}
