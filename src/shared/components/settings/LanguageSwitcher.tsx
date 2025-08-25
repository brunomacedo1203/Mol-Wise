"use client";

import { useParams, usePathname, useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { Languages } from "lucide-react";
import { cn } from "@/lib/utils";

const LOCALES = [
  { code: "pt", label: "Português", emoji: "🇧🇷" },
  { code: "en", label: "English", emoji: "🇺🇸" },
  { code: "fr", label: "Français", emoji: "🇫🇷" },
  { code: "de", label: "Deutsch", emoji: "🇩🇪" },
  { code: "es", label: "Español", emoji: "🇪🇸" },
  { code: "ar", label: "العربية", emoji: "🇸🇦" },
  { code: "hi", label: "हिन्दी", emoji: "🇮🇳" },
  { code: "ru", label: "Русский", emoji: "🇷🇺" },
  { code: "zh", label: "中文", emoji: "🇨🇳" },
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
      <Languages className="w-5 h-5 text-zinc-700 dark:text-zinc-300" />
      <Select value={currentLocale} onValueChange={handleChange}>
        <SelectTrigger className="w-[180px] h-9 border border-zinc-300 dark:border-zinc-600">
          <span className="flex items-center gap-2">
            <span>{current.emoji}</span>
            <span>{current.label}</span>
          </span>
        </SelectTrigger>
        <SelectContent align="end">
          {LOCALES.map(({ code, label, emoji }) => (
            <SelectItem key={code} value={code}>
              <span className="flex items-center gap-2">
                <span aria-hidden>{emoji}</span>
                <span>{label}</span>
              </span>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
