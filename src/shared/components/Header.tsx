import React from "react";
import { useSubtitle } from "@/shared/contexts/SubtitleContext";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import LanguageSwitcher from "./LanguageSwitcher";

export interface HeaderProps {
  title: string;
  className?: string;
}

export default function Header(props: HeaderProps) {
  const subtitle = useSubtitle();
  return (
    <div
      className={`
        flex flex-col justify-center px-5
        border-b border-zinc-400 dark:border-white/10
        shadow-md bg-white dark:bg-neutral-900 dark:backdrop-blur-sm
        ${props.className ?? ""}
      `}
    >
      <div className="flex justify-between items-start">
        <div className="flex flex-col">
          <h1 className="text-xl font-black text-zinc-900 dark:text-zinc-100 mb-0">
            {props.title}
          </h1>
          {subtitle && (
            <h2 className="text-sm text-zinc-600 dark:text-zinc-300 mt-0 mb-1">
              {subtitle}
            </h2>
          )}
        </div>
        <div className="flex items-center gap-2 mt-2">
          <LanguageSwitcher />
          <ThemeToggle />
        </div>
      </div>
    </div>
  );
}
