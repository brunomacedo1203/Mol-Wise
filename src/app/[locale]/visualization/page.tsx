"use client";

import Page from "@/shared/components/layout/Page";
import { MoleculeSearch } from "@/features/visualization/components/MoleculeSearch";
import { MoleculeViewer2D } from "@/features/visualization/components/MoleculeViewer2D";
import { MoleculeViewer3D } from "@/features/visualization/components/MoleculeViewer3D";
import { useVisualizationStore } from "@/features/visualization/store/visualizationStore";
import { useEffect } from "react";
import { useSubtitleStore } from "@/shared/store/subtitleStore";
import { useTranslations } from "next-intl";

export default function VisualizationPage() {
  const t = useTranslations("visualization");
  const setSubtitle = useSubtitleStore((s) => s.setSubtitle);
  const { viewMode, setViewMode, smilesData, sdfData } =
    useVisualizationStore();

  useEffect(() => {
    setSubtitle(t("subtitle"));
    return () => setSubtitle("");
  }, [setSubtitle, t]);

  return (
    <Page title={t("title")}>
      <div className="flex-1 flex flex-col w-full h-full min-h-0">
        {/* Header */}
        <div className="px-6 py-4 border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
          <p className="text-lg text-zinc-700 mb-4 dark:text-zinc-100">
            {t("description")}
          </p>

          <div className="mb-4">
            <MoleculeSearch />
          </div>

          <div className="flex justify-end gap-2">
            <button
              onClick={() => setViewMode("2D")}
              className={`px-4 py-2 rounded-lg border transition-colors duration-200
              focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/60
              ${
                viewMode === "2D"
                  ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900"
                  : "bg-transparent text-zinc-800 dark:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800"
              }`}
            >
              2D
            </button>
            <button
              onClick={() => setViewMode("3D")}
              className={`px-4 py-2 rounded-lg border transition-colors duration-200
              focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/60
              ${
                viewMode === "3D"
                  ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900"
                  : "bg-transparent text-zinc-800 dark:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800"
              }`}
            >
              3D
            </button>
          </div>
        </div>

        {/* Palco */}
        <div className="flex-1 min-h-0 p-6 bg-zinc-50 dark:bg-zinc-900">
          <div
            className="relative h-[60vh] min-h-[360px]
                          rounded-xl border
                          bg-white dark:bg-zinc-900
                          border-zinc-200 dark:border-zinc-800
                          shadow-sm dark:shadow-none
                          overflow-hidden"
          >
            {viewMode === "2D" && <MoleculeViewer2D />}
            {viewMode === "3D" && <MoleculeViewer3D />}
          </div>

          {!smilesData && !sdfData && (
            <div className="text-center py-12">
              <p className="text-lg text-zinc-600 dark:text-zinc-400">
                Dica: pesquise por <b>nome</b> (ex.: benzene), <b>fórmula</b>{" "}
                (ex.: NaCl),
                <b> SMILES</b> (ex.: C1=CC=CC=C1) ou <b>CID</b> (ex.: 241).
              </p>
            </div>
          )}
        </div>
      </div>
    </Page>
  );
}
