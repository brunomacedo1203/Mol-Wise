import React from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function Footer() {
  const t = useTranslations("common");
  return (
    <footer
      className={`
  flex justify-between items-center
  h-16 text-base px-10 bg-zinc-100
  border-t border-zinc-400 dark:border-white/10
  text-zinc-500 dark:bg-neutral-900
`}
    >
      <span>{t("footer.contact")}</span>
      <div className="flex items-center gap-4">
        <Link 
          href="/privacy-policy" 
          className="hover:text-zinc-700 dark:hover:text-zinc-300 transition-colors underline"
        >
          {t("footer.privacyPolicy")}
        </Link>
        <span className="text-zinc-400">•</span>
        <Link 
          href="/terms-of-use" 
          className="hover:text-zinc-700 dark:hover:text-zinc-300 transition-colors underline"
        >
          {t("footer.termsOfUse")}
        </Link>
      </div>
    </footer>
  );
}
