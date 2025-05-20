"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import {
  Calculator,
  ChevronDown,
  ChevronUp,
  FlaskConical,
  Table2,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useCalculatorInstances } from "@/features/calculators/contexts/CalculatorInstancesContext";

export default function Menu({ collapsed }: { collapsed: boolean }) {
  const [calculatorsOpen, setCalculatorsOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const { addCalculator } = useCalculatorInstances();

  // Para animação dos submenus
  const submenuVariants = {
    open: { height: "auto", opacity: 1 },
    closed: { height: 0, opacity: 0, overflow: "hidden" },
  };

  return (
    <motion.nav
      className={cn(
        "sidebar relative flex flex-col h-full border-r",
        "bg-zinc-100 dark:bg-neutral-900",

        collapsed ? "w-16" : "w-60"
      )}
    >
      {/* Periodic Table (Tabela Periódica) */}

      <Link
        href="/periodicTable"
        className={cn(
          "flex items-center gap-2 px-4 py-2 rounded-md hover:bg-zinc-200 dark:hover:bg-zinc-800 transition",
          pathname === "/periodicTable" && "bg-zinc-100 dark:bg-zinc-900"
        )}
      >
        <Table2 className="w-5 h-5" />
        {!collapsed && <span className="text-base">Periodic Table</span>}
      </Link>

      <ScrollArea className="flex-1">
        <ul className="flex flex-col pt-4">
          {/* Calculators Accordion */}
          <li>
            <button
              onClick={() => setCalculatorsOpen((open) => !open)}
              className={cn(
                "flex items-center w-full gap-2 px-4 py-2 rounded-md hover:bg-zinc-200 dark:hover:bg-zinc-800 transition mt-1",
                calculatorsOpen && "bg-zinc-100 dark:bg-zinc-900"
              )}
              aria-expanded={calculatorsOpen}
            >
              <Calculator className="w-5 h-5" />
              {!collapsed && (
                <>
                  <span className="text-base flex-1">Calculators</span>
                  {calculatorsOpen ? (
                    <ChevronUp className="w-4 h-4" />
                  ) : (
                    <ChevronDown className="w-4 h-4" />
                  )}
                </>
              )}
            </button>
            {/* Submenu */}
            <motion.ul
              variants={submenuVariants}
              initial="closed"
              animate={calculatorsOpen && !collapsed ? "open" : "closed"}
              className="pl-7 pr-2"
            >
              {/* Só uma calculadora agora, mas facilmente extensível */}
              <li>
                <button
                  onClick={() => {
                    if (pathname === "/calculators") {
                      addCalculator("molar-mass");
                    } else {
                      router.push("/calculators?open=molar-mass");
                    }
                  }}
                  className="flex items-center gap-2 w-full px-2 py-2 rounded-md text-sm hover:bg-blue-100 dark:hover:bg-blue-900/40 mt-1 "
                >
                  <FlaskConical className="w-4 h-4" />
                  Molar Mass Calculator
                </button>
              </li>
            </motion.ul>
          </li>
        </ul>
      </ScrollArea>
      {/* Footer ou extras */}
      {/* ... */}
    </motion.nav>
  );
}
