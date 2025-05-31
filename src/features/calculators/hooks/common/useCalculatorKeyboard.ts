import { useState, useCallback } from "react";
import {
  UseCalculatorKeyboardProps,
  UseCalculatorKeyboardReturn,
} from "@/features/calculators/domain/types";

export function useCalculatorKeyboard({
  initialVisibility = true,
  onVisibilityChange,
}: UseCalculatorKeyboardProps): UseCalculatorKeyboardReturn {
  const [isCollapsed, setIsCollapsed] = useState(!initialVisibility);

  const handleKeyboardToggle = useCallback(() => {
    setIsCollapsed((prev) => {
      const newValue = !prev;
      onVisibilityChange?.(!newValue);
      return newValue;
    });
  }, [onVisibilityChange]);

  return {
    isCollapsed,
    handleKeyboardToggle,
  };
} 