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
         bg-zinc-100
         text-3xl overflow-auto
         relative`}
    >
      {props.children}
    </div>
  );
}
