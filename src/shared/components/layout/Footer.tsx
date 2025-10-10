"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Mail } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function Footer() {
  const t = useTranslations("common");

  const handleEmailClick = () => {
    window.location.href =
      "mailto:" + "molclassapp" + "@gmail.com" + "?subject=Contato via MolWise";
  };

  const handleRightClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const email = "molclassapp" + "@gmail.com";
    navigator.clipboard
      .writeText(email)
      .then(() => console.log("Email copiado"))
      .catch(() => console.log("Falha ao copiar"));
  };

  return (
    <footer
      className={`
        flex flex-col sm:flex-row justify-between items-center gap-3
        py-3 px-4 sm:px-8 text-sm sm:text-base
        bg-zinc-100 border-t border-zinc-300 dark:border-white/10
        text-zinc-600 dark:bg-neutral-900 dark:text-zinc-400
      `}
    >
      <div className="flex items-center gap-3">
        <span>{t("footer.contact")}</span>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={handleEmailClick}
                onContextMenu={handleRightClick}
                className="flex items-center justify-center w-8 h-8 rounded-full bg-zinc-200 dark:bg-zinc-700 hover:bg-zinc-300 dark:hover:bg-zinc-600 transition-colors"
                aria-label="Enviar email"
              >
                <Mail className="w-4 h-4 text-zinc-700 dark:text-zinc-300" />
              </button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{"molclassapp@gmail.com"}</p>
              <p className="text-xs text-zinc-400 mt-1">
                {t("footer.rightClickToCopy")}
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
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
