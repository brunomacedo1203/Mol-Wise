// src/features/visualization/components/MoleculeViewer3D.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { useVisualizationStore } from "../store/visualizationStore";
import { waitFor3Dmol } from "../utils/waitFor3Dmol";
import type { ThreeDMolViewer, ThreeDMolNamespace } from "../types/3dmol";
import { getMoleculeKey } from "../utils/moleculeKey";

export function MoleculeViewer3D() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const viewerRef = useRef<ThreeDMolViewer | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const [libReady, setLibReady] = useState(false);

  const sdfData = useVisualizationStore((s) => s.sdfData);
  const smiles = useVisualizationStore((s) => s.smilesData);
  const setCurrentMolKey = useVisualizationStore((s) => s.setCurrentMolKey);
  const getView3D = useVisualizationStore((s) => s.getView3D);
  const setView3D = useVisualizationStore((s) => s.setView3D);

  // 🟢 CORREÇÃO: Inicializa visualizador apenas uma vez (sem smiles/sdfData)
  useEffect(() => {
    let disposed = false;
    const el = containerRef.current;

    async function init() {
      setErr(null);
      try {
        const $3Dmol: ThreeDMolNamespace = await waitFor3Dmol();
        if (disposed || !el) return;

        // Detecta tema atual
        const isDark = document.documentElement.classList.contains("dark");
        const bgColor = isDark ? "#0a0a0a" : "#f4f4f5"; // zinc-100 para tema claro

        viewerRef.current = $3Dmol.createViewer(el, {
          backgroundColor: bgColor,
          backgroundAlpha: 1, // Opaco para manter consistência visual
        });
        setLibReady(true);
      } catch (e: unknown) {
        setErr(
          e instanceof Error
            ? e.message
            : "Falha ao inicializar o visualizador 3D."
        );
      }
    }

    void init();
    return () => {
      disposed = true;
      if (el) el.innerHTML = "";
      viewerRef.current = null;
    };
  }, []); // ✅ SEM dependências - inicializa apenas uma vez

  // 🟢 CORREÇÃO: Salva visão da molécula anterior antes de trocar
  const prevMoleculeRef = useRef<{
    smiles: string | null;
    sdfData: string | null;
  } | null>(null);

  useEffect(() => {
    // Salva visão da molécula anterior
    if (prevMoleculeRef.current && viewerRef.current) {
      const prevKey = getMoleculeKey(
        prevMoleculeRef.current.smiles,
        prevMoleculeRef.current.sdfData
      );
      try {
        const view = viewerRef.current.getView?.();
        if (view) setView3D(prevKey, view);
      } catch {
        // ignora
      }
    }

    // Atualiza referência da molécula atual
    prevMoleculeRef.current = { smiles, sdfData };
  }, [smiles, sdfData, setView3D]);

  // Atualiza modelo quando dados mudam
  useEffect(() => {
    async function updateModel() {
      if (!viewerRef.current || !libReady || !sdfData) return;

      try {
        const v = viewerRef.current;
        v.clear();
        v.addModel(sdfData, "sdf");
        v.setStyle({}, { stick: { radius: 0.15 }, sphere: { radius: 0.4 } });

        // 🟢 Restaura visão ou aplica zoom padrão
        const key = getMoleculeKey(smiles ?? null, sdfData ?? null);
        const saved = getView3D(key);
        if (saved) {
          v.setView(saved);
        } else {
          v.zoomTo();
        }

        v.render();
        setErr(null); // 🟢 Limpa erros anteriores
      } catch (e) {
        console.error("Erro ao renderizar modelo 3D:", e);
        setErr("Não foi possível renderizar o modelo 3D (SDF inválido?).");
      }
    }

    void updateModel();
  }, [sdfData, libReady, smiles, getView3D]);

  // 🟠 Salva visão após interações do usuário
  useEffect(() => {
    const el = containerRef.current;
    const v = viewerRef.current;
    if (!el || !v || !libReady) return; // 🟢 Adiciona verificação libReady

    const save = () => {
      const key = getMoleculeKey(smiles ?? null, sdfData ?? null);
      try {
        const view = v.getView?.();
        if (view) setView3D(key, view);
      } catch {
        // ignora
      }
    };

    el.addEventListener("mouseup", save, true);
    el.addEventListener("wheel", save, {
      capture: true,
      passive: true,
    } as unknown as AddEventListenerOptions);
    el.addEventListener("touchend", save, true);

    return () => {
      el.removeEventListener("mouseup", save, true);
      el.removeEventListener("wheel", save, true);
      el.removeEventListener("touchend", save, true);
    };
  }, [smiles, sdfData, setView3D, libReady]);

  // Ajusta tema automaticamente
  useEffect(() => {
    if (!libReady) return; // 🟢 Só executa quando viewer estiver pronto

    const html = document.documentElement;
    const updateTheme = () => {
      const v = viewerRef.current;
      if (!v) return;
      const isDark = html.classList.contains("dark");
      // Usa zinc-100 (#f4f4f5) para tema claro ao invés de branco puro
      const bgColor = isDark ? "#0a0a0a" : "#f4f4f5";
      v.setBackgroundColor(bgColor);
      v.render();
    };

    // Aplica tema inicial
    updateTheme();

    const obs = new MutationObserver(updateTheme);
    obs.observe(html, { attributes: true, attributeFilter: ["class"] });
    return () => obs.disconnect();
  }, [libReady]);

  // Atualiza chave atual da molécula
  useEffect(() => {
    setCurrentMolKey(getMoleculeKey(smiles ?? null, sdfData ?? null));
  }, [smiles, sdfData, setCurrentMolKey]);

  return (
    <div className="absolute inset-0 min-h-0">
      <div
        ref={containerRef}
        className="w-full h-full"
        style={{ position: "relative", overflow: "hidden" }}
      />
      {!libReady && !err && (
        <p className="absolute bottom-2 left-3 text-sm text-zinc-500 dark:text-zinc-400 pointer-events-none">
          Carregando visualizador 3D...
        </p>
      )}
      {err && (
        <p className="absolute bottom-2 left-3 text-sm text-red-600 pointer-events-none">
          {err}
        </p>
      )}
    </div>
  );
}
