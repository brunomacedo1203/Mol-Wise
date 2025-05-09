import { ReactNode, useState } from "react";
import { Rnd } from "react-rnd";
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
}

export default function CalculatorContainer({
  title,
  subtitle,
  input,
  actions,
  children,
  errorMessage,
}: CalculatorContainerProps) {
  const [collapsed, setCollapsed] = useState(true);

  return (
    <Rnd
      minWidth={450}
      maxWidth={800}
      defaultSize={{ width: 450, height: "auto" }}
      enable={{ right: true }}
      bounds="#main-content-area"
      className="calculator-resizable"
    >
      <div className="calculator-container p-5 pb-2 bg-white rounded-2xl flex flex-col shadow-2xl border border-gray-300">
        <div className="mb-2 max-w-[450px] mx-auto w-full">
          <h1 className="text-3xl font-semibold text-zinc-800 mb-1 text-center">
            {title}
          </h1>
          {subtitle && (
            <span className="text-xs text-zinc-600 text-center block w-full">
              {subtitle}
            </span>
          )}
        </div>
        <div className="calculator-input mb-2 max-w-[450px] mx-auto w-full">
          {input}
        </div>

        {/* Área de ações colapsável */}
        {!collapsed && (
          <div className="calculator-actions mb-2 max-w-[450px] mx-auto w-full">
            {actions}
          </div>
        )}
        {children}
        {errorMessage && (
          <div className="flex justify-center items-center text-zinc-800 text-center text-sm mb-2 max-w-[450px] mx-auto w-full">
            <div className="error-message">{errorMessage}</div>
          </div>
        )}

        {/* Botão de colapso */}
        <div className="w-full flex justify-center">
          <button
            className="text-xs text-zinc-600 hover:text-zinc-900 flex items-center gap-1"
            onClick={() => setCollapsed((c) => !c)}
          >
            <IconKeyboard size={20} />
            <span>{collapsed ? "Show keyboard" : "Hide keyboard"}</span>
            {collapsed ? (
              <IconChevronDown size={20} />
            ) : (
              <IconChevronUp size={16} />
            )}
          </button>
        </div>
      </div>
    </Rnd>
  );
}
