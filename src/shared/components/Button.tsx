"use client";
import React from "react";

export interface ButtonProps {
  onClick?: () => void;
  children?: React.ReactNode;
  className?: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
}

const Button = ({
  onClick,
  children = "Button",
  className = "",
  disabled = false,
  type = "button"
}: ButtonProps) => {
  
  const estilosBase = 
    "w-40 h-12 px-4 py-2 text-white bg-green-600 hover:bg-green-700 " +
    "border-2 border-green-700 rounded-xl shadow-2xl font-bold text-2xl " +
    "transition duration-200 active:translate-y-1 active:shadow-none text-center";

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

export default Button;