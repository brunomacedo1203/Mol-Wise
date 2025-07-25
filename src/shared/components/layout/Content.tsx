import React from "react";

export interface ContentProps {
  title: string;
  color?: string;
  children?: React.ReactNode;
}

export default function Content(props: ContentProps) {
  return (
    <div
      id="main-content-area"
      className={`
    flex items-start flex-1 min-w-0 max-w-full h-full
    bg-zinc-100 dark:bg-neutral-950
    text-3xl dark:text-white
    overflow-x-hidden relative
  `}
    >
      {props.children}
    </div>
  );
}
