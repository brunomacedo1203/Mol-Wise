"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Filter, ChevronDown, ChevronUp } from "lucide-react";
import { useTranslations } from "next-intl";
import PeriodicTableFilter from "../PeriodicTableFilter";
import { usePeriodicTableStore } from "../../store/periodicTableStore";

export default function PeriodicTableFilters() {
  const t = useTranslations("periodicTable");
  const filters = usePeriodicTableStore((state: any) => state.filters);
  const [isOpen, setIsOpen] = useState(true);

  return (
  <div className="mb-2 border border-zinc-400 dark:border-zinc-700 rounded-2xl bg-background dark:bg-zinc-900">
      <div className={`px-4 py-2 ${isOpen ? "border-b border-zinc-400 dark:border-zinc-700" : ""}`}>
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            <h3 className="text-lg md:text-xl font-semibold">{t("filterLabel")}</h3>
          </div>
          <Button variant="ghost" size="sm" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      {isOpen && (
        <div className="px-4  ">
          <PeriodicTableFilter />
        </div>
      )}
    </div>
  );
}