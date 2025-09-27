// src/features/visualization/components/MoleculeViewer3D.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { useVisualizationStore } from "../store/visualizationStore";
import { waitFor3Dmol } from "../utils/waitFor3Dmol";
import type { ThreeDMolViewer, ThreeDMolNamespace } from "../types/3dmol";
import { getMoleculeKey } from "../utils/moleculeKey";
import {
  trackMolecule3DView,
  trackMolecule3DError,
  trackMolecule3DInteraction,
} from "../events/molecule3DEvents";

export function MoleculeViewer3D() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const viewerRef = useRef<ThreeDMolViewer | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const [libReady, setLibReady] = useState(false);

  // ✅ CORREÇÃO: Ref para rastrear se o componente foi desmontado
  const mountedRef = useRef(true);

  const sdfData = useVisualizationStore((s) => s.sdfData);
  const smiles = useVisualizationStore((s) => s.smilesData);
  const setCurrentMolKey = useVisualizationStore((s) => s.setCurrentMolKey);
  const getView3D = useVisualizationStore((s) => s.getView3D);
  const setView3D = useVisualizationStore((s) => s.setView3D);

  // ✅ CORREÇÃO: Cleanup ao desmontar componente
  useEffect(() => {
    mountedRef.current = true;

    // Captura a referência atual para usar no cleanup
    const containerElement = containerRef.current;

    return () => {
      mountedRef.current = false;
      // Força limpeza do viewer
      if (viewerRef.current) {
        try {
          viewerRef.current.clear?.();
          viewerRef.current = null;
        } catch (e) {
          console.warn("Erro ao limpar viewer 3D:", e);
        }
      }

      // Limpa container usando a variável capturada
      if (containerElement) {
        containerElement.innerHTML = "";
      }
    };
  }, []);

  // 🟢 Inicializa visualizador apenas uma vez
  useEffect(() => {
    let disposed = false;
    const el = containerRef.current;

    async function init() {
      setErr(null);
      try {
        const $3Dmol: ThreeDMolNamespace = await waitFor3Dmol();

        // ✅ CORREÇÃO: Verifica se ainda está montado
        if (disposed || !el || !mountedRef.current) return;

        const isDark = document.documentElement.classList.contains("dark");
        const bgColor = isDark ? "#0a0a0a" : "#f4f4f5";

        viewerRef.current = $3Dmol.createViewer(el, {
          backgroundColor: bgColor,
          backgroundAlpha: 1,
        });

        // ✅ CORREÇÃO: Só marca como ready se ainda estiver montado
        if (mountedRef.current) {
          setLibReady(true);
        }
      } catch (e: unknown) {
        if (!mountedRef.current) return; // Ignora erros se desmontado

        setErr(
          e instanceof Error
            ? e.message
            : "Falha ao inicializar o visualizador 3D."
        );

        trackMolecule3DError({
          error_type: "library_load_failed",
          error_message:
            e instanceof Error ? e.message : "Failed to initialize 3D viewer",
        });
      }
    }

    void init();

    return () => {
      disposed = true;
      if (el) el.innerHTML = "";
      viewerRef.current = null;
    };
  }, []);

  // 🟢 Salva visão da molécula anterior antes de trocar
  const prevMoleculeRef = useRef<{
    smiles: string | null;
    sdfData: string | null;
  } | null>(null);

  useEffect(() => {
    if (!mountedRef.current) return; // ✅ CORREÇÃO: Só executa se montado

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
    if (!mountedRef.current) return; // ✅ CORREÇÃO: Só executa se montado

    async function updateModel() {
      if (!viewerRef.current || !libReady || !sdfData || !mountedRef.current)
        return;

      const startTime = performance.now();
      const moleculeName = getMoleculeKey(smiles ?? null, sdfData ?? null);

      try {
        const v = viewerRef.current;
        v.clear();
        v.addModel(sdfData, "sdf");
        v.setStyle({}, { stick: { radius: 0.15 }, sphere: { radius: 0.4 } });

        const key = getMoleculeKey(smiles ?? null, sdfData ?? null);
        const saved = getView3D(key);
        if (saved) {
          v.setView(saved);
        } else {
          v.zoomTo();
          trackMolecule3DInteraction({
            molecule_name: moleculeName,
            interaction_type: "reset_view",
            interaction_value: "auto_zoom",
          });
        }

        v.render();

        // ✅ CORREÇÃO: Só limpa erro se ainda estiver montado
        if (mountedRef.current) {
          setErr(null);
        }

        const renderTime = performance.now() - startTime;
        trackMolecule3DView({
          molecule_name: moleculeName,
          render_time: Math.round(renderTime),
          view_style: "stick_sphere",
          success: true,
        });
      } catch (e) {
        console.error("Erro ao renderizar modelo 3D:", e);

        if (mountedRef.current) {
          const errorMessage =
            "Não foi possível renderizar o modelo 3D (SDF inválido?).";
          setErr(errorMessage);

          trackMolecule3DError({
            molecule_name: moleculeName,
            error_type: "render_failed",
            error_message:
              e instanceof Error ? e.message : "Unknown render error",
          });
        }
      }
    }

    void updateModel();
  }, [sdfData, libReady, smiles, getView3D]);

  // 🟠 Salva visão após interações do usuário
  useEffect(() => {
    if (!mountedRef.current) return; // ✅ CORREÇÃO: Só executa se montado

    const el = containerRef.current;
    const v = viewerRef.current;
    if (!el || !v || !libReady) return;

    const save = () => {
      if (!mountedRef.current) return; // ✅ CORREÇÃO: Verifica antes de salvar

      const key = getMoleculeKey(smiles ?? null, sdfData ?? null);
      try {
        const view = v.getView?.();
        if (view) setView3D(key, view);
      } catch {
        // ignora
      }
    };

    const trackInteraction = (interactionType: "zoom" | "rotate") => {
      if (!mountedRef.current) return; // ✅ CORREÇÃO: Verifica antes de trackear

      const moleculeName = getMoleculeKey(smiles ?? null, sdfData ?? null);
      trackMolecule3DInteraction({
        molecule_name: moleculeName,
        interaction_type: interactionType,
      });
    };

    const handleMouseUp = () => {
      save();
      trackInteraction("rotate");
    };

    const handleWheel = () => {
      save();
      trackInteraction("zoom");
    };

    const handleTouchEnd = () => {
      save();
      trackInteraction("rotate");
    };

    el.addEventListener("mouseup", handleMouseUp, true);
    el.addEventListener("wheel", handleWheel, {
      capture: true,
      passive: true,
    } as unknown as AddEventListenerOptions);
    el.addEventListener("touchend", handleTouchEnd, true);

    return () => {
      // ✅ CORREÇÃO: Sempre remove listeners no cleanup
      el.removeEventListener("mouseup", handleMouseUp, true);
      el.removeEventListener("wheel", handleWheel, true);
      el.removeEventListener("touchend", handleTouchEnd, true);
    };
  }, [smiles, sdfData, setView3D, libReady]);

  // ✅ CORREÇÃO: MutationObserver com cleanup forçado
  useEffect(() => {
    if (!libReady || !mountedRef.current) return;

    const html = document.documentElement;
    const updateTheme = () => {
      // ✅ CORREÇÃO: Verifica se ainda está montado antes de executar
      if (!mountedRef.current) return;

      const v = viewerRef.current;
      if (!v) return;

      const isDark = html.classList.contains("dark");
      const bgColor = isDark ? "#0a0a0a" : "#f4f4f5";
      v.setBackgroundColor(bgColor);
      v.render();
    };

    updateTheme();

    const obs = new MutationObserver(updateTheme);
    obs.observe(html, { attributes: true, attributeFilter: ["class"] });

    return () => {
      obs.disconnect();
    };
  }, [libReady]);

  // Atualiza chave atual da molécula
  useEffect(() => {
    if (!mountedRef.current) return; // ✅ CORREÇÃO: Só executa se montado

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
