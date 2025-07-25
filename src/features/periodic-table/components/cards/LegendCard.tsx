import { PeriodicTableLegend } from "../common/PeriodicTableLegend";

export default function LegendCard() {
  return (
    <div className="w-[160px] h-[160px] col-span-2 row-span-2 border-2 border-black bg-white flex flex-col justify-between dark:bg-gray-800 dark:border-white dark:bg-zinc-900">
      <PeriodicTableLegend type="fields" />
    </div>
  );
}
