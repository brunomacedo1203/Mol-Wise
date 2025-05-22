import { ReactNode, useState } from "react";
import { Rnd } from "react-rnd";
import { X } from "lucide-react";
import {
  IconKeyboard,
  IconChevronDown,
  IconChevronUp,
} from "@tabler/icons-react";

interface CalculatorContainerProps {
  title: string;
  subtitle?: string;
  input: ReactNode;
  actions: ReactNode;
  children?: ReactNode;
  errorMessage?: string;
  onClose?: () => void;
}

export default function CalculatorContainer({
  title,
  subtitle,
  input,
  actions,
  children,
  errorMessage,
  onClose,
}: CalculatorContainerProps) {
  const [collapsed, setCollapsed] = useState(true);

  return (
    <Rnd
      minWidth={500}
      maxWidth={900}
      defaultSize={{ width: 750, height: "auto" }}
      enable={{ right: true }}
      bounds="#main-content-area"
      className="calculator-resizable"
    >
      <div
        className="
          p-2 
          max-w-xl mx-auto
          rounded-2xl 
          border border-zinc-200 shadow-xl
          bg-white dark:bg-neutral-800/90
          flex flex-col
          dark:border-white/20 dark:shadow-none
          relative
        "
      >
        <div className=" mb-3 flex items-start justify-between w-full">
          <div className="flex-1 pl-6">
            <h1 className="text-4xl font-bold text-zinc-800 dark:text-zinc-100 text-center w-full">
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
            ml-2 mt-1
            p-2
            rounded-full
            text-red-600
           
            hover:bg-red-500 hover:text-white
             dark:hover:bg-red-600
            shadow-lg
            border border-zinc-300 dark:border-red-800
            transition
            focus:outline-none focus:ring-2 focus:ring-red-400
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
            onClick={() => setCollapsed((c) => !c)}
            type="button"
          >
            <IconKeyboard size={20} />
            <span>{collapsed ? "Show keyboard" : "Hide keyboard"}</span>
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
