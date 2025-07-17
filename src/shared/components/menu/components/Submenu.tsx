"use client";

import { memo } from "react";
import { motion } from "framer-motion";
import { SubmenuProps } from "../types";
import { MENU_CLASSES, SUBMENU_VARIANTS } from "../constants";
import { MenuItem } from "./MenuItem";
import { cn } from "@/lib/utils";

interface SubmenuPropsFixed extends SubmenuProps {
  isCollapsed: boolean;
}

export const Submenu = memo(function Submenu({
  isOpen,
  items,
  isCollapsed,
}: SubmenuPropsFixed) {
  if (isCollapsed) return null;

  return (
    <motion.div
      variants={SUBMENU_VARIANTS}
      initial="closed"
      animate={isOpen ? "open" : "closed"}
      className="w-full mt-1"
    >
      <div className={cn(MENU_CLASSES.SUBMENU, "w-full")}>
        <ul className="p-1">
          {items.map((item, index) => (
            <li key={index}>
              <MenuItem
                {...item}
                isCollapsed={isCollapsed}
                isSubmenuItem={true}
              />
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
});
