"use client";
import React from "react";

export interface KeyboardBtnProps {
  onClick?: () => void;
  children?: React.ReactNode;
  className?: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
}

const KeyboardBtn = ({
  onClick,
  children,
  className = "",
  disabled = false,
  type = "button",
}: KeyboardBtnProps) => {
  const estilosBase =
    "w-9 h-9 px-2 py-1 text-black hover:bg-gray-200 " +
    "border border-gray-300 rounded-lg shadow font-semibold text-lg " +
    "transition duration-150 active:translate-y-0.5 active:shadow-none text-center";

  return (
    <button
      type={type}
      className={`${estilosBase} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default KeyboardBtn;
