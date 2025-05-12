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
         flex px-4 items-start flex-1 
         bg-zinc-100 dark:bg-zinc-800 
         text-3xl dark:text-white 
         overflow-auto relative`}
    >
      {props.children}
    </div>
  );
}
