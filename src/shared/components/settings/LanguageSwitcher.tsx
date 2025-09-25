"use client";

import Image from "next/image";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { trackLanguageChange } from "@/shared/events/interfaceEvents";
import { useRouter, usePathname } from "@/i18n/navigation";
import { useEffect } from "react";
import { useLocale } from "next-intl";

const LOCALES = [
  { code: "pt", flag: "/flags/br.png" },
  { code: "en", flag: "/flags/us.png" },
  { code: "fr", flag: "/flags/fr.png" },
  { code: "de", flag: "/flags/de.png" },
  { code: "es", flag: "/flags/es.png" },
  { code: "ar", flag: "/flags/sa.png" },
  { code: "hi", flag: "/flags/in.png" },
  { code: "ru", flag: "/flags/ru.png" },
  { code: "zh", flag: "/flags/cn.png" },
  { code: "id", flag: "/flags/id.png" },
  { code: "bn", flag: "/flags/bn.png" },
] as const;

interface LanguageSwitcherProps {
  className?: string;
}

export default function LanguageSwitcher({ className }: LanguageSwitcherProps) {
  const t = useTranslations("languages");
  const pathname = usePathname();
  const router = useRouter();

  // Use o hook useLocale do next-intl para obter o locale atual
  const currentLocale = useLocale();

  // Garante que o cookie está sempre atualizado com o locale atual
  useEffect(() => {
    if (currentLocale) {
      // Define o cookie que o middleware vai verificar
      document.cookie = `NEXT_LOCALE=${currentLocale}; path=/; max-age=31536000; SameSite=Lax`;
    }
  }, [currentLocale]);

  const handleChange = (nextLocale: string) => {
    if (!nextLocale || nextLocale === currentLocale) return;

    // Rastrear mudança de idioma
    trackLanguageChange({
      from_language: currentLocale,
      to_language: nextLocale,
      trigger_method: "manual",
      section: "header",
    });

    // Definir o cookie antes de navegar
    document.cookie = `NEXT_LOCALE=${nextLocale}; path=/; max-age=31536000; SameSite=Lax`;

    // Para português (default locale), navegar para a raiz sem prefixo
    if (nextLocale === "pt") {
      // Se estamos na home, forçar reload para garantir o locale correto
      if (pathname === "/") {
        window.location.href = "/";
        return;
      }
      // Para outras páginas, navegar normalmente
      router.replace(pathname, { locale: nextLocale });
    } else {
      // Para outros idiomas, usar navegação normal
      router.replace(pathname, { locale: nextLocale });
    }
  };

  const current = LOCALES.find((l) => l.code === currentLocale) ?? LOCALES[0];

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <Select value={currentLocale} onValueChange={handleChange}>
        <SelectTrigger
          aria-label={t("Select language")}
          className="w-[140px] h-9 border border-zinc-400 dark:border-zinc-400 rounded-full px-4 hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors"
        >
          <div className="flex items-center gap-2">
            <div className="relative w-5 h-[15px]">
              <Image
                src={current.flag}
                alt={`Bandeira de ${t(current.code)}`}
                width={20}
                height={15}
                className="rounded-sm object-contain shadow-sm"
              />
            </div>
            <span className="leading-none">{t(current.code)}</span>
          </div>
        </SelectTrigger>

        <SelectContent align="end">
          {LOCALES.map(({ code, flag }) => (
            <SelectItem key={code} value={code}>
              <span className="flex items-center gap-2">
                <Image
                  src={flag}
                  alt={`Bandeira de ${t(code)}`}
                  width={20}
                  height={15}
                  className="rounded-sm shadow-sm"
                  style={{ width: "auto", height: "auto" }}
                />
                <span>{t(code)}</span>
              </span>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
