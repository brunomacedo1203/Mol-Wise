"use client";

import Image from "next/image";
import { useParams, usePathname, useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";

import { cn } from "@/lib/utils";

const LOCALES = [
  { code: "pt", label: "Português", flag: "/flags/br.png" },
  { code: "en", label: "English", flag: "/flags/us.png" },
  { code: "fr", label: "Français", flag: "/flags/fr.png" },
  { code: "de", label: "Deutsch", flag: "/flags/de.png" },
  { code: "es", label: "Español", flag: "/flags/es.png" },
  { code: "ar", label: "العربية", flag: "/flags/sa.png" },
  { code: "hi", label: "हिन्दी", flag: "/flags/in.png" },
  { code: "ru", label: "Русский", flag: "/flags/ru.png" },
  { code: "zh", label: "中文", flag: "/flags/cn.png" },
] as const;

interface LanguageSwitcherProps {
  className?: string;
}

export default function LanguageSwitcher({ className }: LanguageSwitcherProps) {
  const params = useParams();
  const router = useRouter();
  const pathname = usePathname();
  const currentLocale = params.locale as string;

  const handleChange = (nextLocale: string) => {
    if (!nextLocale || nextLocale === currentLocale) return;
    const newPath = pathname.replace(`/${currentLocale}`, `/${nextLocale}`);
    router.replace(newPath);
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
                alt={`Bandeira de ${current.label}`}
                fill
                className="rounded-sm object-contain shadow-sm"
                sizes="20px"
                priority
              />
            </div>
            <span className="leading-none">{current.label}</span>
          </div>
        </SelectTrigger>

        <SelectContent align="end">
          {LOCALES.map(({ code, label, flag }) => (
            <SelectItem key={code} value={code}>
              <span className="flex items-center gap-2">
                <Image
                  src={flag}
                  alt={`Bandeira de ${label}`}
                  width={20}
                  height={15}
                  className="rounded-sm shadow-sm"
                />
                <span>{label}</span>
              </span>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
