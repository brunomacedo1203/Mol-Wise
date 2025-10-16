"use client";

import React from "react";
import { Mail } from "lucide-react";
import { useTranslations } from "next-intl";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type ContactButtonProps = {
  variant?: "icon" | "list";
  className?: string;
  onAfterClick?: () => void;
  email?: string;
  subject?: string;
  label?: string;
};

export default function ContactButton({
  variant = "icon",
  className,
  onAfterClick,
  email = "molclassapp@gmail.com",
  subject = "Contato via MolWise",
  label,
}: ContactButtonProps) {
  const t = useTranslations("common");

  const handleEmailClick = () => {
    // Dispara o cliente de email com assunto predefinido
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}`;
    // Fecha menus/drawers se necessário
    if (onAfterClick) onAfterClick();
  };

  const handleRightClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigator.clipboard
      .writeText(email)
      .then(() => console.log("Email copiado"))
      .catch(() => console.log("Falha ao copiar"));
  };

  if (variant === "list") {
    return (
      <button
        onClick={handleEmailClick}
        onContextMenu={handleRightClick}
        className={
          className ??
          "py-2 px-1 text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white transition-colors rounded hover:bg-zinc-200/30 dark:hover:bg-zinc-800/30"
        }
        aria-label={label ?? t("footer.contact")}
      >
        <span className="underline-offset-2 hover:underline">{label ?? t("footer.contact")}</span>
      </button>
    );
  }

  // Variante padrão: botão icônico com tooltip (usado no desktop/Footer)
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            onClick={handleEmailClick}
            onContextMenu={handleRightClick}
            className={
              className ??
              "flex items-center justify-center w-8 h-8 rounded-full bg-zinc-200 dark:bg-zinc-700 hover:bg-zinc-300 dark:hover:bg-zinc-600 transition-colors"
            }
            aria-label={label ?? t("footer.contact")}
          >
            <Mail className="w-4 h-4 text-zinc-700 dark:text-zinc-300" />
          </button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{email}</p>
          <p className="text-xs text-zinc-400 mt-1">{t("footer.rightClickToCopy")}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}