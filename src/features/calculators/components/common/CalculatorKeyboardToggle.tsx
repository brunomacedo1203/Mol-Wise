import { IconChevronDown, IconChevronUp } from "@tabler/icons-react";
import { containerStyles } from "../../styles/containerStyles";

interface CalculatorKeyboardToggleProps {
  isCollapsed: boolean;
  onToggle: () => void;
  showKeyboardText: string;
  hideKeyboardText: string;
}

export function CalculatorKeyboardToggle({
  isCollapsed,
  onToggle,
  showKeyboardText,
  hideKeyboardText,
}: CalculatorKeyboardToggleProps) {
  return (
    <div className={containerStyles.keyboardToggle.container}>
      <button
        className={containerStyles.keyboardToggle.button}
        onClick={onToggle}
        type="button"
      >
        <span>{isCollapsed ? showKeyboardText : hideKeyboardText}</span>
        {isCollapsed ? (
          <IconChevronDown size={20} />
        ) : (
          <IconChevronUp size={20} />
        )}
      </button>
    </div>
  );
}
