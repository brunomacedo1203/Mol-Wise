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
  className={`${className} 
    sticky top-0 z-[60]
    flex items-center justify-between 
    px-5 md:px-8 py-3
    border-b border-zinc-400 dark:border-white/10
    bg-zinc-100/90 dark:bg-neutral-900/90
    shadow-sm backdrop-blur-md
    transition-all duration-200
    h-16
  `}
>
      {/* ===== Esquerda (Título + Subtítulo) ===== */}
      <div className="flex flex-col max-w-[88%] md:max-w-[80%]">
        <h1
          className="
            text-[15px] sm:text-base md:text-xl lg:text-2xl 
            font-bold text-zinc-900 dark:text-zinc-100 
            leading-tight truncate
          "
        >
          {title}
        </h1>

        {subtitle && (
          <span
            className="
              text-[11px] sm:text-[12px] md:text-sm lg:text-base 
              text-zinc-500 dark:text-zinc-400 
              leading-snug truncate
            "
          >
            {subtitle}
          </span>
        )}
      </div>

      {/* ===== Direita (Controles + Botão Menu) ===== */}
      <div className="flex items-center gap-2">
        {/* Controles Desktop */}
        <div className="hidden md:flex items-center gap-2">
          <LanguageSwitcher />
          <ThemeToggle />
        </div>

        {/* Botão Mobile */}
        <button
          className="md:hidden p-2 rounded-lg hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors"
          aria-label="Abrir menu"
          onClick={() => setMobileOpen(true)}
        >
          <Menu className="w-6 h-6 text-zinc-800 dark:text-zinc-100" />
        </button>
      </div>
    </header>
  );
}
