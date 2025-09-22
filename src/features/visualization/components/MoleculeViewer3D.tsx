// src/features/visualization/components/MoleculeViewer3D.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { useVisualizationStore } from "../store/visualizationStore";
import { waitFor3Dmol } from "../utils/waitFor3Dmol";
import type { ThreeDMolViewer, ThreeDMolNamespace } from "../types/3dmol";
import { getMoleculeKey } from "../utils/moleculeKey";
import { trackMolecule3DView, trackMolecule3DError, trackMolecule3DInteraction } from "../events/molecule3DEvents";

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

        // Tracking de erro na inicialização da biblioteca 3D
        trackMolecule3DError({
          error_type: "library_load_failed",
          error_message: e instanceof Error ? e.message : "Failed to initialize 3D viewer",
        });
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

      const startTime = performance.now();
      const moleculeName = getMoleculeKey(smiles ?? null, sdfData ?? null);

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
          // Tracking de reset automático da visão
          trackMolecule3DInteraction({
            molecule_name: moleculeName,
            interaction_type: "reset_view",
            interaction_value: "auto_zoom",
          });
        }

        v.render();
        setErr(null); // 🟢 Limpa erros anteriores

        // Tracking de visualização 3D bem-sucedida
        const renderTime = performance.now() - startTime;
        trackMolecule3DView({
          molecule_name: moleculeName,
          render_time: Math.round(renderTime),
          view_style: "stick_sphere",
          success: true,
        });
      } catch (e) {
        console.error("Erro ao renderizar modelo 3D:", e);
        const errorMessage = "Não foi possível renderizar o modelo 3D (SDF inválido?).";
        setErr(errorMessage);

        // Tracking de erro na visualização 3D
        trackMolecule3DError({
          molecule_name: moleculeName,
          error_type: "render_failed",
          error_message: e instanceof Error ? e.message : "Unknown render error",
        });
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

    // Função para rastrear interações com a molécula 3D
    const trackInteraction = (interactionType: "zoom" | "rotate") => {
      const moleculeName = getMoleculeKey(smiles ?? null, sdfData ?? null);
      trackMolecule3DInteraction({
        molecule_name: moleculeName,
        interaction_type: interactionType,
      });
    };

    // Event listeners com tracking de interações
    const handleMouseUp = () => {
      save();
      trackInteraction("rotate"); // Mouse interactions são principalmente rotação
    };

    const handleWheel = () => {
      save();
      trackInteraction("zoom"); // Wheel é zoom
    };

    const handleTouchEnd = () => {
      save();
      trackInteraction("rotate"); // Touch interactions são principalmente rotação
    };

    el.addEventListener("mouseup", handleMouseUp, true);
    el.addEventListener("wheel", handleWheel, {
      capture: true,
      passive: true,
    } as unknown as AddEventListenerOptions);
    el.addEventListener("touchend", handleTouchEnd, true);

    return () => {
      el.removeEventListener("mouseup", handleMouseUp, true);
      el.removeEventListener("wheel", handleWheel, true);
      el.removeEventListener("touchend", handleTouchEnd, true);
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
