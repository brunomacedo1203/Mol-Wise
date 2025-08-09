"use client";

import { useState } from "react";
import { getSmiles, getSdf } from "../utils/pubchemAPI";
import { useVisualizationStore } from "../store/visualizationStore";

export function MoleculeSearch() {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const setSmiles = useVisualizationStore((s) => s.setSmilesData);
  const setSdf = useVisualizationStore((s) => s.setSdfData);
  const setViewMode = useVisualizationStore((s) => s.setViewMode);

  async function handleSearch(e?: React.FormEvent) {
    e?.preventDefault();
    setErr(null);
    setLoading(true);
    try {
      // Busca ambos: SMILES (2D) e SDF (3D)
      const [smiles, sdf] = await Promise.all([
        getSmiles(input),
        getSdf(input).catch(() => null), // se não houver 3D, tentamos fallback dentro do getSdf
      ]);

      setSmiles(smiles);
      if (sdf) setSdf(sdf);
      else setSdf(null);

      // começa em 2D por padrão
      setViewMode("2D");
    } catch (error: unknown) {
      setErr(
        error instanceof Error ? error.message : "Erro ao buscar molécula."
      );
      setSmiles(null);
      setSdf(null);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSearch} className="flex items-center gap-2 mb-4">
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Digite nome, fórmula, SMILES ou CID (ex.: benzene, NaCl, C1=CC=CC=C1, 241)"
        className="flex-1 px-3 py-2 rounded border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100"
      />
      <button
        type="submit"
        onClick={() => handleSearch()}
        disabled={loading || !input.trim()}
        className="px-4 py-2 rounded bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 disabled:opacity-50"
      >
        {loading ? "Buscando..." : "Buscar"}
      </button>
      {err && <span className="text-red-600 text-sm">{err}</span>}
    </form>
  );
}
