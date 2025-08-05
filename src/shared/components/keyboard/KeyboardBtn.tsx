"use client";
import React from "react";

export interface KeyboardBtnProps {
  onClick?: () => void;
  children?: React.ReactNode;
  className?: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  title?: string;
  noDefaultHover?: boolean; // <-- NOVA PROP
}

const KeyboardBtn = ({
  onClick,
  children,
  className = "",
  disabled = false,
  type = "button",
  title,
  noDefaultHover = false,
}: KeyboardBtnProps) => {
  const estilosBase = [
    "min-w-[41px] min-h-[34px] px-2 py-2",
    "flex items-center justify-center",
    "rounded-xl",
    "border border-neutral-300 bg-white text-neutral-900",
    "dark:bg-transparent dark:border-white/20 dark:text-white",
    "shadow-none",
    "text-base font-semibold",
    !noDefaultHover && "hover:bg-neutral-100 dark:hover:bg-white/5",
    "transition-colors duration-150 select-none",
    "active:translate-y-[1px] active:shadow-none",
    "disabled:opacity-50 disabled:cursor-not-allowed",
  ]
    .filter(Boolean)
    .join(" ");

  // Handler universal para mouse/touch/caneta
  const handlePointerDown = (e: React.PointerEvent<HTMLButtonElement>) => {
    if (disabled) return;
    e.preventDefault();
    e.stopPropagation();
    onClick?.();
  };

  return (
    <button
      type={type}
      className={`${estilosBase} ${className}`}
      onPointerDown={handlePointerDown}
      disabled={disabled}
      title={title}
    >
      {children}
    </button>
  );
};

export default KeyboardBtn;
