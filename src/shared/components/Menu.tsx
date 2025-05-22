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

  // Animação rápida e suave para submenu
  const submenuVariants = {
    open: {
      opacity: 1,
      display: "block",
      transition: { duration: 0.12, ease: "easeOut" },
    },
    closed: {
      opacity: 0,
      transitionEnd: { display: "none" },
      transition: { duration: 0.08, ease: "easeIn" },
    },
  };

  return (
    <motion.nav
      className={cn(
        "sidebar relative flex flex-col h-full",
        "bg-zinc-100 dark:bg-neutral-900",
        collapsed ? "w-16" : "w-60"
      )}
    >
      {/* Periodic Table */}
      <Link
        href="/periodicTable"
        className={cn(
          "flex items-center gap-2 px-4 py-2 rounded-md hover:bg-zinc-200 dark:hover:bg-zinc-800",
          pathname === "/periodicTable" && "bg-zinc-100 dark:bg-zinc-900"
        )}
      >
        <Table2 className="w-5 h-5" />
        {!collapsed && <span className="text-base">Periodic Table</span>}
      </Link>

      <ScrollArea className="flex-1 scrollbar-hide">
        <ul className="flex flex-col pt-4">
          {/* Calculators Accordion */}
          <li>
            <button
              onClick={() => setCalculatorsOpen((open) => !open)}
              className={cn(
                "flex items-center w-full gap-2 px-4 py-2 rounded-md hover:bg-zinc-200 dark:hover:bg-zinc-800 mt-1",
                calculatorsOpen && "bg-zinc-100 dark:bg-zinc-900"
              )}
              aria-expanded={calculatorsOpen}
            >
              <Calculator className="w-5 h-5" />
              {!collapsed && (
                <>
                  <span className="text-base">Calculators</span>
                  {calculatorsOpen ? (
                    <ChevronUp className="w-4 h-4" />
                  ) : (
                    <ChevronDown className="w-4 h-4" />
                  )}
                </>
              )}
            </button>
            {/* Submenu destacado */}
            <motion.div
              variants={submenuVariants}
              initial="closed"
              animate={calculatorsOpen && !collapsed ? "open" : "closed"}
              className={cn(
                "ml-6 mt-1",
                // O submenu só aparece quando aberto e não está colapsado
                calculatorsOpen && !collapsed ? "block" : "hidden"
              )}
            >
              <div className="rounded-xl border border-zinc-200 bg-white shadow-lg dark:bg-neutral-800 dark:border-neutral-700 min-w-[210px]">
                <ul className="p-1">
                  <li>
                    <button
                      onClick={() => {
                        if (pathname === "/calculators") {
                          addCalculator("molar-mass");
                        } else {
                          router.push("/calculators?open=molar-mass");
                        }
                      }}
                      className="flex items-center gap-2 w-full px-3 py-2 rounded-md text-sm hover:bg-blue-100 dark:hover:bg-blue-900/40 mt-1"
                    >
                      <FlaskConical className="w-4 h-4" />
                      Molar Mass Calculator
                    </button>
                  </li>
                  {/* Adicione outros calculators aqui */}
                </ul>
              </div>
            </motion.div>
          </li>
        </ul>
      </ScrollArea>
      {/* Footer ou extras */}
    </motion.nav>
  );
}
