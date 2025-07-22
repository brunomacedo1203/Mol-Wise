// src/components/ui/combobox.tsx
"use client";
import * as React from "react";
import { IconChevronDown } from "@tabler/icons-react";
import { Check, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "./button";
import { Command, CommandGroup, CommandItem } from "./command";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";

export type ComboboxOption = {
  value: string;
  label: string;
};

interface MultiSelectComboboxProps {
  options: ComboboxOption[];
  selected: string[];
  setSelected: (values: string[]) => void;
  placeholder?: string;
}

export function MultiSelectCombobox({
  options,
  selected,
  setSelected,
  placeholder = "Selecione",
}: MultiSelectComboboxProps) {
  const [open, setOpen] = React.useState(false);

  function removeChip(value: string, e: React.MouseEvent) {
    e.stopPropagation();
    setSelected(selected.filter((v) => v !== value));
  }

  function clearAll(e: React.MouseEvent) {
    e.stopPropagation();
    setSelected([]);
  }

  function toggleOption(value: string) {
    if (selected.includes(value)) {
      setSelected(selected.filter((v) => v !== value));
    } else {
      setSelected([...selected, value]);
    }
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn(
            "w-[325px] min-h-[44px] flex items-center px-3 py-2 border rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 justify-between",
            open && "ring-2 ring-blue-500"
          )}
          style={{
            height: "auto",
          }}
        >
          {/* Chips + scroll */}
          <div className="flex-1 min-w-0 flex flex-wrap items-center gap-2 max-h-[25px] overflow-y-auto custom-scrollbar">
            {selected.length === 0 && (
              <span className="text-zinc-500">{placeholder}</span>
            )}
            {selected.map((value) => {
              const option = options.find((o) => o.value === value);
              if (!option) return null;
              return (
                <span
                  key={option.value}
                  className="bg-blue-100 border border-blue-300 text-blue-700 rounded-xl px-2 flex items-center text-[0.95rem] font-medium"
                >
                  {option.label}
                  <button
                    type="button"
                    className="ml-1 rounded-full hover:bg-blue-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors duration-150"
                    onClick={(e) => removeChip(option.value, e)}
                    tabIndex={-1}
                  >
                    <X className="h-3.5 w-3.5 stroke-2" />
                  </button>
                </span>
              );
            })}
          </div>
          {/* Container dos ícones — agora mais colado e harmonioso */}
          <div className="flex items-center gap-1 ml-2">
            {selected.length > 0 && (
              <button
                type="button"
                onClick={clearAll}
                className="rounded-full hover:bg-zinc-100 p-1 transition-colors duration-150 group"
                tabIndex={-1}
                aria-label="Limpar todos"
              >
                <X className="h-4 w-4 text-zinc-500 group-hover:text-zinc-700 stroke-2" />
              </button>
            )}
            <button
              type="button"
              tabIndex={-1}
              className="p-1 flex items-center justify-center rounded-full hover:bg-zinc-100"
              aria-label="Abrir opções"
            >
              <IconChevronDown className="h-5 w-5 text-zinc-400" stroke={3} />
            </button>
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-[350px] p-0 z-[100]"
        side="bottom"
        align="start"
        style={{ position: "absolute" }}
      >
        <Command>
          <CommandGroup>
            {options.map((option) => (
              <CommandItem
                key={option.value}
                onSelect={() => toggleOption(option.value)}
                className="cursor-pointer"
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4 stroke-2",
                    selected.includes(option.value)
                      ? "opacity-100 text-blue-600"
                      : "opacity-0"
                  )}
                />
                {option.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
