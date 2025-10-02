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
  const [containerReady, setContainerReady] = useState(false);

  const mountedRef = useRef(true);

  const sdfData = useVisualizationStore((s) => s.sdfData);
  const smiles = useVisualizationStore((s) => s.smilesData);
  const setCurrentMolKey = useVisualizationStore((s) => s.setCurrentMolKey);
  const getView3D = useVisualizationStore((s) => s.getView3D);
  const setView3D = useVisualizationStore((s) => s.setView3D);

  // Cleanup ao desmontar
  useEffect(() => {
    mountedRef.current = true;
    const containerElement = containerRef.current;

    return () => {
      mountedRef.current = false;
      if (viewerRef.current) {
        try {
          viewerRef.current.clear?.();
          viewerRef.current = null;
        } catch (e) {
          console.warn("Erro ao limpar viewer 3D:", e);
        }
      }
      if (containerElement) containerElement.innerHTML = "";
    };
  }, []);

  // Aguarda container ter dimensões válidas
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const checkDimensions = () => {
      const rect = el.getBoundingClientRect();
      const computedStyle = window.getComputedStyle(el);
      const width = parseInt(computedStyle.width, 10) || rect.width;
      const height = parseInt(computedStyle.height, 10) || rect.height;

      // Ensure minimum dimensions for WebGL context
      if (width >= 200 && height >= 150) {
        setContainerReady(true);
        return true;
      }
      return false;
    };

    // Tenta imediatamente
    if (checkDimensions()) return;

    // Se falhar, usa ResizeObserver
    const observer = new ResizeObserver(() => {
      if (checkDimensions()) {
        observer.disconnect();
      }
    });

    observer.observe(el);

    // Fallback timeout para casos onde ResizeObserver não funciona
    const timeoutId = setTimeout(() => {
      if (checkDimensions()) {
        observer.disconnect();
      }
    }, 100);

    return () => {
      observer.disconnect();
      clearTimeout(timeoutId);
    };
  }, []);

  // Inicializa viewer (só quando container estiver pronto)
  useEffect(() => {
    if (!containerReady) return;

    let disposed = false;
    const el = containerRef.current;

    async function init() {
      setErr(null);
      try {
        const $3Dmol: ThreeDMolNamespace = await waitFor3Dmol();
        if (disposed || !el || !mountedRef.current) return;

        // Valida dimensões antes de criar viewer com retry
        let attempts = 0;
        const maxAttempts = 5;

        const validateAndCreateViewer = () => {
          const rect = el.getBoundingClientRect();
          const computedStyle = window.getComputedStyle(el);
          const width = parseInt(computedStyle.width, 10) || rect.width;
          const height = parseInt(computedStyle.height, 10) || rect.height;

          if (width < 200 || height < 150) {
            attempts++;
            if (attempts < maxAttempts) {
              setTimeout(validateAndCreateViewer, 50);
              return;
            } else {
              console.warn(
                "Container dimensions still invalid after retries, forcing minimum size"
              );
              // Force minimum dimensions on the container
              el.style.minWidth = "200px";
              el.style.minHeight = "150px";
            }
          }

          const isDark = document.documentElement.classList.contains("dark");
          const bgColor = isDark ? "#0a0a0a" : "#f4f4f5";

          // Clear any existing content before creating new viewer
          el.innerHTML = "";

          viewerRef.current = $3Dmol.createViewer(el, {
            backgroundColor: bgColor,
            backgroundAlpha: 1,
          });

          if (mountedRef.current) setLibReady(true);
        };

        validateAndCreateViewer();
      } catch (e: unknown) {
        if (!mountedRef.current) return;
        setErr(e instanceof Error ? e.message : "Falha ao inicializar 3D");
        trackMolecule3DError({
          error_type: "library_load_failed",
          error_message:
            e instanceof Error ? e.message : "Failed to init 3D viewer",
        });
      }
    }

    void init();
    return () => {
      disposed = true;
      if (el) el.innerHTML = "";
      viewerRef.current = null;
    };
  }, [containerReady]);

  // Salva visão anterior
  const prevMoleculeRef = useRef<{
    smiles: string | null;
    sdfData: string | null;
  } | null>(null);

  useEffect(() => {
    if (!mountedRef.current) return;
    if (prevMoleculeRef.current && viewerRef.current) {
      const prevKey = getMoleculeKey(
        prevMoleculeRef.current.smiles,
        prevMoleculeRef.current.sdfData
      );
      try {
        const view = viewerRef.current.getView?.();
        if (view) setView3D(prevKey, view);
      } catch {}
    }
    prevMoleculeRef.current = { smiles, sdfData };
  }, [smiles, sdfData, setView3D]);

  // Atualiza modelo
  useEffect(() => {
    if (!mountedRef.current) return;

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
        if (mountedRef.current) setErr(null);

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
          setErr("Não foi possível renderizar o modelo 3D (SDF inválido?).");
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

  // Interações do usuário
  useEffect(() => {
    if (!mountedRef.current) return;

    const el = containerRef.current;
    const v = viewerRef.current;
    if (!el || !v || !libReady) return;

    const save = () => {
      if (!mountedRef.current) return;
      const key = getMoleculeKey(smiles ?? null, sdfData ?? null);
      try {
        const view = v.getView?.();
        if (view) setView3D(key, view);
      } catch {}
    };

    const trackInteraction = (
      interactionType: "zoom" | "rotate",
      source: "mouse" | "touch" | "wheel" = "mouse"
    ) => {
      if (!mountedRef.current) return;
      const moleculeName = getMoleculeKey(smiles ?? null, sdfData ?? null);

      let interactionValue: string | undefined;
      switch (interactionType) {
        case "zoom":
          interactionValue = source === "wheel" ? "wheel_scroll" : "pinch_zoom";
          break;
        case "rotate":
          interactionValue = source === "mouse" ? "mouse_drag" : "touch_rotate";
          break;
        default:
          interactionValue = source;
      }

      trackMolecule3DInteraction({
        molecule_name: moleculeName,
        interaction_type: interactionType,
        interaction_value: interactionValue,
      });
    };

    const handleMouseUp = () => {
      save();
      trackInteraction("rotate", "mouse");
    };

    const handleWheel = () => {
      save();
      trackInteraction("zoom", "wheel");
    };

    const handleTouchEnd = () => {
      save();
      trackInteraction("rotate", "touch");
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

  // Tema dinâmico
  useEffect(() => {
    if (!libReady || !mountedRef.current) return;

    const html = document.documentElement;
    const updateTheme = () => {
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

    return () => obs.disconnect();
  }, [libReady]);

  useEffect(() => {
    if (!mountedRef.current) return;
    setCurrentMolKey(getMoleculeKey(smiles ?? null, sdfData ?? null));
  }, [smiles, sdfData, setCurrentMolKey]);

  return (
    <div className="absolute inset-0 min-h-0">
      <div
        ref={containerRef}
        className="w-full h-full"
        style={{ position: "relative", overflow: "hidden", minHeight: "200px" }}
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
