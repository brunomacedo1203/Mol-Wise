import React from "react";
import Link from "next/link";

export interface LogoProps {
  collapsed: boolean;
  onClick?: () => void;
}

export default function Logo({ collapsed, onClick }: LogoProps) {
  return (
    <Link
      href="/"
      className="flex items-center justify-center w-full h-16"
      onClick={onClick}
    >
      <span
        className={`text-lm font-black text-xl ${
          collapsed ? "hidden" : "block"
        } bg-gradient-to-r from-blue-600 to-green-600 text-transparent bg-clip-text`}
      >
        Mol Wise
      </span>
    </Link>
  );
}
