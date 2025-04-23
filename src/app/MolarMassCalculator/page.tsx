"use client";
import { useMolarMassCalculator } from "@/features/calculators/hooks/useMolarMassCalculator";
import MolecularFormulaInput from "@/features/calculators/components/MolecularFormulaInput";

export default function MolarMassCalculatorPage() {
  const {
    formula,
    handleFormulaChange,
    molarMass,
    errorMessage,
    calculate,
  } = useMolarMassCalculator();

  return (
    <>
      <div className="flex flex-col gap-5 p-4 max-w-lg w-full">
        <h1 className="text-xl text-zinc-800">
          Molar Mass Calculator
        </h1>
        <span className="text-zinc-800">
          Enter a Chemical Formula or Element Symbol
        </span>
        <MolecularFormulaInput
          value={formula}
          onChange={handleFormulaChange}
          onEnterPress={calculate}
        />
        <div className="flex justify-center items-center">
          <button
            className="btn-calculate w-40 h-12 text-zinc-800"
            onClick={calculate}
          >
            <span className="text-2xl text-center">Calculate</span>
          </button>
        </div>
        <span className="flex justify-center items-center text-zinc-800 text-center text-2xl">
          {molarMass && <div dangerouslySetInnerHTML={{ __html: molarMass }} />}
        </span>
        <span className="flex justify-center items-center text-zinc-800 text-center text-2xl">
          {errorMessage && <div className="error-message">{errorMessage}</div>}
        </span>
      </div>
    </>
  );
}
