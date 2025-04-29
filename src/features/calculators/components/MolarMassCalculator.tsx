"use client";
import { useMolarMassCalculator } from "@/features/calculators/hooks/useMolarMassCalculator";
import MolecularFormulaInput from "@/features/calculators/components/MolecularFormulaInput";
import CalculatorContainer from "./CalculatorContainer";
import KeyboardCalculate from "@/features/calculators/components/KeyboardCalculate";

export default function MolarMassCalculator() {
  const {
    formula,
    handleFormulaChange,
    molarMass,
    errorMessage,
    calculate,
  } = useMolarMassCalculator();

  const resetFormula = () => handleFormulaChange("");
  const backspace = () => handleFormulaChange(formula.slice(0, -1));

  function handleKeyPress(key: string) {
    if (key === "⌫") backspace();
    else if (key === "⇧") {/* implementar caps lock se quiser */}
    else handleFormulaChange(formula + key);
  }

  function handleFormulaBtn(value: string) {
    handleFormulaChange(value);
  }

  function handleParenthesis(paren: string) {
    handleFormulaChange(formula + paren);
  }

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
        <KeyboardCalculate
          onKeyPress={handleKeyPress}
          onFormulaClick={handleFormulaBtn}
          onReset={resetFormula}
          onParenthesis={handleParenthesis}
          onCalculate={calculate}
          onBackspace={backspace}
        />
      }
    />
  );
}