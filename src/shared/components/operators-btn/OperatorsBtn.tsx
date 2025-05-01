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
      <KeyboardBtn
        onClick={onReset}
        className="bg-white shadow-[2px_2px_2px_rgba(0,0,0,0.25)]"
      >
        <IconRefresh size={20} />
      </KeyboardBtn>
      <KeyboardBtn
        onClick={() => onParenthesis?.("(")}
        className="bg-white shadow-[2px_2px_2px_rgba(0,0,0,0.25)]"
      >
        {" "}
        ({" "}
      </KeyboardBtn>
      <KeyboardBtn
        onClick={onCalculate}
        className="bg-gradient-to-br from-emerald-400 to-emerald-500 hover:from-emerald-500 hover:to-emerald-600 
        text-black border-none w-35 h-8 text-sm font-semibold tracking-wide mx-2
        shadow-[0_2px_4px_-1px_rgba(0,0,0,0.1),0_1px_0_0_rgba(25,28,33,0.02),0_0_0_1px_rgba(25,28,33,0.08)]
        hover:shadow-[0_4px_6px_-2px_rgba(0,0,0,0.05),0_2px_2px_-1px_rgba(25,28,33,0.05),0_0_0_1px_rgba(25,28,33,0.1)]"
      >
        CALCULATE
      </KeyboardBtn>
      <KeyboardBtn
        onClick={() => onParenthesis?.(")")}
        className="bg-white shadow-[2px_2px_2px_rgba(0,0,0,0.25)]"
      >
        {" "}
        ){" "}
      </KeyboardBtn>
      <KeyboardBtn
        onClick={onBackspace}
        className="bg-white shadow-[2px_2px_2px_rgba(0,0,0,0.25)]"
      >
        <IconBackspace size={20} />
      </KeyboardBtn>
    </div>
  );
}
