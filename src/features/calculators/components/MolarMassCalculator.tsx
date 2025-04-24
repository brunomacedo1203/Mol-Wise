"use client";
import { useMolarMassCalculator } from "@/features/calculators/hooks/useMolarMassCalculator";
import MolecularFormulaInput from "@/features/calculators/components/MolecularFormulaInput";
import Button from "@/shared/components/Button";
import { Resizable } from "re-resizable";

export default function MolarMassCalculator() {
  const {
    formula,
    handleFormulaChange,
    molarMass,
    errorMessage,
    calculate,
  } = useMolarMassCalculator();

  return (
    <Resizable
      minWidth={250}
      minHeight={250}
      defaultSize={{ width: 400, height: 300 }}
    >
    <div className="flex flex-col gap-4 p-4 max-w-lg w-full border-2 border-zinc-300 rounded-2xl bg-white/80 backdrop-blur-sm shadow-[8px_12px_32px_4px_rgba(0,0,0,0.18)]">
      <div className="flex flex-col items-center mb-1">
        <h1 className="text-3xl font-semibold text-zinc-800 mb-1 text-center">Molar Mass Calculator</h1>
        <span className="text-xs text-zinc-600 text-center">Enter a chemical formula or element symbol</span>
      </div>
      <MolecularFormulaInput
        value={formula}
        onChange={handleFormulaChange}
        onEnterPress={calculate}
      />
      <div className="flex justify-center items-center mt-2">
        <Button onClick={calculate}>
          Calculate
        </Button>
      </div>
      <span className="flex justify-center items-center text-zinc-800 text-center text-xl">
        {molarMass && <div dangerouslySetInnerHTML={{ __html: molarMass }} />}
      </span>
      <span className="flex justify-center items-center text-zinc-800 text-center text-sm">
        {errorMessage && <div className="error-message">{errorMessage}</div>}
      </span>
    </div>
    </Resizable>
  );
}
