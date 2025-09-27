"use client";

import { useState, useEffect, useRef } from "react";
import { getSmiles, getSdf } from "../utils/pubchemAPI";
import { useVisualizationStore } from "../store/visualizationStore";
import { Search, Loader2 } from "lucide-react";
import { trackMoleculeSearch } from "../events/moleculeSearchEvents";
import { trackMolecule3DInteraction } from "../events/molecule3DEvents";
import { useTranslations } from "next-intl";
import { getMoleculeKey } from "../utils/moleculeKey";

export function MoleculeToolbar() {
  const t = useTranslations("visualization");
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  // ✅ useRef para timer de debounce (evita warnings e renders extras)
  const debounceTimer = useRef<NodeJS.Timeout | null>(null);

  const setSmiles = useVisualizationStore((s) => s.setSmilesData);
  const setSdf = useVisualizationStore((s) => s.setSdfData);
  const setViewMode = useVisualizationStore((s) => s.setViewMode);
  const setRenderer = useVisualizationStore((s) => s.setRenderer);
  const viewMode = useVisualizationStore((s) => s.viewMode);
  const renderer = useVisualizationStore((s) => s.renderer);
  const smiles = useVisualizationStore((s) => s.smilesData);
  const sdfData = useVisualizationStore((s) => s.sdfData);

  // Detecta o tipo de busca
  const detectSearchType = (
    query: string
  ): "name" | "formula" | "smiles" | "cid" | "unknown" => {
    const trimmed = query.trim();
    if (/^\d+$/.test(trimmed)) return "cid";
    if (/[\[\]()=#@\\\/]/.test(trimmed)) return "smiles";
    if (/^[A-Za-z0-9]+$/.test(trimmed)) return "formula";
    if (/\s/.test(trimmed) || /[^A-Za-z0-9]/.test(trimmed)) return "name";
    return "unknown";
  };

  async function handleSearch(e?: React.FormEvent) {
    e?.preventDefault();
    const q = input.trim();
    if (!q) return;

    setErr(null);
    setLoading(true);
    const searchType = detectSearchType(q);

    const safeFetchText = async (url: string) => {
      try {
        const res = await fetch(url);
        if (!res.ok) return null;
        return await res.text();
      } catch {
        return null;
      }
    };

    try {
      let smiles: string | null = null;
      let sdf: string | null = null;

      if (searchType === "cid") {
        // 🔹 Busca direta pelo CID
        smiles = await safeFetchText(
          `https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/${q}/property/IsomericSMILES/TXT`
        );
        sdf = await safeFetchText(
          `https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/${q}/SDF`
        );
      } else {
        // 🔹 Busca padrão
        const [smilesRes, sdfRes] = await Promise.allSettled([
          getSmiles(q),
          getSdf(q),
        ]);
        smiles = smilesRes.status === "fulfilled" ? smilesRes.value : null;
        sdf = sdfRes.status === "fulfilled" ? sdfRes.value : null;
      }

      setSmiles(smiles);
      setSdf(sdf);

      if (!smiles && !sdf) throw new Error(t("notFound"));

      trackMoleculeSearch({
        search_term: q,
        search_type: searchType,
        success: true,
      });
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : t("error");
      setErr(message);
      setSmiles(null);
      setSdf(null);

      trackMoleculeSearch({
        search_term: q,
        search_type: searchType,
        success: false,
      });
    } finally {
      setLoading(false);
    }
  }

  const clearError = () => {
    if (err) setErr(null);
  };

  // ✅ Debounce usando ref (sem dependência extra)
  useEffect(() => {
    if (debounceTimer.current) clearTimeout(debounceTimer.current);

    if (input.trim() !== "") {
      debounceTimer.current = setTimeout(() => {
        trackMoleculeSearch({
          search_term: input.trim(),
          search_type: detectSearchType(input),
          success: false, // Apenas interação, não busca efetiva
        });
      }, 1000);
    }

    return () => {
      if (debounceTimer.current) clearTimeout(debounceTimer.current);
    };
  }, [input]);

  return (
    <div
      className="relative flex items-center justify-center mt-4 gap-2 max-w-4xl mx-auto px-4 py-2 
        rounded-full border border-zinc-300 dark:border-zinc-600 
        bg-white dark:bg-zinc-900 
        shadow-lg ring-1 ring-zinc-200 dark:ring-zinc-800 
        transition-shadow"
    >
      <form
        onSubmit={handleSearch}
        className="flex items-center gap-2 flex-1 max-w-md"
      >
        <div className="relative w-full">
          <input
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              clearError();
            }}
            onFocus={clearError}
            className={`w-full h-10 pl-4 pr-10 rounded-full border text-sm transition-all
              ${
                err
                  ? "border-red-500 text-zinc-900 dark:text-zinc-100"
                  : "border-zinc-400 text-zinc-900 dark:text-zinc-100"
              }
              dark:border-zinc-700 bg-white dark:bg-zinc-900
              placeholder:text-zinc-400 dark:placeholder:text-zinc-500
              focus:outline-none focus:ring-2 focus:ring-blue-500`}
            placeholder={t("placeholder")}
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"
            aria-label={t("search")}
            title={t("search")}
          >
            {loading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Search className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* Toggle 2D/3D */}
        <button
          type="button"
          onClick={() => {
            const newMode = viewMode === "2D" ? "3D" : "2D";
            setViewMode(newMode);
            if (newMode === "3D" && (smiles || sdfData)) {
              const moleculeName = getMoleculeKey(smiles, sdfData);
              trackMolecule3DInteraction({
                molecule_name: moleculeName,
                interaction_type: "style_change",
                interaction_value: "switch_to_3d",
              });
            }
          }}
          className="relative w-24 h-11 flex items-center justify-between px-3 rounded-full
            border border-zinc-400 dark:border-zinc-500
            bg-gradient-to-b from-white to-zinc-100 dark:from-zinc-900 dark:to-zinc-800
            shadow-inner dark:shadow-none
            transition-all duration-300"
          title={`Switch to ${viewMode === "2D" ? "3D" : "2D"}`}
          aria-label="Toggle 2D/3D"
        >
          <span className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">
            2D
          </span>
          <span className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">
            3D
          </span>
          <div
            className={`absolute top-[3px] left-[2px] w-9 h-9 rounded-full flex items-center justify-center
              bg-blue-600 text-white shadow-md
              transition-transform duration-300 pointer-events-none
              ${viewMode === "3D" ? "translate-x-[90%]" : "translate-x-0"}`}
          >
            <span className="text-sm font-bold">{viewMode}</span>
          </div>
        </button>

        {/* Botão para alternar motor 2D */}
        {viewMode === "2D" && (
          <button
            type="button"
            onClick={() =>
              setRenderer(renderer === "kekule" ? "openchemlib" : "kekule")
            }
            className="w-28 h-11 px-3 rounded-full border border-zinc-400 dark:border-zinc-500 
              bg-gradient-to-b from-white to-zinc-100 dark:from-zinc-900 dark:to-zinc-800 
              shadow-inner dark:shadow-none transition-all duration-300 text-sm font-semibold 
              text-zinc-700 dark:text-zinc-300"
            title="Alternar motor de visualização 2D"
          >
            {renderer === "kekule" ? "Kekule.js" : "OpenChemLib"}
          </button>
        )}
      </form>

      {err && (
        <div
          className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 px-2 py-2 
          bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 text-sm rounded-lg
          border border-red-300 dark:border-red-700 shadow-sm z-10 min-w-58 text-center"
        >
          {err}
        </div>
      )}
    </div>
  );
}
