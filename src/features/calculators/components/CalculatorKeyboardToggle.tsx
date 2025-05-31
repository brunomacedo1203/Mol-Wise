import {
  IconKeyboard,
  IconChevronDown,
  IconChevronUp,
} from "@tabler/icons-react";
import { CalculatorKeyboardToggleProps } from "../domain/types/calculator";

const toggleStyles = {
  button:
    "text-base text-zinc-500 dark:text-zinc-300 hover:text-zinc-800 dark:hover:text-white flex items-center gap-1",
  container: "w-full flex justify-center mt-2",
};

export function CalculatorKeyboardToggle({
  isCollapsed,
  onToggle,
  translations,
}: CalculatorKeyboardToggleProps) {
  return (
    <div className={toggleStyles.container}>
      <button className={toggleStyles.button} onClick={onToggle} type="button">
        <IconKeyboard size={20} />
        <span>
          {isCollapsed ? translations.showKeyboard : translations.hideKeyboard}
        </span>
        {isCollapsed ? (
          <IconChevronDown size={20} />
        ) : (
          <IconChevronUp size={20} />
        )}
      </button>
    </div>
  );
}
