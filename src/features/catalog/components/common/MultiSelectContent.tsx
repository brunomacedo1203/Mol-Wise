import * as React from "react";
import { CheckIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";

interface MultiSelectContentProps {
  options: {
    label: string;
    value: string;
    icon?: React.ComponentType<{ className?: string }>;
  }[];
  selectedValues: string[];
  onInputKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  onToggleOption: (option: string) => void;
  onToggleAll: () => void;
  onClear: () => void;
  onClose: () => void;
}

export function MultiSelectContent({
  options,
  selectedValues,
  onInputKeyDown,
  onToggleOption,
  onToggleAll,
  onClear,
  onClose,
}: MultiSelectContentProps) {
  return (
    <Command>
      <CommandInput placeholder="Search..." onKeyDown={onInputKeyDown} />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup>
          <CommandItem
            key="all"
            onSelect={onToggleAll}
            className="cursor-pointer"
          >
            <div
              className={cn(
                "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                selectedValues.length === options.length
                  ? "bg-primary text-primary-foreground"
                  : "opacity-50 [&_svg]:invisible"
              )}
            >
              <CheckIcon className="h-4 w-4" />
            </div>
            <span>(Select All)</span>
          </CommandItem>
          {options.map((option) => {
            const isSelected = selectedValues.includes(option.value);
            return (
              <CommandItem
                key={option.value}
                onSelect={() => onToggleOption(option.value)}
                className="cursor-pointer"
              >
                <div
                  className={cn(
                    "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                    isSelected
                      ? "bg-primary text-primary-foreground"
                      : "opacity-50 [&_svg]:invisible"
                  )}
                >
                  <CheckIcon className="h-4 w-4" />
                </div>
                {option.icon && (
                  <option.icon className="mr-2 h-4 w-4 text-muted-foreground" />
                )}
                <span>{option.label}</span>
              </CommandItem>
            );
          })}
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup>
          <div className="flex items-center justify-between">
            {selectedValues.length > 0 && (
              <>
                <CommandItem
                  onSelect={onClear}
                  className="flex-1 justify-center cursor-pointer"
                >
                  Clear
                </CommandItem>
                <div className="w-px h-6 bg-border" />
              </>
            )}
            <CommandItem
              onSelect={onClose}
              className="flex-1 justify-center cursor-pointer max-w-full"
            >
              Close
            </CommandItem>
          </div>
        </CommandGroup>
      </CommandList>
    </Command>
  );
}
