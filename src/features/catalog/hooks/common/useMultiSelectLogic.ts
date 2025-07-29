import { useCallback } from "react";
import { useMultiSelectStore } from "../../store/multiSelectStore";

interface UseMultiSelectLogicProps {
  id: string;
  options: { label: string; value: string; icon?: React.ComponentType<{ className?: string }> }[];
  defaultValue: string[];
  onValueChange: (value: string[]) => void;
  maxCount: number;
}

export function useMultiSelectLogic({
  id,
  options,
  defaultValue,
  onValueChange,
  maxCount,
}: UseMultiSelectLogicProps) {
  const {
    openPopovers,
    selectedValues,
    setPopoverOpen,
    setSelectedValues,
    togglePopover,
    clearSelectedValues,
  } = useMultiSelectStore();

  const isPopoverOpen = openPopovers[id] || false;
  const currentSelectedValues = selectedValues[id] || defaultValue;

  const handleInputKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === "Enter") {
        setPopoverOpen(id, true);
      } else if (event.key === "Backspace" && !event.currentTarget.value) {
        const newSelectedValues = [...currentSelectedValues];
        newSelectedValues.pop();
        setSelectedValues(id, newSelectedValues);
        onValueChange(newSelectedValues);
      }
    },
    [currentSelectedValues, onValueChange, id, setPopoverOpen, setSelectedValues]
  );

  const toggleOption = useCallback((option: string) => {
    const newSelectedValues = currentSelectedValues.includes(option)
      ? currentSelectedValues.filter((value) => value !== option)
      : [...currentSelectedValues, option];
    setSelectedValues(id, newSelectedValues);
    onValueChange(newSelectedValues);
  }, [currentSelectedValues, onValueChange, id, setSelectedValues]);

  const handleClear = useCallback(() => {
    clearSelectedValues(id);
    onValueChange([]);
  }, [clearSelectedValues, id, onValueChange]);

  const handleTogglePopover = useCallback(() => {
    togglePopover(id);
  }, [togglePopover, id]);

  const clearExtraOptions = useCallback(() => {
    const newSelectedValues = currentSelectedValues.slice(0, maxCount);
    setSelectedValues(id, newSelectedValues);
    onValueChange(newSelectedValues);
  }, [currentSelectedValues, maxCount, onValueChange, id, setSelectedValues]);

  const toggleAll = useCallback(() => {
    if (currentSelectedValues.length === options.length) {
      handleClear();
    } else {
      const allValues = options.map((option) => option.value);
      setSelectedValues(id, allValues);
      onValueChange(allValues);
    }
  }, [currentSelectedValues.length, options, handleClear, onValueChange, id, setSelectedValues]);

  return {
    isPopoverOpen,
    currentSelectedValues,
    handleInputKeyDown,
    toggleOption,
    handleClear,
    handleTogglePopover,
    clearExtraOptions,
    toggleAll,
    setPopoverOpen: (open: boolean) => setPopoverOpen(id, open),
  };
} 