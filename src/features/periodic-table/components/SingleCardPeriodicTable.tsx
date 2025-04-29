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
    ? "before:content-[attr(data-columm-number)] before:absolute before:top-[-35px] before:w-full before:text-center before:text-cyan-600 hidden xl:block"
    : "";

  // Determina o tamanho da fonte baseado no comprimento do nome
  const getNameFontSize = (name: string) => {
    if (name.length > 12) return "text-[0.5rem]";
    if (name.length > 8) return "text-[0.6rem]";
    return "text-[0.65rem]";
  };

  return (
    <div
      data-columm-number={showColummNumber}
      className={`${columnNumberClass} relative w-18 h-18 border-2 border-black items-center justify-center bg-gray-100`}
    >
      <span className="absolute top-0.5 left-1 text-black text-xs font-bold hidden lg:block">
        {atomicNumber}
      </span>
      <div className="flex flex-col items-center p-2.5">
        <span className="text-2xl font-bold text-black">{symbol}</span>
        <span
          className={`hidden xl:inline ${getNameFontSize(
            name
          )} text-zinc-800 text-center w-full leading-tight`}
        >
          {name}
        </span>
        <span className="hidden xl:inline text-xs text-black">
          {molarMass?.toFixed(2)}
        </span>
      </div>
    </div>
  );
}
