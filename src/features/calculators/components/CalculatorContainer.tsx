import { ReactNode } from "react";
import { Rnd } from "react-rnd";

interface CalculatorContainerProps {
  title: string;
  subtitle?: string;
  input: ReactNode;
  actions: ReactNode;
  children?: ReactNode;
  errorMessage?: string;
}

export default function CalculatorContainer({ title, subtitle, input, actions, children, errorMessage }: CalculatorContainerProps) {
  return (
    <Rnd
      minWidth={250}
      maxWidth={600}
      defaultSize={{ width: 400, height: 'auto' }}
      enable={{ right: true }}
      bounds="#main-content-area"
      className="calculator-resizable"
    >
      <div
        className="calculator-container p-6 bg-white rounded-xl flex flex-col"
        style={{ boxShadow: '16px 10px 20px 0px rgba(0,0,0,0.18)' }}
      >
        <div className="mb-2">
          <h1 className="text-3xl font-semibold text-zinc-800 mb-1 text-center">{title}</h1>
          {subtitle && (
            <span className="text-xs text-zinc-600 text-center block w-full">{subtitle}</span>
          )}
        </div>
        <div className="calculator-input mb-2">{input}</div>
        <div className="calculator-actions mb-2">{actions}</div>
        {children}
        {errorMessage && (
          <div className="flex justify-center items-center text-zinc-800 text-center text-sm">
            <div className="error-message">{errorMessage}</div>
          </div>
        )}
      </div>
    </Rnd>
  );
}
