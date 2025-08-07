"use client";

import { VisualizationContainerProps } from "../types/visualization.types";
import { MoleculeSearch } from "./MoleculeSearch";
// import { MoleculeViewer2D } from "./MoleculeViewer2D";
import { MoleculeViewer3D } from "./MoleculeViewer3D";
import { useVisualizationStore } from "../store/visualizationStore";

export function VisualizationContainer({
  width = "100%",
  className,
}: VisualizationContainerProps) {
  const { smilesData, sdfData, viewMode, setViewMode } =
    useVisualizationStore();

  return (
    <div
      style={{ width }}
      className={`rounded-lg shadow-lg p-4 bg-white dark:bg-zinc-900 ${className}`}
    >
      <MoleculeSearch />

      <div className="flex justify-end mb-2">
        <button
          onClick={() => setViewMode("2D")}
          className={`px-3 py-1 mr-2 rounded ${
            viewMode === "2D" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          2D
        </button>
        <button
          onClick={() => setViewMode("3D")}
          className={`px-3 py-1 rounded ${
            viewMode === "3D" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          3D
        </button>
      </div>

      {/* Temporariamente comentado para resolver o erro do RDKit */}
      {/* {viewMode === "2D" && smilesData && (
        <MoleculeViewer2D smiles={smilesData} />
      )} */}

      {viewMode === "2D" && smilesData && (
        <div className="border p-4 rounded bg-gray-50 dark:bg-zinc-800 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Visualização 2D temporariamente indisponível
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
            SMILES: {smilesData}
          </p>
        </div>
      )}

      {viewMode === "3D" && sdfData && <MoleculeViewer3D sdfData={sdfData} />}
    </div>
  );
}
