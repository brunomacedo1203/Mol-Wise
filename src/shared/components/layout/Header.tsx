// features/layout/Header.tsx
"use client";
import { useSubtitleStore } from "@/shared/store/subtitleStore";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import LanguageSwitcher from "@/shared/components/settings/LanguageSwitcher";
import { useSidebarStore } from "@/shared/store/sidebarStore";
import { Menu } from "lucide-react";

export default function Header({
  title,
  className = "",
}: {
  title: string;
  className?: string;
}) {
  const subtitle = useSubtitleStore((s) => s.subtitle);
  const setMobileOpen = useSidebarStore((s) => s.setMobileOpen);

  return (
    <header
      className={`${className} flex items-center justify-between px-4 
     border-b border-zinc-400 dark:border-white/10
        shadow-md bg-white dark:bg-neutral-900 dark:backdrop-blur-sm
        h-16 bg-zinc-100
  `}
    >
      {/* Esquerda */}
      <div className="flex flex-col">
        <h1 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
          {title}
        </h1>
        {subtitle && (
          <span className="text-sm text-zinc-500 dark:text-zinc-400">
            {subtitle}
          </span>
        )}
      </div>

      {/* Direita */}
      <div className="flex items-center gap-2">
        <div className="hidden md:flex items-center gap-2">
          <LanguageSwitcher />
          <ThemeToggle />
        </div>

        {/* Botão mobile */}
        <button
          className="md:hidden p-2 rounded-lg hover:bg-zinc-200 dark:hover:bg-zinc-800"
          aria-label="Abrir menu"
          onClick={() => setMobileOpen(true)}
        >
          <Menu className="w-6 h-6 text-zinc-800 dark:text-zinc-100" />
        </button>
      </div>
    </header>
  );
}
