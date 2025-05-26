"use client";

import { useRouter, useParams, usePathname } from "next/navigation";
import { Languages } from "lucide-react";

export default function LanguageSwitcher() {
  const router = useRouter();
  const params = useParams();
  const pathname = usePathname();
  const currentLocale = params.locale as string;

  const toggleLanguage = () => {
    const newLocale = currentLocale === "pt" ? "en" : "pt";
    // Manter a rota atual, apenas trocando o locale
    const newPath = pathname.replace(`/${currentLocale}`, `/${newLocale}`);
    router.push(newPath);
  };

  return (
    <button
      onClick={toggleLanguage}
      className="p-2 rounded-lg bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors"
      aria-label={`Mudar para ${
        currentLocale === "pt" ? "English" : "Português"
      }`}
      title={`Mudar para ${currentLocale === "pt" ? "English" : "Português"}`}
    >
      <div className="flex items-center gap-1">
        <Languages size={20} />
        <span className="text-sm font-medium">
          {currentLocale.toUpperCase()}
        </span>
      </div>
    </button>
  );
}
