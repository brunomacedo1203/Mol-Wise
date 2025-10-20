import KeyboardBtn from "@/shared/components/keyboard/KeyboardBtn";
import { ScientificButtonConfig } from "@/features/calculators/domain/types/scientific-constants";
import { cn } from "@/lib/utils";

interface ScientificButtonProps {
  button: ScientificButtonConfig;
  onClick: (value: string) => void;
  className?: string;
  locale?: string;
}

export function ScientificButton({
  button,
  onClick,
  className,
  locale = "en",
}: ScientificButtonProps) {
  // Função para traduzir labels das funções trigonométricas
  const getLocalizedLabel = (label: string) => {
    if (locale === "pt") {
      // Traduções para português
      const translations: Record<string, string> = {
        sin: "sen",
        cos: "cos",
        tan: "tg",
        "sin⁻¹": "sen⁻¹",
        "cos⁻¹": "cos⁻¹",
        "tan⁻¹": "tg⁻¹",
      };
      return translations[label] || label;
    }
    return label;
  };

  return (
    <KeyboardBtn
      onClick={() => onClick(button.value)}
      className={cn(
        "text-sm sm:text-base font-semibold text-gray-900 dark:text-white",
        className
      )}
    >
      {getLocalizedLabel(button.label || "")}
    </KeyboardBtn>
  );
}
