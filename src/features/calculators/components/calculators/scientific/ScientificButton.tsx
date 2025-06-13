import KeyboardBtn from "@/shared/components/keyboard/KeyboardBtn";
import { ScientificButtonConfig } from "@/features/calculators/domain/types/scientific-constants";
import { cn } from "@/lib/utils";

interface ScientificButtonProps {
  button: ScientificButtonConfig;
  onClick: (value: string) => void;
  className?: string;
}

export function ScientificButton({
  button,
  onClick,
  className,
}: ScientificButtonProps) {
  return (
    <KeyboardBtn
      onClick={() => onClick(button.value)}
      className={cn("text-lg font-medium", className)}
    >
      {button.label}
    </KeyboardBtn>
  );
}
