interface SingleCardPeriodicTableProps {
  atomicNumber: number;
  symbol: string;
  name: string;
  molarMass: number;
  showColummNumber?: number;
}

export default function SingleCardPeriodicTable({
  atomicNumber,
  symbol,
  name,
  molarMass,
  showColummNumber,
}: SingleCardPeriodicTableProps) {
  const columnNumberClass = showColummNumber
    ? "before:content-[attr(data-columm-number)] before:absolute before:top-[-35px] before:w-full before:text-center before:text-cyan-600"
    : "";

  return (
    <div
      data-columm-number={showColummNumber}
      className={`${columnNumberClass} relative w-[80px] h-[80px] border-2 border-black bg-gray-100 flex flex-col items-center justify-center text-center overflow-hidden text-xs`}
    >
      <span className="absolute top-0.5 left-1 text-black text-xs font-bold">
        {atomicNumber}
      </span>
      <div className="flex flex-col items-center justify-center h-full px-1 mt-1">
        <span className="text-2xl font-bold text-black">{symbol}</span>
        <span
          className="text-[12px] text-zinc-800 truncate w-full leading-tight"
          title={name}
        >
          {name}
        </span>
        <span className="font-bold text-[10px] text-black mt-1">
          {molarMass?.toFixed(2)}
        </span>
      </div>
    </div>
  );
}
