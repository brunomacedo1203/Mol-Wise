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
      className="text-xs text-zinc-600 hover:text-zinc-900 flex items-center gap-1"
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
