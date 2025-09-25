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
    window.location.href = "mailto:" + "molclassapp" + "@gmail.com" + "?subject=Contato via MolWise";
  };

  const handleRightClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const email = "molclassapp" + "@gmail.com";
    navigator.clipboard.writeText(email).then(() => {
      // Você pode adicionar uma notificação aqui se desejar
      console.log("Email copiado para a área de transferência");
    }).catch(() => {
      // Fallback para navegadores mais antigos
      console.log("Não foi possível copiar automaticamente");
    });
  };

  return (
    <footer 
      className={` 
        flex flex-col md:flex-row justify-between items-center 
        gap-2 md:gap-0 h-auto md:h-16 text-base px-4 md:px-10 
        bg-zinc-100 border-t border-zinc-400 dark:border-white/10 
        text-zinc-500 dark:bg-neutral-900 
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
                <Mail className="w-4 h-4 text-zinc-600 dark:text-zinc-300" />
              </button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{"molclassapp" + "@gmail.com"}</p>
              <p className="text-xs text-zinc-400 mt-1">{t("footer.rightClickToCopy")}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
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
