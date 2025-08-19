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
      className="flex items-center justify-center gap-2 h-14 w-full select-none group"
      onClick={onClick}
      tabIndex={-1}
    >
      <span
        className={`
          font-extrabold text-2xl tracking-tight
          bg-gradient-to-r from-blue-600 to-emerald-500
          text-transparent bg-clip-text
          transition-all duration-300
          ${collapsed ? "hidden" : "block"}
        `}
      >
        Mol&nbsp;Class
      </span>
    </Link>
  );
}
