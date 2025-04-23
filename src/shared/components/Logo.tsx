import React from "react";
import { IconTools } from "@tabler/icons-react";
import Link from "next/link";
import {
  IconLayoutSidebarLeftCollapseFilled,
  IconLayoutSidebarRightCollapseFilled,
} from "@tabler/icons-react";

export interface LogoProps {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}

export default function Logo({ collapsed, setCollapsed }: LogoProps) {
  return (
    <div className="flex items-center justify-between px-5 h-16 border-b border-zinc-400 shadow-md">
      <button
        className="text-xl p-0 rounded-md "
        onClick={() => setCollapsed(!collapsed)}
      >
        {collapsed ? (
          <IconLayoutSidebarRightCollapseFilled
            size={30}
            stroke={1}
            color="black"
          />
        ) : (
          <IconLayoutSidebarLeftCollapseFilled
            size={30}
            stroke={1}
            color="black"
          />
        )}
      </button>

      <Link href="/" className="flex items-center gap-2.5">
        <span
          className={`text-lm font-black text-xl ${
            collapsed ? "hidden" : "block"
          } bg-gradient-to-r from-blue-600 to-green-600 text-transparent bg-clip-text`}
        >
          Mol Wise
        </span>

        <span className={`${collapsed ? "hidden" : "block"}`}>
          <IconTools size={30} stroke={1} color="black" />
        </span>
      </Link>
    </div>
  );
}
