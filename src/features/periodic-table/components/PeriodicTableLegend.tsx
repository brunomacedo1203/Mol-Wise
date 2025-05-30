import { useTranslations } from "next-intl";

export default function PeriodicTableLegend() {
  const t = useTranslations("periodicTable.element");
  return (
    <div className="bg-gray-100 border-2 border-black flex flex-col justify-center h-full w-full dark:bg-gray-800 dark:border-white">
      <div className="flex flex-col items-center text-black text-sm dark:text-white">
        <span className="font-normal">{t("atomicNumber").toUpperCase()}</span>
        <span className="text-2xl my-2">{t("symbol").toUpperCase()}</span>
        <span className="font-normal">{t("name").toUpperCase()}</span>
        <span className="font-normal">{t("atomicMass").toUpperCase()}</span>
      </div>
    </div>
  );
}
