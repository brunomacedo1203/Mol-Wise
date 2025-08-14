import * as React from "react";
import { XCircle, ChevronDown, XIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useGlobalMultiSelect } from "@/shared/hooks/useGlobalMultiSelect";
import type { CustomMultiSelectConfig } from "@/shared/store/multiSelectGlobalStore";
import { useTranslations } from "next-intl";

interface MultiSelectTriggerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  options: {
    label: string;
    value: string;
    icon?: React.ComponentType<{ className?: string }>;
  }[];
  selectedValues: string[];
  placeholder?: string;
  componentId?: string;
  customConfig?: CustomMultiSelectConfig;
  onTogglePopover: () => void;
  onToggleOption: (option: string) => void;
  onClear: () => void;
  onClearExtra: () => void;
}

export const MultiSelectTrigger = React.forwardRef<
  HTMLButtonElement,
  MultiSelectTriggerProps
>(
  (
    {
      options,
      selectedValues,
      placeholder,
      componentId,
      customConfig,
      className,
      onTogglePopover,
      onToggleOption,
      onClear,
      onClearExtra,
      ...props
    },
    ref
  ) => {
    const {
      config,
      variants,
      icons,
      animation: globalAnimation,
    } = useGlobalMultiSelect(componentId, customConfig);

    const t = useTranslations();

    return (
      <Button
        ref={ref}
        {...props}
        onClick={onTogglePopover}
        className={cn(
          "flex min-w-[280px] w-full p-1 rounded-md border border-zinc-300 dark:border-zinc-500 min-h-10 h-auto items-center justify-between bg-white dark:bg-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-800 [&_svg]:pointer-events-auto",
          customConfig?.customStyles?.container,
          className
        )}
      >
        {selectedValues.length > 0 ? (
          <div className="flex justify-between items-center w-full">
            <div className="flex flex-wrap items-center">
              {selectedValues
                .slice(0, config.maxDisplayCount || 3)
                .map((value) => {
                  const option = options.find((o) => o.value === value);
                  const IconComponent = option?.icon;
                  return (
                    <Badge
                      key={value}
                      className={cn(
                        globalAnimation.bounce && "animate-bounce",
                        variants({
                          variant: config.variant,
                          size: config.size,
                        }),
                        customConfig?.customStyles?.badge
                      )}
                      style={{
                        animationDuration: `${globalAnimation.duration}s`,
                      }}
                    >
                      {IconComponent && (
                        <IconComponent className="h-4 w-4 mr-2" />
                      )}
                      {option?.label}
                      <XCircle
                        className={cn(
                          icons.remove.className,
                          customConfig?.customStyles?.icon
                        )}
                        onClick={(event) => {
                          event.stopPropagation();
                          onToggleOption(value);
                        }}
                      />
                    </Badge>
                  );
                })}
              {config.showCount &&
                selectedValues.length > (config.maxDisplayCount || 3) && (
                  <Badge
                    className={cn(
                      "bg-transparent text-foreground border-foreground/1 hover:bg-transparent dark:text-zinc-300 dark:border-zinc-600/30",
                      globalAnimation.bounce && "animate-bounce",
                      variants({ variant: config.variant, size: config.size }),
                      customConfig?.customStyles?.badge
                    )}
                    style={{
                      animationDuration: `${globalAnimation.duration}s`,
                    }}
                  >
                    {t("multiSelect.more", {
                      count:
                        selectedValues.length - (config.maxDisplayCount || 3),
                    })}
                    <XCircle
                      className={cn(
                        icons.remove.className,
                        customConfig?.customStyles?.icon
                      )}
                      onClick={(event) => {
                        event.stopPropagation();
                        onClearExtra();
                      }}
                    />
                  </Badge>
                )}
            </div>
            <div className="flex items-center justify-between">
              {config.allowClear && (
                <XIcon
                  className={cn(
                    icons.clear.className,
                    customConfig?.customStyles?.icon
                  )}
                  onClick={(event) => {
                    event.stopPropagation();
                    onClear();
                  }}
                />
              )}
              {config.allowClear && <div className="w-px h-6 bg-border mx-2" />}
              <ChevronDown
                className={cn(
                  icons.dropdown.className,
                  customConfig?.customStyles?.icon
                )}
              />
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-between w-full mx-auto">
            <span className="text-sm text-muted-foreground mx-3">
              {placeholder || t("multiSelect.placeholder")}
            </span>
            <ChevronDown
              className={cn(
                icons.dropdown.className,
                customConfig?.customStyles?.icon
              )}
            />
          </div>
        )}
      </Button>
    );
  }
);

MultiSelectTrigger.displayName = "MultiSelectTrigger";
