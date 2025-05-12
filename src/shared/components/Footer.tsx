import React from "react";

export interface FooterProps {
  leftText: string;
  rightText: string;
}

export default function Footer(props: FooterProps) {
  return (
    <footer
      className={`
        flex justify-between items-center   
        h-16 text-base px-10 bg-zinc-100
        border-t border-zinc-400 text-zinc-500
        dark:border-zinc-700 
dark:bg-zinc-900
          `}
    >
      <span>{props.leftText}</span>
      <span>{props.rightText}</span>
    </footer>
  );
}
