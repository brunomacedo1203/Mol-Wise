import SingleCardPeriodicTable from "./SingleCardPeriodicTable";
import elementsData from "../services/elementsData";

export default function PeriodicTableCards() {
  return (
    <div className="grid grid-cols-18 grid-rows-[repeat(10,_minmax(50px,_1fr))] gap-1 p-5">
      {elementsData.map((e) => (
        <div
          key={e.atomicNumber}
          style={{
            gridColumn: e.column,
            gridRow: e.row,
          }}
        >
          <SingleCardPeriodicTable
            atomicNumber={e.atomicNumber}
            symbol={e.symbol}
            name={e.name}
            molarMass={e.molarMass}
            showColummNumber={e.showColummNumber}
          />
        </div>
      ))}
    </div>
  );
}
