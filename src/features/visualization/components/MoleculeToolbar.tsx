// src/features/visualization/components/MoleculeToolbar.tsx
"use client";

import { useState } from "react";
import { getSmiles, getSdf } from "../utils/pubchemAPI";
import { useVisualizationStore } from "../store/visualizationStore";
import { Search, Loader2 } from "lucide-react"; // 🔁 Removidos ZoomIn, ZoomOut, Trash2, Download
import { useTranslations } from "next-intl";

export function MoleculeToolbar() {
  const t = useTranslations("visualization");
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [showErrorInInput, setShowErrorInInput] = useState(false);

  const setSmiles = useVisualizationStore((s) => s.setSmilesData);
  const setSdf = useVisualizationStore((s) => s.setSdfData);
  const setViewMode = useVisualizationStore((s) => s.setViewMode);
  const viewMode = useVisualizationStore((s) => s.viewMode);

  async function handleSearch(e?: React.FormEvent) {
    e?.preventDefault();
    const q = input.trim();
    if (!q) return;

    setErr(null);
    setShowErrorInInput(false);
    setLoading(true);

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
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : t("error");
      setErr(message);
      setShowErrorInInput(true);
      setSmiles(null);
      setSdf(null);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className="flex items-center justify-center mt-4 gap-2 max-w-4xl mx-auto px-4 py-2 
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
        {/* 🔎 Input com mensagem de erro substituindo o valor */}
        <div className="relative w-full">
          <input
            value={showErrorInInput ? err ?? "" : input}
            onChange={(e) => {
              setInput(e.target.value);
              setShowErrorInInput(false);
              setErr(null);
            }}
            onFocus={() => {
              setShowErrorInInput(false);
              setErr(null);
            }}
            className={`w-full h-10 pl-4 pr-10 rounded-full border text-sm transition-all
              ${
                showErrorInInput
                  ? "border-red-500 text-red-600 placeholder-red-500"
                  : "border-zinc-400 text-zinc-900 dark:text-zinc-100"
              }
              dark:border-zinc-700 bg-white dark:bg-zinc-900
              placeholder:text-zinc-400 dark:placeholder:text-zinc-500
              focus:outline-none focus:ring-2 focus:ring-blue-500`}
            placeholder={
              showErrorInInput ? err ?? t("error") : t("placeholder")
            }
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
