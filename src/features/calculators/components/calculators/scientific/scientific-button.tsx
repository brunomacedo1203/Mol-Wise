import { Button } from "@/components/ui/button";
import { ScientificButton as ScientificButtonType } from "./scientific-constants";
import { cn } from "@/lib/utils";

interface ScientificButtonProps {
  button: ScientificButtonType;
  onClick: (operation: string) => void;
  className?: string;
}

export function ScientificButton({
  button,
  onClick,
  className,
}: ScientificButtonProps) {
  const getButtonStyle = () => {
    switch (button.category) {
      case "trigonometric":
        return "bg-blue-500 hover:bg-blue-600 text-white";
      case "logarithmic":
        return "bg-green-500 hover:bg-green-600 text-white";
      case "exponential":
        return "bg-purple-500 hover:bg-purple-600 text-white";
      case "other":
        return "bg-gray-500 hover:bg-gray-600 text-white";
      default:
        return "bg-gray-500 hover:bg-gray-600 text-white";
    }
  };

  return (
    <Button
      variant="outline"
      className={cn(
        "w-full h-12 text-lg font-medium transition-colors",
        getButtonStyle(),
        className
      )}
      onClick={() => onClick(button.operation)}
    >
      {button.label}
    </Button>
  );
}
