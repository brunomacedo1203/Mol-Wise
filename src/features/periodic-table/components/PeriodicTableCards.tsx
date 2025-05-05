import SingleCardPeriodicTable from "./SingleCardPeriodicTable";
import { generatePeriodicTableMatrix } from "@/features/periodic-table/utils/periodicTableMatrix";

export default function PeriodicTableCards() {
  const matrix = generatePeriodicTableMatrix();

  return (
    <div className="overflow-x-auto">
      <div className="flex min-w-[1440px] pb-5">
        {Array.from({ length: 18 }, (_, i) => (
          <div
            key={i}
            className="w-[80px] h-[30px] flex items-center justify-center text-cyan-600 text-2base "
          >
            {i + 1}
          </div>
        ))}
      </div>

      {/* Grid dos elementos */}
      <div className="grid grid-cols-[repeat(18,80px)] gap-0 min-w-[1440px]">
        {matrix.map((row, rowIndex) =>
          row.map((element, colIndex) =>
            element ? (
              <SingleCardPeriodicTable
                key={element.atomicNumber}
                atomicNumber={element.atomicNumber}
                symbol={element.symbol}
                name={element.name}
                molarMass={element.molarMass}
                showColummNumber={element.showColummNumber}
              />
            ) : (
              <div
                key={`empty-${rowIndex}-${colIndex}`}
                className="w-[80px] h-[80px]"
              />
            )
          )
        )}
      </div>
    </div>
  );
}
