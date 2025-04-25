"use client";
import { useMolarMassCalculator } from "@/features/calculators/hooks/useMolarMassCalculator";
import MolecularFormulaInput from "@/features/calculators/components/MolecularFormulaInput";
import Button from "@/shared/components/Button";
import CalculatorContainer from "./CalculatorContainer";

export default function MolarMassCalculator() {
  const {
    formula,
    handleFormulaChange,
    molarMass,
    errorMessage,
    calculate,
  } = useMolarMassCalculator();

  return (
    <CalculatorContainer
      title="Molar Mass Calculator"
      subtitle="Enter a chemical formula or element symbol"
      input={
        <MolecularFormulaInput
          value={formula}
          onChange={handleFormulaChange}
          onEnterPress={calculate}
        />
      }
      actions={
        <div className="flex justify-center items-center mt-2">
          <Button onClick={calculate}>Calculate</Button>
        </div>
      }
      >
        <div className="flex justify-center items-center text-zinc-800 text-center text-xl">
          {molarMass && <div dangerouslySetInnerHTML={{ __html: molarMass }} />}
        </div>
        <div className="flex justify-center items-center text-zinc-800 text-center text-sm">
          {errorMessage && <div className="error-message">{errorMessage}</div>}
        </div>
      </CalculatorContainer>
    
  );
}
