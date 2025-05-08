import React from "react";
import { useSubtitle } from "@/shared/contexts/SubtitleContext";

export interface HeaderProps {
  title: string;
  className?: string;
}

export default function Header(props: HeaderProps) {
  const subtitle = useSubtitle();
  return (
    <div
      className={`flex flex-col justify-center px-5 border-b border-zinc-400 mb-2 shadow-md ${
        props.className ?? ""
      }`}
    >
      <h1 className="text-xl font-black text-zinc-900">{props.title}</h1>
      {subtitle && <h2 className="text-sm text-zinc-700">{subtitle}</h2>}
    </div>
  );
}
