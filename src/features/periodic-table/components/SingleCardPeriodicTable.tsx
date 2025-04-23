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
  console.log(showColummNumber);

  const columnNumberClass = showColummNumber
    ? "before:top-[-35px] before:left-[15px] before:absolute before:text-cyan-600 before:content-[attr(data-columm-number)]"
    : "";

  return (
    <div
      data-columm-number={showColummNumber}
      className={`${columnNumberClass} relative w-18 h-18 border-2 border-black items-center justify-center bg-gray-100`}
    >
      <span className="absolute top-0.5 left-1 text-black text-xs font-bold ">
        {atomicNumber}
      </span>
      <div className=" flex flex-col items-center p-2">
        <span className="text-2xl font-bold text-black">{symbol}</span>
        <span className="hidden xl:inline text-xs text-zinc-800 text-center truncate">
          {name}
        </span>
        <span className="text-xs text-black">{molarMass?.toFixed(2)}</span>
      </div>
    </div>
  );
}
