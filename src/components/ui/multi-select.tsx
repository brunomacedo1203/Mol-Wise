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
import type { CustomMultiSelectConfig } from "@/shared/store/multiSelectGlobalStore";

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
  value?: string[];
  placeholder?: string;
  animation?: number;
  maxCount?: number;
  modalPopover?: boolean;
  className?: string;
  variant?: "default" | "secondary" | "destructive" | "inverted";
  componentId?: string;
  customConfig?: CustomMultiSelectConfig;
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
      defaultValue = [],
      value,
      placeholder,
      animation = 0,
      maxCount = 3,
      modalPopover = false,
      className,
      componentId,
      customConfig,
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
      defaultValue: value || defaultValue,
      onValueChange,
      maxCount: customConfig?.maxDisplayCount || maxCount,
    });

    // Sincronizar com value quando mudar (componente controlado)
    React.useEffect(() => {
      if (value !== undefined) {
        // A sincronização é feita dentro do hook useMultiSelectLogic
      }
    }, [value, id]);

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
            componentId={componentId}
            customConfig={customConfig}
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
