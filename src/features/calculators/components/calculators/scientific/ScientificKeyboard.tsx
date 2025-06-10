import { ScientificKeyboardProps } from "@/features/calculators/domain/types/keyboard";
import Keyboard from "@/shared/components/Keyboard";
import { Button } from "@/shared/components/ui/button";
import KeyboardBtn from "@/shared/components/KeyboardBtn";
import { ReloadIcon } from "@/shared/components/icons/ReloadIcon";
import { BackspaceIcon } from "@/shared/components/icons/BackspaceIcon";
import { useTranslations } from "next-intl";

export default function ScientificKeyboard({
  onKeyPress,
  onFunction,
  onMemory,
  onCalculate,
  onBackspace,
  onReset,
}: ScientificKeyboardProps) {
  const scientificFunctions = [
    { label: "sin", value: "sin" },
    { label: "cos", value: "cos" },
    { label: "tan", value: "tan" },
    { label: "log", value: "log" },
    { label: "ln", value: "ln" },
    { label: "√", value: "sqrt" },
    { label: "π", value: "pi" },
    { label: "e", value: "e" },
  ];

  const memoryButtons = [
    { label: "MC", value: "clear" as const },
    { label: "MR", value: "recall" as const },
    { label: "M+", value: "store" as const },
  ];

  const t = useTranslations("calculators.scientific");

  return (
    <div className="flex flex-col items-center w-full gap-2 py-2 rounded-xl shadow">
      {/* Teclado numérico padrão */}
      <div className="w-full flex justify-center">
        <Keyboard onKeyPress={onKeyPress} />
      </div>

      {/* Funções científicas */}
      <div className="w-full grid grid-cols-4 gap-2 px-4">
        {scientificFunctions.map((func) => (
          <Button
            key={func.value}
            variant="outline"
            className="h-10"
            onClick={() => onFunction(func.value)}
          >
            {func.label}
          </Button>
        ))}
      </div>

      {/* Botões de memória */}
      <div className="w-full grid grid-cols-3 gap-2 px-4">
        {memoryButtons.map((btn) => (
          <Button
            key={btn.value}
            variant="outline"
            className="h-10"
            onClick={() => onMemory(btn.value)}
          >
            {btn.label}
          </Button>
        ))}
      </div>

      {/* Botões de operação - padronizado com a calculadora de massa molar */}
      <div className="flex gap-2 mt-1 items-center justify-center w-full">
        <KeyboardBtn onClick={onReset} className="bg-white w-10 h-10">
          <ReloadIcon size={24} />
        </KeyboardBtn>
        <KeyboardBtn
          onClick={() => onFunction && onFunction("(")}
          className="bg-white w-10 h-10"
        >
          (
        </KeyboardBtn>
        <KeyboardBtn
          onClick={onCalculate}
          noDefaultHover
          className="!bg-teal-400 hover:!bg-teal-600 dark:bg-teal-500 dark:hover:bg-teal-700 text-black font-semibold text-xl w-34 h-10 px-6"
        >
          {t("keyboard.calculate")}
        </KeyboardBtn>
        <KeyboardBtn
          onClick={() => onFunction && onFunction(")")}
          className="bg-white w-10 h-10"
        >
          )
        </KeyboardBtn>
        <KeyboardBtn onClick={onBackspace} className="bg-white w-10 h-10">
          <BackspaceIcon size={24} />
        </KeyboardBtn>
      </div>
    </div>
  );
}
