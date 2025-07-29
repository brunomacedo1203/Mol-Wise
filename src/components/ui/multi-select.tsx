"use client";

import * as React from "react";
import { WandSparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useMultiSelectLogic } from "@/features/catalog/hooks/common/useMultiSelectLogic";
import { MultiSelectTrigger } from "@/features/catalog/components/common/MultiSelectTrigger";
import { MultiSelectContent } from "@/features/catalog/components/common/MultiSelectContent";
interface MultiSelectProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  id: string;
  options: {
    label: string;
    value: string;
    icon?: React.ComponentType<{ className?: string }>;
  }[];
  onValueChange: (value: string[]) => void;
  defaultValue?: string[];
  placeholder?: string;
  animation?: number;
  maxCount?: number;
  modalPopover?: boolean;
  className?: string;
  variant?: "default" | "secondary" | "destructive" | "inverted";
}

export const MultiSelect = React.forwardRef<
  HTMLButtonElement,
  MultiSelectProps
>(
  (
    {
      id,
      options,
      onValueChange,
      variant,
      defaultValue = [],
      placeholder,

      animation = 0,
      maxCount = 3,
      modalPopover = false,
      className,
      ...props
    },
    ref
  ) => {
    const {
      isPopoverOpen,
      currentSelectedValues,
      handleInputKeyDown,
      toggleOption,
      handleClear,
      handleTogglePopover,
      clearExtraOptions,
      toggleAll,
      setPopoverOpen,
    } = useMultiSelectLogic({
      id,
      options,
      defaultValue,
      onValueChange,
      maxCount,
    });

    // Sincronizar com defaultValue quando mudar
    React.useEffect(() => {
      if (defaultValue.length > 0) {
        // A sincronização é feita dentro do hook useMultiSelectLogic
      }
    }, [defaultValue, id]);

    return (
      <Popover
        open={isPopoverOpen}
        onOpenChange={setPopoverOpen}
        modal={modalPopover}
      >
        <PopoverTrigger asChild>
          <MultiSelectTrigger
            ref={ref}
            {...props}
            options={options}
            selectedValues={currentSelectedValues}
            placeholder={placeholder}
            maxCount={maxCount}
            animation={animation}
            variant={variant}
            className={className}
            onTogglePopover={handleTogglePopover}
            onToggleOption={toggleOption}
            onClear={handleClear}
            onClearExtra={clearExtraOptions}
          />
        </PopoverTrigger>
        <PopoverContent className="w-[300px] p-0" side="bottom" align="start">
          <MultiSelectContent
            options={options}
            selectedValues={currentSelectedValues}
            onInputKeyDown={handleInputKeyDown}
            onToggleOption={toggleOption}
            onToggleAll={toggleAll}
            onClear={handleClear}
            onClose={() => setPopoverOpen(false)}
          />
        </PopoverContent>
        {animation > 0 && currentSelectedValues.length > 0 && (
          <WandSparkles
            className={cn(
              "cursor-pointer my-2 text-foreground bg-background w-3 h-3",
              "text-muted-foreground"
            )}
            onClick={() => {
              // Toggle animation state if needed
            }}
          />
        )}
      </Popover>
    );
  }
);

MultiSelect.displayName = "MultiSelect";
