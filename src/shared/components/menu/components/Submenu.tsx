"use client";

import { memo } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { SubmenuProps } from "../types";
import { MENU_CLASSES, SUBMENU_VARIANTS } from "../constants";
import { MenuItem } from "./MenuItem";

export const Submenu = memo(function Submenu({ isOpen, items }: SubmenuProps) {
  return (
    <motion.div
      variants={SUBMENU_VARIANTS}
      initial="closed"
      animate={isOpen ? "open" : "closed"}
      className={cn("ml-3 mt-1", isOpen ? "block" : "hidden")}
    >
      <div className={MENU_CLASSES.SUBMENU}>
        <ul className="p-1">
          {items.map((item, index) => (
            <li key={index}>
              <MenuItem {...item} />
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
});
