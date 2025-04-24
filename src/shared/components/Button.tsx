"use client";
import React from "react";

export interface ButtonProps {
  onClick?: () => void;
  children?: React.ReactNode;
  className?: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  style?: React.CSSProperties;
}

const Button: React.FC<ButtonProps> = ({
  onClick,
  children = "Button",
  className = "",
  disabled = false,
  type = "button",
  style = {},
}) => {
  return (
    <button
      type={type}
      className={`w-40 h-12 px-4 py-2 text-white bg-green-600 hover:bg-green-700 border-2 border-green-700 rounded-xl shadow-2xl font-bold transition duration-200 active:translate-y-1 active:shadow-none text-2xl text-center drop-shadow-lg ${className}`}
      onClick={onClick}
      disabled={disabled}
      style={{ fontSize: 22, ...style }}
    >
      {children}
    </button>
  );
};

export default Button;
