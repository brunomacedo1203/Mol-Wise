import * as React from "react";
import { CheckIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { ChevronDown, XCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { CATEGORY_TAGS } from "../../domain/categoryTags";
import type { CompoundCategory } from "@/features/catalog/domain/types/ChemicalCompound";

interface CategoryDropdownProps {
  selectedCategories: CompoundCategory[];
  setSelectedCategories: (cats: CompoundCategory[]) => void;
  t: (key: string) => string;
}

export function CategoryDropdown({
  selectedCategories,
  setSelectedCategories,
  t,
}: CategoryDropdownProps) {
  const [isPopoverOpen, setIsPopoverOpen] = React.useState(false);

  const handleTogglePopover = () => {
    setIsPopoverOpen((prev) => !prev);
  };

  const toggleCategory = (category: CompoundCategory) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(
        selectedCategories.filter((cat) => cat !== category)
      );
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  const handleClear = () => {
    setSelectedCategories([]);
  };

  const toggleAll = () => {
    if (selectedCategories.length === CATEGORY_TAGS.length) {
      handleClear();
    } else {
      const allCategories = CATEGORY_TAGS.map(
        (tag) => tag.id as CompoundCategory
      );
      setSelectedCategories(allCategories);
    }
  };

  return (
    <div className="space-y-2">
      <label className="text-sm font-semibold text-gray-900 dark:text-zinc-200">
        {t("catalog.categoryTags.placeholder")}
      </label>
      <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            onClick={handleTogglePopover}
            className={`
              flex w-full p-1 rounded-md border min-h-10 h-auto items-center justify-between
              bg-white dark:bg-zinc-900
              border-2 border-border dark:border-zinc-400
              text-gray-700 dark:text-zinc-200
              hover:bg-gray-50 dark:hover:bg-zinc-800
              transition
            `}
          >
            {selectedCategories.length > 0 ? (
              <div className="flex justify-between items-center w-full">
                <div className="flex flex-wrap items-center">
                  {selectedCategories.slice(0, 3).map((category) => (
                    <Badge
                      key={category}
                      className="m-1 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 border-foreground/10 text-foreground bg-card hover:bg-card/80"
                    >
                      {t(`catalog.categoryTags.${category}`)}
                      <XCircle
                        className="ml-2 h-4 w-4 cursor-pointer"
                        onClick={(event) => {
                          event.stopPropagation();
                          toggleCategory(category);
                        }}
                      />
                    </Badge>
                  ))}
                  {selectedCategories.length > 3 && (
                    <Badge className="m-1 bg-transparent text-foreground border-foreground/1 hover:bg-transparent">
                      {`+ ${selectedCategories.length - 3} more`}
                      <XCircle
                        className="ml-2 h-4 w-4 cursor-pointer"
                        onClick={(event) => {
                          event.stopPropagation();
                          handleClear();
                        }}
                      />
                    </Badge>
                  )}
                </div>
                <div className="flex items-center justify-between">
                  <ChevronDown className="h-4 mx-2 cursor-pointer text-muted-foreground" />
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-end w-full">
                <ChevronDown className="h-4 cursor-pointer text-muted-foreground mr-2" />
              </div>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-[300px] p-0"
          side="bottom"
          align="start"
          alignOffset={-150}
        >
          <Command>
            <CommandInput placeholder="Search..." />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup>
                <CommandItem
                  key="all"
                  onSelect={toggleAll}
                  className="cursor-pointer"
                >
                  <div
                    className={cn(
                      "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                      selectedCategories.length === CATEGORY_TAGS.length
                        ? "bg-primary text-primary-foreground"
                        : "opacity-50 [&_svg]:invisible"
                    )}
                  >
                    <CheckIcon className="h-4 w-4" />
                  </div>
                  <span>(Select All)</span>
                </CommandItem>
                {CATEGORY_TAGS.map((tag) => {
                  const isSelected = selectedCategories.includes(
                    tag.id as CompoundCategory
                  );
                  return (
                    <CommandItem
                      key={tag.id}
                      onSelect={() =>
                        toggleCategory(tag.id as CompoundCategory)
                      }
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
                      <span>{t(`catalog.categoryTags.${tag.id}`)}</span>
                    </CommandItem>
                  );
                })}
              </CommandGroup>
              <CommandSeparator />
              <CommandGroup>
                <div className="flex items-center justify-between">
                  {selectedCategories.length > 0 && (
                    <>
                      <CommandItem
                        onSelect={handleClear}
                        className="flex-1 justify-center cursor-pointer"
                      >
                        Clear
                      </CommandItem>
                      <div className="w-px h-6 bg-border" />
                    </>
                  )}
                  <CommandItem
                    onSelect={() => setIsPopoverOpen(false)}
                    className="flex-1 justify-center cursor-pointer max-w-full"
                  >
                    Close
                  </CommandItem>
                </div>
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
