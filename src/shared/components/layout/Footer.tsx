"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import ContactButton from "@/shared/components/common/ContactButton";

export default function Footer() {
  const t = useTranslations("common");
  const email = "molclassapp@gmail.com";

  return (
    <footer
  className={`
    hidden sm:flex flex-col sm:flex-row justify-between items-center gap-3
    py-3 px-4 sm:px-8 text-sm sm:text-base
    bg-zinc-100 border-t border-zinc-300 dark:border-white/10
    text-zinc-600 dark:bg-neutral-900 dark:text-zinc-400
  `}
>

      <div className="flex items-center gap-3">
        <span>{t("footer.contact")}</span>
        <ContactButton email={email} />
      </div>

      <div className="flex items-center gap-3 flex-wrap justify-center sm:justify-end">
        <Link
          href="/privacy-policy"
          className="hover:text-zinc-800 dark:hover:text-zinc-200 underline underline-offset-2"
        >
          {t("footer.privacyPolicy")}
        </Link>
        <span className="text-zinc-400">•</span>
        <Link
          href="/terms-of-use"
          className="hover:text-zinc-800 dark:hover:text-zinc-200 underline underline-offset-2"
        >
          {t("footer.termsOfUse")}
        </Link>
      </div>
    </footer>
  );
}
