"use client";

import { useRouter, useParams, usePathname } from "next/navigation";
import { Languages } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

interface LanguageSwitcherProps {
  className?: string;
}

export default function LanguageSwitcher({ className }: LanguageSwitcherProps) {
  const router = useRouter();
  const params = useParams();
  const pathname = usePathname();
  const currentLocale = params.locale as string;

  const toggleLanguage = () => {
    const newLocale = currentLocale === "pt" ? "en" : "pt";
    const newPath = pathname.replace(`/${currentLocale}`, `/${newLocale}`);
    router.replace(newPath);
  };

  const t = useTranslations("common.language");

  return (
    <button
      onClick={toggleLanguage}
      className={cn(
        "relative w-20 h-9 flex items-center justify-center gap-2 rounded-full border transition-colors duration-300 outline-none shadow focus:ring-2 focus:ring-cyan-500/50",
        "bg-zinc-100 border-zinc-400 text-zinc-700 hover:bg-zinc-200 dark:bg-zinc-900 dark:border-zinc-400 dark:text-zinc-200 dark:hover:bg-zinc-700",
        className
      )}
      aria-label={t("toggle")}
      tabIndex={0}
    >
      <Languages className="w-5 h-5" strokeWidth={1.5} />
      <span
        className={cn(
          "text-base font-semibold transition-colors duration-200 ",
          currentLocale === "en"
            ? "text-blue-500 dark:text-blue-400"
            : "text-green-600 dark:text-green-400"
        )}
      >
        {currentLocale.toUpperCase()}
      </span>
    </button>
  );
}
