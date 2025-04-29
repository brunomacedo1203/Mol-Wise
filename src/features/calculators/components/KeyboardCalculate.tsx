import Keyboard from "@/shared/components/keyboard/Keyboard";
import FormulasBtn from "@/shared/components/formulas-btn/FormulasBtn";
import OperatorsBtn from "@/shared/components/operators-btn/OperatorsBtn";

export default function KeyboardCalculate(props: any) {
  return (
    <div className="flex flex-col items-center w-full gap-0 py-2  rounded-xl shadow">
      <div className="w-full flex justify-center">
        <Keyboard {...props} />
      </div>
      <div className="w-full flex justify-center">
        <FormulasBtn {...props} />
      </div>
      <div className="w-full flex justify-center">
        <OperatorsBtn {...props} />
      </div>
    </div>
  );
}
