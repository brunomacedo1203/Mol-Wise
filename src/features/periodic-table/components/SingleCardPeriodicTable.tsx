import type { CSSProperties } from "react";

interface SingleCardPeriodicTableProps {
  atomicNumber: number;
  symbol: string;
  name: string;
  molarMass: number;
  showColummNumber?: number;
  highlightClass?: string;
  customStyle?: CSSProperties;
  usePropertyStyling?: boolean;
}

export default function SingleCardPeriodicTable({
  atomicNumber,
  symbol,
  name,
  molarMass,
  showColummNumber,
  highlightClass = "",
  customStyle,
  usePropertyStyling = false,
}: SingleCardPeriodicTableProps) {
  const columnNumberClass = showColummNumber
    ? "before:content-[attr(data-columm-number)] before:absolute before:top-[-35px] before:w-full before:text-center before:text-cyan-600"
    : "";

  const defaultBackgroundClass = "bg-gray-100 dark:bg-neutral-800/90";
  const backgroundClass = usePropertyStyling
    ? "property-card"
    : highlightClass && highlightClass.length > 0
    ? highlightClass
    : defaultBackgroundClass;

  return (
    <div
      data-columm-number={showColummNumber}
      style={customStyle}
      className={`${columnNumberClass} relative w-[80px] h-[80px] border-2 border-black
        ${backgroundClass} dark:border-white/35
        flex flex-col items-center justify-center text-center overflow-hidden text-xs`}
    >
      <span className="absolute top-0.5 left-1 text-black dark:text-white text-xs font-bold">
        {atomicNumber}
      </span>
      <div className="flex flex-col items-center justify-center h-full px-1 mt-1">
        <span className="text-2xl font-bold text-black dark:text-white">
          {symbol}
        </span>
        <span
          className="text-[12px] text-zinc-800 dark:text-zinc-200 truncate w-full leading-tight"
          title={name}
        >
          {name}
        </span>
        <span className="font-bold text-[10px] text-black dark:text-white mt-1">
          {molarMass?.toFixed(2)}
        </span>
      </div>
    </div>
  );
}
