"use client";

import { MoleculeViewer2D } from "./MoleculeViewer2D";
import { MoleculeViewer2D_Kekule } from "./MoleculeViewer2D_Kekule";
import { MoleculeViewer3D } from "./MoleculeViewer3D";
import { MoleculeToolbar } from "./MoleculeToolbar";
import { useVisualizationStore } from "../store/visualizationStore";
import { useTranslations } from "next-intl";

export function VisualizationPageContent() {
  const t = useTranslations("visualization");
  const { viewMode, renderer, smilesData, sdfData } = useVisualizationStore();

  return (
    <div className="flex flex-col w-full h-full">
      {/* Toolbar horizontal */}
      <MoleculeToolbar />

      {/* Área principal sem restrições */}
      <div className="flex-1 min-h-0 p-0 relative overflow-hidden">
        {viewMode === "2D" && renderer === "openchemlib" && <MoleculeViewer2D />}
        {viewMode === "2D" && renderer === "kekule" && <MoleculeViewer2D_Kekule />}
        {viewMode === "3D" && <MoleculeViewer3D />}
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
