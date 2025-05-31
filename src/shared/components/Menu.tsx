"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import {
  Calculator,
  ChevronDown,
  ChevronUp,
  FlaskConical,
  Table2,
  Book,
  Gamepad2,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter, useParams } from "next/navigation";
import { useCalculatorInstances } from "@/features/calculators/contexts/CalculatorInstancesContext";
import { useTranslations } from "next-intl";

const STORAGE_KEY = "menuState";

interface MenuState {
  openSections: Record<string, boolean>;
}

export default function Menu({ collapsed }: { collapsed: boolean }) {
  const [state, setState] = useState<MenuState>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    }
    return {
      openSections: {},
    };
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    }
  }, [state]);

  const toggleSection = (id: string) => {
    setState((prev) => ({
      ...prev,
      openSections: {
        ...prev.openSections,
        [id]: !prev.openSections[id],
      },
    }));
  };

  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const { addCalculator } = useCalculatorInstances();
  const locale = params.locale as string;
  const t = useTranslations();

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
        href={`/${locale}/periodicTable`}
        className={cn(
          "flex items-center gap-2 px-4 py-2 rounded-md hover:bg-zinc-200 dark:hover:bg-zinc-800",
          pathname === `/${locale}/periodicTable` &&
            "bg-zinc-100 dark:bg-zinc-900"
        )}
      >
        <Table2 className="w-5 h-5" />
        {!collapsed && (
          <span className="text-base">{t("navigation.periodicTable")}</span>
        )}
      </Link>

      <ScrollArea className="flex-1 scrollbar-hide">
        <ul className="flex flex-col pt-4">
          {/* Calculators Accordion */}
          <li>
            <button
              onClick={() => toggleSection("calculators")}
              className={cn(
                "flex items-center w-full gap-2 px-4 py-2 rounded-md hover:bg-zinc-200 dark:hover:bg-zinc-800 mt-1",
                state.openSections["calculators"] &&
                  "bg-zinc-100 dark:bg-zinc-900"
              )}
              aria-expanded={state.openSections["calculators"]}
            >
              <Calculator className="w-5 h-5" />
              {!collapsed && (
                <>
                  <span className="text-base">
                    {t("navigation.calculators")}
                  </span>
                  {state.openSections["calculators"] ? (
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
              animate={
                state.openSections["calculators"] && !collapsed
                  ? "open"
                  : "closed"
              }
              className={cn(
                "ml-6 mt-1",
                state.openSections["calculators"] && !collapsed
                  ? "block"
                  : "hidden"
              )}
            >
              <div className="rounded-xl border border-zinc-200 bg-white shadow-lg dark:bg-neutral-800 dark:border-neutral-700 min-w-[210px]">
                <ul className="p-1">
                  <li>
                    <button
                      onClick={() => {
                        if (pathname === `/${locale}/calculators`) {
                          const position = {
                            x: 100 + Math.random() * 100,
                            y: 100 + Math.random() * 100,
                            width: 750,
                          };
                          addCalculator("molar-mass", position);
                        } else {
                          router.push(`/${locale}/calculators?open=molar-mass`);
                        }
                      }}
                      className="flex items-center gap-2 w-full px-3 py-2 rounded-md text-2m hover:bg-blue-100 dark:hover:bg-blue-900/40 mt-1"
                    >
                      <FlaskConical className="w-4 h-4" />
                      {t("calculators.molarMass.title")}
                    </button>
                  </li>
                </ul>
              </div>
            </motion.div>
          </li>

          {/* Catalog Accordion */}
          <li>
            <button
              onClick={() => toggleSection("catalog")}
              className={cn(
                "flex items-center w-full gap-2 px-4 py-2 rounded-md hover:bg-zinc-200 dark:hover:bg-zinc-800 mt-1",
                state.openSections["catalog"] && "bg-zinc-100 dark:bg-zinc-900"
              )}
              aria-expanded={state.openSections["catalog"]}
            >
              <Book className="w-5 h-5" />
              {!collapsed && (
                <>
                  <span className="text-base">{t("navigation.catalog")}</span>
                  {state.openSections["catalog"] ? (
                    <ChevronUp className="w-4 h-4" />
                  ) : (
                    <ChevronDown className="w-4 h-4" />
                  )}
                </>
              )}
            </button>
            <motion.div
              variants={submenuVariants}
              initial="closed"
              animate={
                state.openSections["catalog"] && !collapsed ? "open" : "closed"
              }
              className={cn(
                "ml-6 mt-1",
                state.openSections["catalog"] && !collapsed ? "block" : "hidden"
              )}
            >
              <div className="rounded-xl border border-zinc-200 bg-white shadow-lg dark:bg-neutral-800 dark:border-neutral-700 min-w-[210px]">
                <ul className="p-1">
                  <li>
                    <Link
                      href={`/${locale}/catalog/elements`}
                      className="flex items-center gap-2 w-full px-3 py-2 rounded-md text-2m hover:bg-blue-100 dark:hover:bg-blue-900/40 mt-1"
                    >
                      <Table2 className="w-4 h-4" />
                      {t("catalog.elements.title")}
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={`/${locale}/catalog/compounds`}
                      className="flex items-center gap-2 w-full px-3 py-2 rounded-md text-2m hover:bg-blue-100 dark:hover:bg-blue-900/40 mt-1"
                    >
                      <FlaskConical className="w-4 h-4" />
                      {t("catalog.compounds.title")}
                    </Link>
                  </li>
                </ul>
              </div>
            </motion.div>
          </li>

          {/* Games Accordion */}
          <li>
            <button
              onClick={() => toggleSection("games")}
              className={cn(
                "flex items-center w-full gap-2 px-4 py-2 rounded-md hover:bg-zinc-200 dark:hover:bg-zinc-800 mt-1",
                state.openSections["games"] && "bg-zinc-100 dark:bg-zinc-900"
              )}
              aria-expanded={state.openSections["games"]}
            >
              <Gamepad2 className="w-5 h-5" />
              {!collapsed && (
                <>
                  <span className="text-base">{t("navigation.games")}</span>
                  {state.openSections["games"] ? (
                    <ChevronUp className="w-4 h-4" />
                  ) : (
                    <ChevronDown className="w-4 h-4" />
                  )}
                </>
              )}
            </button>
            <motion.div
              variants={submenuVariants}
              initial="closed"
              animate={
                state.openSections["games"] && !collapsed ? "open" : "closed"
              }
              className={cn(
                "ml-6 mt-1",
                state.openSections["games"] && !collapsed ? "block" : "hidden"
              )}
            >
              <div className="rounded-xl border border-zinc-200 bg-white shadow-lg dark:bg-neutral-800 dark:border-neutral-700 min-w-[210px]">
                <ul className="p-1">
                  <li>
                    <Link
                      href={`/${locale}/games/element-quiz`}
                      className="flex items-center gap-2 w-full px-3 py-2 rounded-md text-2m hover:bg-blue-100 dark:hover:bg-blue-900/40 mt-1"
                    >
                      <Gamepad2 className="w-4 h-4" />
                      {t("games.elementQuiz.title")}
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={`/${locale}/games/compound-builder`}
                      className="flex items-center gap-2 w-full px-3 py-2 rounded-md text-2m hover:bg-blue-100 dark:hover:bg-blue-900/40 mt-1"
                    >
                      <Gamepad2 className="w-4 h-4" />
                      {t("games.compoundBuilder.title")}
                    </Link>
                  </li>
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
