"use client";

import Image from "next/image";
import { useParams, usePathname } from "next/navigation"; // Removido useRouter
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

const LOCALES = [
  { code: "pt", flag: "/flags/br.png" },
  { code: "en", flag: "/flags/us.png" },
  // Temporariamente desabilitados para teste:
  // { code: "fr", flag: "/flags/fr.png" },
  // { code: "de", flag: "/flags/de.png" },
  // { code: "es", flag: "/flags/es.png" },
  // { code: "ar", flag: "/flags/sa.png" },
  // { code: "hi", flag: "/flags/in.png" },
  // { code: "ru", flag: "/flags/ru.png" },
  // { code: "zh", flag: "/flags/cn.png" },
] as const;

interface LanguageSwitcherProps {
  className?: string;
}

export default function LanguageSwitcher({ className }: LanguageSwitcherProps) {
  const t = useTranslations("languages");
  const params = useParams();
  const pathname = usePathname();
  const currentLocale = params.locale as string;

  const handleChange = (nextLocale: string) => {
    if (!nextLocale || nextLocale === currentLocale) return;

    // Limpa o cookie atual do next-intl
    document.cookie =
      "NEXT_LOCALE=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;";

    // Define o novo cookie
    document.cookie = `NEXT_LOCALE=${nextLocale}; path=/; max-age=31536000`; // 1 ano

    // Se não for português, salva também um cookie personalizado para controle extra
    if (nextLocale !== "pt") {
      document.cookie = `user-locale=${nextLocale}; path=/; max-age=31536000`;
    } else {
      // Remove o cookie personalizado se voltar para português
      document.cookie =
        "user-locale=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
    }

    // Constrói o novo caminho
    const newPath = pathname.replace(`/${currentLocale}`, `/${nextLocale}`);

    // Usa window.location.href ao invés de router.replace para garantir que os cookies sejam enviados
    window.location.href = newPath;
  };

  const current = LOCALES.find((l) => l.code === currentLocale) ?? LOCALES[0];

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <Select value={currentLocale} onValueChange={handleChange}>
        <SelectTrigger className="w-[140px] h-9 border border-zinc-400 dark:border-zinc-400 rounded-full px-4 hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors">
          <div className="flex items-center gap-2">
            <div className="relative w-5 h-[15px]">
              <Image
                src={current.flag}
                alt={`Bandeira de ${t(current.code)}`}
                fill
                className="rounded-sm object-contain shadow-sm"
                sizes="20px"
                priority
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
