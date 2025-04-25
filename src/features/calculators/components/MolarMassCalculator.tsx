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
          errorMessage={errorMessage}
          resultHtml={molarMass === null ? undefined : molarMass}
        />
      }
      actions={
        <div className="flex justify-center items-center mt-2">
          <Button onClick={calculate}>Calculate</Button>
        </div>
      }
      />
    
  );
}
