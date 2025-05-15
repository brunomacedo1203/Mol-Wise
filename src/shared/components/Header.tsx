import React from "react";
import { useSubtitle } from "@/shared/contexts/SubtitleContext";
import ThemeToggle from "./ThemeToggle";

export interface HeaderProps {
  title: string;
  className?: string;
}

export default function Header(props: HeaderProps) {
  const subtitle = useSubtitle();
  return (
    <div
      className={`flex flex-col justify-center px-5 border-b border-zinc-400 dark:border-zinc-700 shadow-md bg-white dark:bg-zinc-900 ${
        props.className ?? ""
      }`}
    >
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-black text-zinc-900 dark:text-zinc-100">
          {props.title}
        </h1>
        <ThemeToggle />
      </div>
      {subtitle && (
        <h2 className="text-sm text-zinc-600 dark:text-zinc-300">{subtitle}</h2>
      )}
    </div>
  );
}

/*
dark:border-zinc-700 
dark:bg-zinc-900
dark:text-zinc-100

*/
