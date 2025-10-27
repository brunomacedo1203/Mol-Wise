"use client";

import { CalculatorPageContent } from "@/features/calculators/components/common/CalculatorPageContent";
import { useEffect, useRef } from "react";
import { useSubtitleStore } from "@/shared/store/subtitleStore";
import { useCalculatorInstancesStore } from "@/features/calculators/store/calculatorInstancesStore";
import type { CalculatorType } from "@/features/calculators/domain/types/calculator";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Page from "@/shared/components/layout/Page";
import { useTranslations } from "next-intl";

export default function CalculatorsClient() {
  const t = useTranslations("calculators");
  const setSubtitle = useSubtitleStore((state) => state.setSubtitle);
  const addCalculator = useCalculatorInstancesStore(
    (state) => state.addCalculator
  );
  const searchParams = useSearchParams();

  useEffect(() => {
    setSubtitle(t("subtitle"));
    return () => setSubtitle("");
  }, [setSubtitle, t]);

  // Processar parâmetro de query string para abrir calculadora específica
  // Evita duplicação em StrictMode armazenando a última search processada
  const lastProcessedSearchRef = useRef<string | null>(null);
  const router = useRouter();
  const pathname = usePathname();
  useEffect(() => {
    const openCalculator = searchParams.get("open");
    if (!openCalculator) return;

    // Considere apenas o valor de 'open' para controlar duplicação; outros params (ex: ts) não bloqueiam
    const currentSearchString = `open=${openCalculator}`;
    if (lastProcessedSearchRef.current === currentSearchString) return;
    lastProcessedSearchRef.current = currentSearchString;

    if (openCalculator) {
      const position = {
        x: 100 + Math.random() * 80,
        y: 100 + Math.random() * 80,
        width: 460,
      };
      addCalculator(openCalculator as CalculatorType, position);

      // Limpa os parâmetros 'open' e 'ts' para permitir novas aberturas subsequentes
      const params = new URLSearchParams(searchParams.toString());
      params.delete("open");
      params.delete("ts");
      const nextUrl = params.toString()
        ? `${pathname}?${params.toString()}`
        : pathname;
      router.replace(nextUrl, { scroll: false });
    }
  }, [searchParams, addCalculator, router, pathname]);

  return (
    <Page title={t("title")}>
      <CalculatorPageContent />
    </Page>
  );
}
