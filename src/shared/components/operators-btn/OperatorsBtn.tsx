import KeyboardBtn from "@/shared/components/KeyboardBtn";
import { IconRefresh, IconBackspace } from "@tabler/icons-react";

export default function OperatorsBtn({
  onReset,
  onParenthesis,
  onCalculate,
  onBackspace,
}: {
  onReset?: () => void;
  onParenthesis?: (paren: string) => void;
  onCalculate?: () => void;
  onBackspace?: () => void;
}) {
  return (
    <div className="flex gap-1 mt-1 items-center justify-center w-full">
      <KeyboardBtn onClick={onReset} className="bg-white">
        <IconRefresh size={20} />
      </KeyboardBtn>
      <KeyboardBtn onClick={() => onParenthesis?.("(")} className="bg-white">
        {" "}
        ({" "}
      </KeyboardBtn>
      <KeyboardBtn
        onClick={onCalculate}
        className="bg-green-400 hover:bg-green-600 text-black w-33 h-8 text-2sm font-bold shadow-2xl border-black border-2 mx-2"
      >
        CALCULATE
      </KeyboardBtn>
      <KeyboardBtn onClick={() => onParenthesis?.(")")} className="bg-white">
        {" "}
        ){" "}
      </KeyboardBtn>
      <KeyboardBtn onClick={onBackspace} className="bg-white">
        <IconBackspace size={20} />
      </KeyboardBtn>
    </div>
  );
}
