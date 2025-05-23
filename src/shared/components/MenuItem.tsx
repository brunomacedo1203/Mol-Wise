import React from "react";
import Link from "next/link";

export interface MenuItemProps {
  label: string;
  url: string;
  icone: React.ReactNode;
}

export default function MenuItem(props: MenuItemProps) {
  return (
    <Link
      href={props.url}
      className={`
      flex items-center gap-4 
      text-base w-full px-2 py-2 rounded-md
      transition-colors duration-150
      hover:bg-zinc-300 hover:rounded-lg
      dark:hover:bg-white/10
    `}
    >
      <span>{props.icone}</span>
      <span>{props.label}</span>
    </Link>
  );
}
