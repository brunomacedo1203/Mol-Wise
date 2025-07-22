"use client";

import * as React from "react";
import { Check, ChevronsUpDown, X } from "lucide-react";
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
            // Remova min-h/max-h fixos! Só padding para vertical
            "w-[350px] flex items-start px-3 py-2 border rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500",
            open && "ring-2 ring-blue-500"
          )}
          style={{
            justifyContent: "space-between",
            alignItems: "flex-start",
            minHeight: 44, // só para garantir mínimo confortável
            height: "auto",
          }}
        >
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap gap-2 items-center">
              {selected.length === 0 && (
                <span className="text-zinc-500">{placeholder}</span>
              )}
              {selected.map((value) => {
                const option = options.find((o) => o.value === value);
                if (!option) return null;
                return (
                  <span
                    key={option.value}
                    className="bg-blue-100 border border-blue-300 text-blue-700 rounded-xl px-2 py-1 flex items-center gap-1 text-[0.95rem] font-medium"
                  >
                    {option.label}
                    <button
                      type="button"
                      className="ml-1 rounded-full hover:bg-blue-200 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      onClick={(e) => removeChip(option.value, e)}
                      tabIndex={-1}
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                );
              })}
            </div>
          </div>
          {/* Clear all + dropdown icon */}
          <div className="flex items-center ml-2">
            {selected.length > 0 && (
              <button
                type="button"
                onClick={clearAll}
                className="rounded-full hover:bg-blue-100 p-1 mr-1"
                tabIndex={-1}
                aria-label="Limpar todos"
              >
                <X className="h-4 w-4 text-zinc-400" />
              </button>
            )}
            <ChevronsUpDown className="h-4 w-4 text-zinc-400" />
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        sideOffset={4}
        className="w-[350px] min-w-[350px] max-w-[350px] p-0 z-[9999]"
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
                    "mr-2 h-4 w-4",
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
