"use client";

import { MoleculeSearch } from "./MoleculeSearch";
import { MoleculeViewer2D } from "./MoleculeViewer2D";
import { MoleculeViewer3D } from "./MoleculeViewer3D";
import { useVisualizationStore } from "../store/visualizationStore";

export function VisualizationContainer({
  width = "100%",
  className = "",
}: {
  width?: string;
  className?: string;
}) {
  const { viewMode, setViewMode, smilesData, sdfData } =
    useVisualizationStore();

  return (
    <div
      style={{ width }}
      className={`rounded-lg shadow-lg p-4 bg-white dark:bg-zinc-900 ${className}`}
    >
      <MoleculeSearch />

      <div className="flex justify-end mb-2 gap-2">
        <button
          onClick={() => setViewMode("2D")}
          className={`px-3 py-1 rounded border ${
            viewMode === "2D"
              ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900"
              : "bg-transparent text-zinc-800 dark:text-zinc-100"
          }`}
        >
          2D
        </button>
        <button
          onClick={() => setViewMode("3D")}
          className={`px-3 py-1 rounded border ${
            viewMode === "3D"
              ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900"
              : "bg-transparent text-zinc-800 dark:text-zinc-100"
          }`}
        >
          3D
        </button>
      </div>

      {viewMode === "2D" && <MoleculeViewer2D />}
      {viewMode === "3D" && <MoleculeViewer3D />}

      {!smilesData && !sdfData && (
        <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-300">
          Dica: pesquise por <b>nome</b> (ex.: benzene), <b>fórmula</b> (ex.:
          NaCl) ou <b>SMILES</b> (ex.: C1=CC=CC=C1).
        </p>
      )}
    </div>
  );
}
