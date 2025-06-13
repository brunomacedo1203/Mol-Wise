import { X } from "lucide-react";
import { useTranslations } from "next-intl";

interface CloseAllButtonProps {
  count: number;
  onClick: () => void;
  className?: string;
}

export function CloseAllButton({
  count,
  onClick,
  className = "",
}: CloseAllButtonProps) {
  const t = useTranslations("common.actions");

  if (count <= 1) return null;

  return (
    <button
      className={`
        group
        flex items-center gap-2.5
        px-3 py-2
        rounded-full
        text-red-600 dark:text-red-400
        hover:bg-red-500 hover:text-white dark:hover:bg-red-600
        shadow-lg border border-zinc-300 dark:border-red-800
        transition-all duration-200
        focus:outline-none focus:ring-2 focus:ring-red-400
        transform hover:scale-105
        ${className}
      `}
      onClick={onClick}
      aria-label={t("closeAllWithCount", { count })}
      type="button"
    >
      <X size={14} strokeWidth={2.6} />
      <span className="text-sm font-medium">
        {t("closeAllWithCount", { count })}
      </span>
    </button>
  );
}
