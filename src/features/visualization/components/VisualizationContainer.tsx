"use client";

import { VisualizationContainerProps } from "../types/visualization.types";
import { MoleculeSearch } from "./MoleculeSearch";
import { MoleculeViewer3D } from "./MoleculeViewer3D";
import { MoleculeViewer2D } from "./MoleculeViewer2D";
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
            viewMode === "2D"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 dark:bg-zinc-700"
          }`}
        >
          2D
        </button>
        <button
          onClick={() => setViewMode("3D")}
          className={`px-3 py-1 rounded ${
            viewMode === "3D"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 dark:bg-zinc-700"
          }`}
        >
          3D
        </button>
      </div>

      {viewMode === "2D" && smilesData && (
        <MoleculeViewer2D smiles={smilesData} />
      )}

      {viewMode === "3D" && sdfData && <MoleculeViewer3D sdfData={sdfData} />}
    </div>
  );
}
