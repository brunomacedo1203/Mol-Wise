import { ScientificButton } from "./scientific-button";
import { SCIENTIFIC_BUTTONS } from "./scientific-constants";

interface ScientificKeypadProps {
  onButtonClick: (operation: string) => void;
  className?: string;
}

export function ScientificKeypad({
  onButtonClick,
  className,
}: ScientificKeypadProps) {
  const buttonsByCategory = SCIENTIFIC_BUTTONS.reduce((acc, button) => {
    if (!acc[button.category]) {
      acc[button.category] = [];
    }
    acc[button.category].push(button);
    return acc;
  }, {} as Record<string, typeof SCIENTIFIC_BUTTONS>);

  return (
    <div className={className}>
      <div className="grid grid-cols-4 gap-2">
        {Object.entries(buttonsByCategory).map(([category, buttons]) => (
          <div
            key={category}
            className="col-span-4 grid grid-cols-4 gap-2 mb-2"
          >
            {buttons.map((button) => (
              <ScientificButton
                key={button.id}
                button={button}
                onClick={onButtonClick}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
