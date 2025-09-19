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
import { useGlobalMultiSelect } from "@/shared/hooks/useGlobalMultiSelect";
import { useTranslations } from "next-intl";

interface CategoryDropdownProps {
  selectedCategories: CompoundCategory[];
  setSelectedCategories: (cats: CompoundCategory[]) => void;
}

export function CategoryDropdown({
  selectedCategories,
  setSelectedCategories,
}: CategoryDropdownProps) {
  const t = useTranslations("catalog.categoryTags");
  const [isPopoverOpen, setIsPopoverOpen] = React.useState(false);
  const { config, variants, icons, animation } = useGlobalMultiSelect(
    "category-dropdown",
    {
      maxDisplayCount: 3,
      showCount: true,
      allowClear: true,
    }
  );

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
        {t("label")}
      </label>
      <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            onClick={handleTogglePopover}
            className={`
              flex w-full p-1 rounded-md border min-h-9 h-auto items-center justify-between
              bg-white dark:bg-zinc-900
              border-2 border-zinc-400 dark:border-zinc-400
              text-gray-700 dark:text-zinc-200
              hover:bg-gray-50 dark:hover:bg-zinc-800
              transition
            `}
          >
            {selectedCategories.length > 0 ? (
              <div className="flex justify-between items-center w-full">
                <div className="flex flex-wrap items-center">
                  {selectedCategories
                    .slice(0, config.maxDisplayCount || 3)
                    .map((category) => (
                      <Badge
                        key={category}
                        className={cn(
                          animation.bounce && "animate-bounce",
                          variants({
                            variant: config.variant,
                            size: config.size,
                          })
                        )}
                        style={{ animationDuration: `${animation.duration}s` }}
                      >
                        {t(category)}
                        <XCircle
                          className={cn(icons.remove.className)}
                          onClick={(event) => {
                            event.stopPropagation();
                            toggleCategory(category);
                          }}
                        />
                      </Badge>
                    ))}
                  {config.showCount &&
                    selectedCategories.length >
                      (config.maxDisplayCount || 3) && (
                      <Badge
                        className={cn(
                          "bg-transparent text-foreground border-foreground/1 hover:bg-transparent dark:text-zinc-300 dark:border-zinc-600/30",
                          animation.bounce && "animate-bounce",
                          variants({
                            variant: config.variant,
                            size: config.size,
                          })
                        )}
                      >
                        {t("more", {
                          count:
                            selectedCategories.length -
                            (config.maxDisplayCount || 3),
                        })}
                        <XCircle
                          className={cn(icons.remove.className)}
                          onClick={(event) => {
                            event.stopPropagation();
                            handleClear();
                          }}
                        />
                      </Badge>
                    )}
                </div>
                <div className="flex items-center justify-between">
                  {config.allowClear && (
                    <XCircle
                      className={cn(icons.clear.className)}
                      onClick={(event) => {
                        event.stopPropagation();
                        handleClear();
                      }}
                    />
                  )}
                  {config.allowClear && (
                    <div className="w-px h-6 bg-border mx-2" />
                  )}
                  <ChevronDown className={cn(icons.dropdown.className)} />
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-between w-full">
                <span className="text-gray-500 dark:text-zinc-400 text-sm">
                  {t("placeholder")}
                </span>
                <ChevronDown className={cn(icons.dropdown.className)} />
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
            <CommandInput placeholder={t("search")} />
            <CommandList>
              <CommandEmpty>{t("noResults")}</CommandEmpty>
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
                  <span>({t("selectAll")})</span>
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
                      <span>{t(tag.id)}</span>
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
                        {t("clear")}
                      </CommandItem>
                      <div className="w-px h-6 bg-border" />
                    </>
                  )}
                  <CommandItem
                    onSelect={() => setIsPopoverOpen(false)}
                    className="flex-1 justify-center cursor-pointer max-w-full"
                  >
                    {t("close")}
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
