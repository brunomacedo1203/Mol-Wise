"use client";

import { useEffect, useState } from "react";
import { MoleculeViewer2D } from "./MoleculeViewer2D";
import { MoleculeViewer3D } from "./MoleculeViewer3D";
import { MoleculeToolbar } from "./MoleculeToolbar";
import { useVisualizationStore } from "../store/visualizationStore";
import { useTranslations } from "next-intl";
import { getSdf3D } from "../utils/pubchemAPI";

export function VisualizationPageContent() {
  const t = useTranslations("visualization");
  const {
    viewMode,
    smilesData,
    sdfData,
    currentMolKey,
    setSdfData,
  } = useVisualizationStore();

  const [hasInitialized, setHasInitialized] = useState(false);

  useEffect(() => {
    // Carrega cafeína somente se não há dados e não há molécula atual
    if (!hasInitialized && !smilesData && !sdfData && !currentMolKey) {
      const loadCaffeine = async () => {
        const caffeine = await getSdf3D("caffeine");
        if (caffeine) setSdfData(caffeine);
      };
      loadCaffeine();
      setHasInitialized(true);
    }
  }, [hasInitialized, smilesData, sdfData, currentMolKey, setSdfData]);

  return (
    <div className="flex flex-col w-full h-full">
      {/* Toolbar horizontal */}
      <MoleculeToolbar />

      {/* Área principal sem restrições */}
      <div className="flex-1 min-h-0 p-0 relative overflow-hidden">
        {/* Renderiza ambos, controla visibilidade via CSS */}
        <div
          className={`absolute inset-0 transition-opacity duration-300 ${
            viewMode === "2D"
              ? "opacity-100 z-10"
              : "opacity-0 z-0 pointer-events-none"
          }`}
        >
          <MoleculeViewer2D />
        </div>

        <div
          className={`absolute inset-0 transition-opacity duration-300 ${
            viewMode === "3D"
              ? "opacity-100 z-10"
              : "opacity-0 z-0 pointer-events-none"
          }`}
        >
          <MoleculeViewer3D />
        </div>
      </div>

      {/* Dica quando nada é carregado */}
      {!smilesData && !sdfData && (
        <div className="text-center py-6">
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            💡 <b>{t("tip")}:</b> {t("example")} <b>benzene</b>, <b>NaCl</b>,{" "}
            <b>C1=CC=CC=C1</b>, <b>241</b>.
          </p>
        </div>
      )}
    </div>
  );
}
