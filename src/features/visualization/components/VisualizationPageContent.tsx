"use client";

import { MoleculeViewer2D } from "./MoleculeViewer2D";
import { MoleculeViewer3D } from "./MoleculeViewer3D";
import { MoleculeToolbar } from "./MoleculeToolbar";
import { useVisualizationStore } from "../store/visualizationStore";
import { useTranslations } from "next-intl";

export function VisualizationPageContent() {
  const t = useTranslations("visualization");
  const { viewMode, smilesData, sdfData } = useVisualizationStore();

  return (
    <div className="flex flex-col w-full h-full">
      {/* Toolbar horizontal */}
      <MoleculeToolbar />

      {/* Área principal */}
      <main className="flex-1 min-h-0 p-4 sm:p-6 bg-zinc-50 dark:bg-zinc-900">
        <div
          className="relative h-[70vh] min-h-[400px]
                    rounded-xl border
                    bg-white dark:bg-zinc-900
                    border-zinc-200 dark:border-zinc-800
                    shadow-sm overflow-hidden"
        >
          {viewMode === "2D" ? <MoleculeViewer2D /> : <MoleculeViewer3D />}
        </div>

        {!smilesData && !sdfData && (
          <div className="text-center py-6">
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              💡 <b>{t("tip")}:</b> {t("example")} <b>benzene</b>, <b>NaCl</b>
              , <b>C1=CC=CC=C1</b>, <b>241</b>.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}