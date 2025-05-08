"use client";
import React from "react";

export interface KeyboardBtnProps {
  onClick?: () => void;
  children?: React.ReactNode;
  className?: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  title?: string;
}

const KeyboardBtn = ({
  onClick,
  children,
  className = "",
  disabled = false,
  type = "button",
  title,
}: KeyboardBtnProps) => {
  const estilosBase =
    "w-9 h-9 flex items-center justify-center " +
    "bg-white/80 backdrop-blur-sm text-zinc-700 " +
    "hover:bg-zinc-100 hover:text-zinc-900 " +
    "rounded-xl border border-zinc-200 " +
    "shadow-[0_2px_3px_-1px_rgba(0,0,0,0.1),0_1px_0_0_rgba(25,28,33,0.02),0_0_0_1px_rgba(25,28,33,0.08)] " +
    "hover:shadow-[0_4px_6px_-2px_rgba(0,0,0,0.05),0_2px_2px_-1px_rgba(25,28,33,0.05),0_0_0_1px_rgba(25,28,33,0.1)] " +
    "text-sm font-medium leading-5 " +
    "transition-all duration-150 ease-in-out " +
    "active:translate-y-[1px] active:shadow-none " +
    "disabled:opacity-50 disabled:cursor-not-allowed";

  return (
    <button
      type={type}
      className={`${estilosBase} ${className}`}
      onClick={onClick}
      disabled={disabled}
      title={title}
    >
      {children}
    </button>
  );
};

export default KeyboardBtn;
