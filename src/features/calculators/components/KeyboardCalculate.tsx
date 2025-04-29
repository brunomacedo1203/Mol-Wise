import Keyboard from "@/shared/components/keyboard/Keyboard";
import FormulasBtn from "@/shared/components/formulas-btn/FormulasBtn";
import OperatorsBtn from "@/shared/components/operators-btn/OperatorsBtn";

interface KeyboardCalculateProps {
  onKeyPress: (key: string) => void;
  onFormulaClick: (value: string) => void;
  onReset: () => void;
  onParenthesis: (paren: string) => void;
  onCalculate: () => void;
  onBackspace: () => void;
}

export default function KeyboardCalculate({
  onKeyPress,
  onFormulaClick,
  onReset,
  onParenthesis,
  onCalculate,
  onBackspace,
}: KeyboardCalculateProps) {
  return (
    <div className="flex flex-col items-center w-full gap-0 py-2  rounded-xl shadow">
      <div className="w-full flex justify-center">
        <Keyboard onKeyPress={onKeyPress} />
      </div>
      <div className="w-full flex justify-center">
        <FormulasBtn onFormulaClick={onFormulaClick} />
      </div>
      <div className="w-full flex justify-center">
        <OperatorsBtn
          onReset={onReset}
          onParenthesis={onParenthesis}
          onCalculate={onCalculate}
          onBackspace={onBackspace}
        />
      </div>
    </div>
  );
}
