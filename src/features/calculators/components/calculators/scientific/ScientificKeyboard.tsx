import { ScientificKeyboardProps } from "@/features/calculators/domain/types/keyboard";
import Keyboard from "@/shared/components/Keyboard";
import { Button } from "@/shared/components/ui/button";

export default function ScientificKeyboard({
  onKeyPress,
  onFunction,
  onMemory,
  onCalculate,
  onBackspace,
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

      {/* Botões de operação */}
      <div className="w-full grid grid-cols-2 gap-2 px-4">
        <Button variant="outline" className="h-10" onClick={onBackspace}>
          ⌫
        </Button>
        <Button variant="default" className="h-10" onClick={onCalculate}>
          =
        </Button>
      </div>
    </div>
  );
}
