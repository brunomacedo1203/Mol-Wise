import { useTranslations } from "next-intl";

interface PeriodicTableLegendProps {
  type?: "categories" | "fields";
}

export function PeriodicTableLegend({
  type = "categories",
}: PeriodicTableLegendProps) {
  const t = useTranslations("periodicTable.element");

  if (type === "fields") {
    return (
      <div className="bg-gray-100 border-2 border-black flex flex-col justify-center h-full w-full dark:bg-neutral-800/90 dark:text-white">
        <div className="flex flex-col items-center text-black text-sm dark:text-white">
          <span className="font-normal">{t("atomicNumber").toUpperCase()}</span>
          <span className="text-2xl my-2">{t("symbol").toUpperCase()}</span>
          <span className="font-normal">{t("name").toUpperCase()}</span>
          <span className="font-normal">{t("molarMass").toUpperCase()}</span>
        </div>
      </div>
    );
  }

  // Default: categorias
  return (
    <div className="w-full p-4 bg-background border-t">
      <div className="flex items-center justify-center gap-6">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-metal rounded" />
          <span>Metal</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-nonmetal rounded" />
          <span>Não Metal</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-metalloid rounded" />
          <span>Semimetal</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-gas rounded" />
          <span>Gasoso</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-liquid rounded" />
          <span>Líquido</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-solid rounded" />
          <span>Sólido</span>
        </div>
      </div>
    </div>
  );
}
