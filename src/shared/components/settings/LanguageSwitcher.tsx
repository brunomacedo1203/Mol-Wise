"use client";

import Image from "next/image";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Portal } from "@radix-ui/react-select";
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
  const currentLocale = useLocale();

  // mantém o cookie sincronizado
  useEffect(() => {
    if (currentLocale) {
      document.cookie = `NEXT_LOCALE=${currentLocale}; path=/; max-age=31536000; SameSite=Lax`;
    }
  }, [currentLocale]);

  const handleChange = (nextLocale: string) => {
    if (!nextLocale || nextLocale === currentLocale) return;

    // registra evento analítico
    trackLanguageChange({
      from_language: currentLocale,
      to_language: nextLocale,
      trigger_method: "manual",
      section: "settings-panel",
    });

    // atualiza cookie
    document.cookie = `NEXT_LOCALE=${nextLocale}; path=/; max-age=31536000; SameSite=Lax`;

    // Navegação imediata - o dropdown fecha automaticamente
    // O menu de settings permanece aberto via gerenciamento de estado do SideArea
    router.replace(pathname, { locale: nextLocale });
  };

  const current = LOCALES.find((l) => l.code === currentLocale) ?? LOCALES[0];

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <Select value={currentLocale} onValueChange={handleChange}>
        <SelectTrigger
          aria-label={t("Select language")}
          className="w-[150px] h-9 border border-zinc-400 dark:border-zinc-600 rounded-full px-4 hover:bg-zinc-200/60 dark:hover:bg-zinc-800 transition-colors"
        >
          <div className="flex items-center gap-2">
            <div className="relative flex items-center justify-center" style={{ width: '20px', height: '15px' }}>
              <Image
                src={current.flag}
                alt={`Flag of ${t(current.code)}`}
                fill
                className="rounded-sm object-contain shadow-sm"
                sizes="20px"
              />
            </div>
            <SelectValue>
              <span className="leading-none text-sm">{t(current.code)}</span>
            </SelectValue>
          </div>
        </SelectTrigger>

        <Portal>
          <SelectContent
            align="end"
            position="popper"
            sideOffset={6}
            onClick={(e) => e.stopPropagation()} // impede fechamento do menu
            className={cn(
              "z-[9999] bg-zinc-100 dark:bg-neutral-800 border border-zinc-300 dark:border-zinc-700 shadow-xl rounded-lg py-2 w-[150px]",
              "data-[state=open]:animate-in data-[state=closed]:animate-out",
              "data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95",
              "data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95"
            )}
          >
            {LOCALES.map(({ code, flag }) => (
              <SelectItem
                key={code}
                value={code}
                className="cursor-pointer focus:bg-zinc-200 dark:focus:bg-zinc-700 px-3 py-2 rounded-md transition-colors"
              >
                <span className="flex items-center gap-2">
                  <div className="relative flex items-center justify-center" style={{ width: '24px', height: '16px' }}>
                    <Image
                      src={flag}
                      alt={`Flag of ${t(code)}`}
                      fill
                      className="rounded-sm object-contain shadow-sm"
                      sizes="24px"
                    />
                  </div>
                  <span className="text-sm font-medium">{t(code)}</span>
                </span>
              </SelectItem>
            ))}
          </SelectContent>
        </Portal>
      </Select>
    </div>
  );
}