import { ReactNode, useState } from "react";
import { Rnd } from "react-rnd";
import { X } from "lucide-react";
import { useTranslations } from "next-intl";
import {
  IconKeyboard,
  IconChevronDown,
  IconChevronUp,
} from "@tabler/icons-react";

interface Position {
  x: number;
  y: number;
}

interface CalculatorContainerProps {
  title: string;
  subtitle?: string;
  input: ReactNode;
  actions: ReactNode;
  children?: ReactNode;
  errorMessage?: string;
  onClose?: () => void;
  initialPosition?: Position & { width?: number };
  onPositionChange?: (position: Position & { width: number }) => void;
  isKeyboardVisible?: boolean;
  onKeyboardVisibilityChange?: (visible: boolean) => void;
}

export default function CalculatorContainer({
  title,
  subtitle,
  input,
  actions,
  children,
  errorMessage,
  onClose,
  initialPosition,
  onPositionChange,
  isKeyboardVisible = true,
  onKeyboardVisibilityChange,
}: CalculatorContainerProps) {
  const t = useTranslations();
  const [collapsed, setCollapsed] = useState(!isKeyboardVisible);

  const handleKeyboardToggle = () => {
    setCollapsed((prev) => {
      const newValue = !prev;
      onKeyboardVisibilityChange?.(!newValue);
      return newValue;
    });
  };

  return (
    <Rnd
      minWidth={500}
      maxWidth={700}
      default={{
        x: initialPosition?.x ?? 100,
        y: initialPosition?.y ?? 100,
        width: 500,
        height: "auto",
      }}
      bounds="#main-content-area"
      enable={{ right: true }}
      className="calculator-resizable"
      onDragStop={(e, d) => {
        if (onPositionChange) {
          const newPosition = {
            x: d.x,
            y: d.y,
            width: 500,
          };
          onPositionChange(newPosition);
        }
      }}
      onResizeStop={(e, direction, ref, delta, position) => {
        if (onPositionChange) {
          const newPosition = {
            x: position.x,
            y: position.y,
            width: ref.offsetWidth,
          };
          onPositionChange(newPosition);
        }
      }}
    >
      <div
        className="
          p-2 
          rounded-2xl 
          border border-zinc-200 shadow-xl
          bg-white bg-opacity-90 dark:bg-neutral-800 dark:bg-opacity-80
          flex flex-col
          dark:border-white/20 dark:shadow-none
          relative
          w-full  /* ✅ Sem max-w para não restringir resize */
        "
      >
        <div className="mb-3 flex items-start justify-between w-full">
          <div className="flex-1 pl-6">
            <h1 className="py-2 text-4xl font-bold text-zinc-800 dark:text-zinc-100 text-center w-full">
              {title}
            </h1>
            {subtitle && (
              <span className="text-base text-zinc-600 dark:text-white/60 text-center block w-full">
                {subtitle}
              </span>
            )}
          </div>
          {onClose && (
            <button
              className="
                ml-2 mt-1 p-2 rounded-full text-red-600
                hover:bg-red-500 hover:text-white dark:hover:bg-red-600
                shadow-lg border border-zinc-300 dark:border-red-800
                transition focus:outline-none focus:ring-2 focus:ring-red-400
                transform hover:scale-110
              "
              aria-label="Close calculator"
              onClick={onClose}
              type="button"
            >
              <X size={14} strokeWidth={2.6} />
            </button>
          )}
        </div>

        <div className="mb-2">{input}</div>
        {!collapsed && <div className="mb-2 w-full">{actions}</div>}
        {children}
        {errorMessage && (
          <div className="flex justify-center items-center text-red-500 dark:text-red-400 text-center text-sm mb-2">
            {errorMessage}
          </div>
        )}

        <div className="w-full flex justify-center mt-2">
          <button
            className="text-base text-zinc-500 dark:text-zinc-300 hover:text-zinc-800 dark:hover:text-white flex items-center gap-1"
            onClick={handleKeyboardToggle}
            type="button"
          >
            <IconKeyboard size={20} />
            <span>
              {collapsed
                ? t("common.accessibility.showKeyboard")
                : t("common.accessibility.hideKeyboard")}
            </span>
            {collapsed ? (
              <IconChevronDown size={20} />
            ) : (
              <IconChevronUp size={20} />
            )}
          </button>
        </div>
      </div>
    </Rnd>
  );
}
