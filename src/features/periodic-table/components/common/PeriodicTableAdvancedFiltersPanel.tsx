"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Filter, ChevronDown, ChevronUp } from "lucide-react";
import { useTranslations } from "next-intl";
import PeriodicTableFilter from "../PeriodicTableFilter";
import PeriodicTablePropertyFilter from "../PeriodicTablePropertyFilter";
import { usePeriodicTableStore } from "../../store/periodicTableStore";

export default function PeriodicTableFilters() {
  const t = useTranslations("periodicTable");
  const isOpen = usePeriodicTableStore((state) => state.isFiltersPanelOpen);
  const setIsOpen = usePeriodicTableStore(
    (state) => state.setFiltersPanelOpen
  );

  return (
    <div className="mb-0 border border-zinc-400 dark:border-zinc-700 rounded-2xl bg-background dark:bg-zinc-900">
      <div
        className={`px-4 py-2 ${isOpen ? "border-b border-zinc-400 dark:border-zinc-700" : ""} cursor-pointer`}
        role="button"
        tabIndex={0}
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setIsOpen(!isOpen);
          }
        }}
      >
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            <h3 className="text-lg md:text-xl font-semibold">{t("filterLabel")}</h3>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              setIsOpen(!isOpen);
            }}
          >
            {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      {isOpen && (
        <div className="px-4 ">
          <div className="grid grid-cols-1 gap-1 sm:gap-1 justify-items-center mx-auto md:[grid-template-columns:repeat(2,minmax(0,max-content))] xl:[grid-template-columns:repeat(3,minmax(0,max-content))] md:justify-center">
            <div className="w-full max-w-md">
              <PeriodicTableFilter />
            </div>
            <div className="w-full max-w-md">
              <PeriodicTablePropertyFilter />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
