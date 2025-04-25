import { ReactNode } from "react";
import { Resizable } from "re-resizable";

interface CalculatorContainerProps {
  title: string;
  subtitle?: string;
  input: ReactNode;
  actions: ReactNode;
  children?: ReactNode;
}

export default function CalculatorContainer({ title, subtitle, input, actions, children }: CalculatorContainerProps) {
  return (
    <Resizable
      minWidth={250}
      minHeight={250}
      defaultSize={{ width: 400, height: 300 }}
    >
      <div className="flex flex-col gap-4 p-4 max-w-lg w-full border-2 border-zinc-300 rounded-2xl bg-white/80 backdrop-blur-sm shadow-[8px_12px_32px_4px_rgba(0,0,0,0.18)]">
        <div className="flex flex-col items-center mb-1">
          <h1 className="text-3xl font-semibold text-zinc-800 mb-1 text-center">{title}</h1>
          {subtitle && (<span className="text-xs text-zinc-600 text-center">{subtitle}</span>)}
        </div>
        <div className="calculator-input">{input}</div>
        <div className="calculator-actions">{actions}</div>
        {children}
      </div>
    </Resizable>
  );
}
