"use client";

import { memo } from "react";
import { motion } from "framer-motion";
import { SubmenuProps } from "../types";
import { MENU_CLASSES, SUBMENU_VARIANTS } from "../constants";
import { MenuItem } from "./MenuItem";

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
      className="ml-3 mt-1"
    >
      <div className={MENU_CLASSES.SUBMENU}>
        <ul className="p-1">
          {items.map((item, index) => (
            <li key={index}>
              <MenuItem {...item} isCollapsed={isCollapsed} />
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
});
