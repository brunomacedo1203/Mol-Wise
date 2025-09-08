// src/features/visualization/components/MoleculeToolbar.tsx
"use client";

import { useState, useEffect } from "react";
import { getSmiles, getSdf } from "../utils/pubchemAPI";
import { useVisualizationStore } from "../store/visualizationStore";
import { Search, Loader2 } from "lucide-react"; // 🔁 Removidos ZoomIn, ZoomOut, Trash2, Download
import { trackMoleculeSearch } from "../events/moleculeSearchEvents";
import { useTranslations } from "next-intl";

export function MoleculeToolbar() {
  const t = useTranslations("visualization");
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [debounceTimer, setDebounceTimer] = useState<NodeJS.Timeout | null>(
    null
  );

  const setSmiles = useVisualizationStore((s) => s.setSmilesData);
  const setSdf = useVisualizationStore((s) => s.setSdfData);
  const setViewMode = useVisualizationStore((s) => s.setViewMode);
  const viewMode = useVisualizationStore((s) => s.viewMode);

  // Função para detectar o tipo de busca
  const detectSearchType = (
    query: string
  ): "name" | "formula" | "smiles" | "cid" | "unknown" => {
    const trimmed = query.trim();

    // Se é apenas números, provavelmente é um CID
    if (/^\d+$/.test(trimmed)) {
      return "cid";
    }

    // Se contém caracteres típicos de SMILES (brackets, parênteses, etc.)
    if (/[\[\]()=#@\\\/]/.test(trimmed)) {
      return "smiles";
    }

    // Se contém apenas letras e números (possível fórmula química)
    if (/^[A-Za-z0-9]+$/.test(trimmed)) {
      return "formula";
    }

    // Se contém espaços ou caracteres especiais, provavelmente é nome
    if (/\s/.test(trimmed) || /[^A-Za-z0-9]/.test(trimmed)) {
      return "name";
    }

    return "unknown";
  };

  async function handleSearch(e?: React.FormEvent) {
    e?.preventDefault();
    const q = input.trim();
    if (!q) return;

    setErr(null);
    setLoading(true);

    // Detecta o tipo de busca para analytics
    const searchType = detectSearchType(q);

    try {
      const [smilesRes, sdfRes] = await Promise.allSettled([
        getSmiles(q),
        getSdf(q),
      ]);

      const smiles = smilesRes.status === "fulfilled" ? smilesRes.value : null;
      const sdf = sdfRes.status === "fulfilled" ? sdfRes.value : null;

      setSmiles(smiles);
      setSdf(sdf);

      if (!smiles && !sdf) {
        throw new Error(t("notFound"));
      }

      // Tracking de busca bem-sucedida
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

      // Tracking de busca falhada
      trackMoleculeSearch({
        search_term: q,
        search_type: searchType,
        success: false,
      });
    } finally {
      setLoading(false);
    }
  }

  // Função para limpar o erro quando o usuário interage com o input
  const clearError = () => {
    if (err) {
      setErr(null);
    }
  };

  // Debounce para tracking de digitação (opcional - apenas para analytics de interação)
  useEffect(() => {
    if (debounceTimer) {
      clearTimeout(debounceTimer);
    }

    if (input.trim() !== "") {
      const timer = setTimeout(() => {
        // Tracking de interação com o campo (sem envio da busca)
        trackMoleculeSearch({
          search_term: input.trim(),
          search_type: detectSearchType(input),
          success: false, // Apenas interação, não busca efetiva
        });
      }, 1000); // 1 segundo de debounce para interação
      setDebounceTimer(timer);
    }

    return () => {
      if (debounceTimer) {
        clearTimeout(debounceTimer);
      }
    };
  }, [input, debounceTimer]);

  return (
    <div
      className="relative flex items-center justify-center mt-4 gap-2 max-w-4xl mx-auto px-4 py-2 
        rounded-full border border-zinc-300 dark:border-zinc-600 
        bg-white dark:bg-zinc-900 
        shadow-lg ring-1 ring-zinc-200 dark:ring-zinc-800 
        transition-shadow"
    >
      {/* ⛔️ HIDDEN: Zoom Buttons (ZoomOut/ZoomIn) — keep commented until implemented */}
      {/*
      <div className="flex items-center gap-2">
        <button className="w-8 h-8 flex items-center justify-center rounded hover:bg-zinc-100 dark:hover:bg-zinc-800">
          <ZoomOut className="w-5 h-5" />
        </button>
        <button className="w-8 h-8 flex items-center justify-center rounded hover:bg-zinc-100 dark:hover:bg-zinc-800">
          <ZoomIn className="w-5 h-5" />
        </button>
      </div>
      */}

      {/* 🔎 Search + ViewMode (mantidos) */}
      <form
        onSubmit={handleSearch}
        className="flex items-center gap-2 flex-1 max-w-md"
      >
        {/* 🔎 Input com tratamento correto do erro */}
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

        {/* 🎛️ Toggle 2D / 3D */}
        <button
          type="button"
          onClick={() => setViewMode(viewMode === "2D" ? "3D" : "2D")}
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

        {/* ⛔️ HIDDEN: CH button — keep commented until implemented */}
        {/*
        <button
          className="h-10 w-10 rounded-full flex items-center justify-center text-base font-semibold
            dark:from-zinc-900 dark:to-zinc-800
            shadow-inner dark:shadow-none
            hover:shadow-md hover:bg-zinc-200 dark:hover:bg-zinc-700
            text-zinc-700 dark:text-zinc-300 transition-all"
          title="Toggle CH mode"
        >
          CH
        </button>
        */}
      </form>

      {/* 🚨 Mensagem de erro fora do input */}
      {err && (
        <div
          className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 px-2 py-2 
          bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 text-sm rounded-lg
          border border-red-300 dark:border-red-700 shadow-sm z-10 min-w-58 text-center"
        >
          {err}
        </div>
      )}

      {/* ⛔️ HIDDEN: Trash & Download — keep commented until implemented */}
      {/*
      <div className="flex items-center gap-2">
        <button className="w-8 h-8 flex items-center justify-center rounded hover:bg-zinc-100 dark:hover:bg-zinc-800" title="Clear">
          <Trash2 className="w-5 h-5" />
        </button>
        <button className="w-8 h-8 flex items-center justify-center rounded hover:bg-zinc-100 dark:hover:bg-zinc-800" title="Download">
          <Download className="w-5 h-5" />
        </button>
      </div>
      */}
    </div>
  );
}
