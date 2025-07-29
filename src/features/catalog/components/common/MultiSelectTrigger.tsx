import * as React from "react";
import { XCircle, ChevronDown, XIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const multiSelectVariants = cva(
  "m-1 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300",
  {
    variants: {
      variant: {
        default:
          "border-foreground/10 text-foreground bg-card hover:bg-card/80",
        secondary:
          "border-foreground/10 bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        inverted: "inverted",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

interface MultiSelectTriggerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof multiSelectVariants> {
  options: {
    label: string;
    value: string;
    icon?: React.ComponentType<{ className?: string }>;
  }[];
  selectedValues: string[];

  maxCount: number;
  animation: number;
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

      maxCount,
      animation,
      variant,
      className,
      onTogglePopover,
      onToggleOption,
      onClear,
      onClearExtra,
      ...props
    },
    ref
  ) => {
    return (
      <Button
        ref={ref}
        {...props}
        onClick={onTogglePopover}
        className={cn(
          "flex w-full p-1 rounded-md border min-h-10 h-auto items-center justify-between bg-inherit hover:bg-inherit [&_svg]:pointer-events-auto dark:border-zinc-400",
          className
        )}
      >
        {selectedValues.length > 0 ? (
          <div className="flex justify-between items-center w-full">
            <div className="flex flex-wrap items-center">
              {selectedValues.slice(0, maxCount).map((value) => {
                const option = options.find((o) => o.value === value);
                const IconComponent = option?.icon;
                return (
                  <Badge
                    key={value}
                    className={cn(
                      "animate-bounce",
                      multiSelectVariants({ variant })
                    )}
                    style={{ animationDuration: `${animation}s` }}
                  >
                    {IconComponent && (
                      <IconComponent className="h-4 w-4 mr-2" />
                    )}
                    {option?.label}
                    <XCircle
                      className="ml-2 h-4 w-4 cursor-pointer"
                      onClick={(event) => {
                        event.stopPropagation();
                        onToggleOption(value);
                      }}
                    />
                  </Badge>
                );
              })}
              {selectedValues.length > maxCount && (
                <Badge
                  className={cn(
                    "bg-transparent text-foreground border-foreground/1 hover:bg-transparent",
                    "animate-bounce",
                    multiSelectVariants({ variant })
                  )}
                  style={{ animationDuration: `${animation}s` }}
                >
                  {`+ ${selectedValues.length - maxCount} more`}
                  <XCircle
                    className="ml-2 h-4 w-4 cursor-pointer"
                    onClick={(event) => {
                      event.stopPropagation();
                      onClearExtra();
                    }}
                  />
                </Badge>
              )}
            </div>
            <div className="flex items-center justify-between">
              <XIcon
                className="h-4 mx-2 cursor-pointer text-muted-foreground"
                onClick={(event) => {
                  event.stopPropagation();
                  onClear();
                }}
              />
              <div className="w-px h-6 bg-border mx-2" />
              <ChevronDown className="h-4 mx-2 cursor-pointer text-muted-foreground" />
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-end w-full">
            <ChevronDown className="h-4 cursor-pointer text-muted-foreground mr-2" />
          </div>
        )}
      </Button>
    );
  }
);

MultiSelectTrigger.displayName = "MultiSelectTrigger";
