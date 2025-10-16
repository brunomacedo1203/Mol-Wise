"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import LanguageSwitcher from "@/shared/components/settings/LanguageSwitcher";
import Link from "next/link";
import ContactButton from "@/shared/components/common/ContactButton";

interface SettingsPanelProps {
  onNavigate: () => void;
}

export default function SettingsPanel({ onNavigate }: SettingsPanelProps) {
  const t = useTranslations("sidebar");
  return (
    <div className="flex flex-col justify-between h-[calc(100%-4rem)]">
      <div className="flex-1 overflow-y-auto px-3 py-8 text-zinc-700 dark:text-zinc-200">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 px-1 mb-2">
          {t("preferences")}
        </h3>
        <div className="flex flex-col">
          <div className="flex justify-start items-center gap-x-3 py-3 px-2">
            <span className="font-medium">{t("language")}</span>
            <LanguageSwitcher />
          </div>
          <div className="flex justify-start items-center gap-x-3 py-3 px-2">
            <span className="font-medium">{t("theme")}</span>
            <ThemeToggle />
          </div>
        </div>

        <div className="my-6 border-t border-zinc-300 dark:border-zinc-700" />

        <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 px-1 mb-2">
          {t("about")}
        </h3>
        <div className="flex flex-col gap-2">
          <Link
            href="/privacy-policy"
            className="py-2 px-1 text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white transition-colors rounded hover:bg-zinc-200/30 dark:hover:bg-zinc-800/30"
            onClick={onNavigate}
          >
            <span className="underline-offset-2 hover:underline">{t("privacyPolicy")}</span>
          </Link>
          <Link
            href="/terms-of-use"
            className="py-2 px-1 text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white transition-colors rounded hover:bg-zinc-200/30 dark:hover:bg-zinc-800/30"
            onClick={onNavigate}
          >
            <span className="underline-offset-2 hover:underline">{t("termsOfUse")}</span>
          </Link>
          <ContactButton
            className="flex justify-start items-center py-2 px-1"
            variant="list"
            onAfterClick={onNavigate}
          />
        </div>
      </div>
    </div>
  );
}