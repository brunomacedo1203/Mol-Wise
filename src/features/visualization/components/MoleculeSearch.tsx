"use client";

import { useVisualizationStore } from "../store/visualizationStore";
import { fetchMoleculeData } from "../utils/pubchemAPI";

export function MoleculeSearch() {
  const { query, setQuery, setSmilesData, setSdfData } =
    useVisualizationStore();

  const handleSearch = async () => {
    if (!query) return;
    const { smiles, sdf } = await fetchMoleculeData(query);
    setSmilesData(smiles);
    setSdfData(sdf);
  };

  return (
    <div className="flex gap-2 mb-4">
      <input
        type="text"
        placeholder="Digite o nome da molécula"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="border p-2 rounded w-full"
      />
      <button
        onClick={handleSearch}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Buscar
      </button>
    </div>
  );
}
