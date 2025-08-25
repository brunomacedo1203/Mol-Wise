import { useEffect, useRef, useState } from "react";
import {
  ViewBox,
  OpenChemLibModule,
  INITIAL_SCALE,
  INITIAL_Y_OFFSET_PX,
  PRESERVE_RATIO,
} from "../types/viewer2d.types";
import {
  tightenViewBox,
  removeCIPLabelsAndNames,
  getContentBounds,
  applyThemeToSVG,
} from "../utils/svgUtils";
import { centerViewBox } from "../utils/viewBoxUtils";
import {
  MIN_CANVAS_WIDTH,
  MIN_CANVAS_HEIGHT,
  DEFAULT_CANVAS_WIDTH,
  DEFAULT_CANVAS_HEIGHT,
  SVG_MARGIN,
} from "../constants/viewer2d.constants";

interface UseViewer2DRendererProps {
  svgHostRef: React.RefObject<HTMLDivElement | null>;
  svgElRef: React.RefObject<SVGSVGElement | null>;
  vbRef: React.RefObject<ViewBox | null>;
  vbInitialRef: React.RefObject<ViewBox | null>;
  contentBoundsRef: React.RefObject<ViewBox | null>;
  sdf: string | null;
  smiles: string | null;
}

export function useViewer2DRenderer({
  svgHostRef,
  svgElRef,
  vbRef,
  vbInitialRef,
  contentBoundsRef,
  sdf,
  smiles,
}: UseViewer2DRendererProps) {
  const [ready, setReady] = useState(false);
  const oclRef = useRef<OpenChemLibModule | null>(null);

  // Carrega OpenChemLib dinamicamente
  useEffect(() => {
    let disposed = false;
    (async () => {
      try {
        const mod: OpenChemLibModule = await import("openchemlib");
        const OCL: OpenChemLibModule =
          (mod as unknown as { default?: OpenChemLibModule }).default ?? mod;
        if (disposed) return;
        oclRef.current = OCL;
        setReady(true);
      } catch (error) {
        console.error("❌ Erro ao carregar OpenChemLib:", {
          error,
          userAgent: navigator.userAgent,
        });
      }
    })();
    return () => {
      disposed = true;
    };
  }, []);

  // Renderização principal da molécula
  useEffect(() => {
    async function render() {
      const host = svgHostRef.current;
      const OCL = oclRef.current;
      if (!host || !OCL || !ready) return;

      try {
        let mol: import("openchemlib").Molecule | null = null;

        // Tenta carregar a partir do SDF
        if (sdf) {
          try {
            mol = OCL.Molecule.fromMolfile(sdf);
          } catch (error) {
            console.error("❌ Erro ao processar SDF:", error);
          }
        }

        // Fallback para SMILES
        if (!mol && smiles) {
          try {
            mol = OCL.Molecule.fromSmiles(smiles);
          } catch (error) {
            console.error("❌ Erro ao processar SMILES:", error);
          }
        }

        // Caso falhe em carregar a molécula
        if (!mol) {
          host.innerHTML = "";
          svgElRef.current = null;
          vbRef.current = null;
          vbInitialRef.current = null;
          contentBoundsRef.current = null;
          return;
        }

        // Prepara molécula
        try {
          mol.addImplicitHydrogens?.();
          mol.ensureHelperArrays?.(OCL.Molecule?.cHelperNeighbours ?? 0);
        } catch (error) {
          console.warn("Erro ao preparar molécula:", error);
        }

        // Calcula dimensões do canvas
        const rect = host.getBoundingClientRect();
        const w = Math.max(
          MIN_CANVAS_WIDTH,
          Math.floor(rect.width || DEFAULT_CANVAS_WIDTH)
        );
        const h = Math.max(
          MIN_CANVAS_HEIGHT,
          Math.floor(rect.height || DEFAULT_CANVAS_HEIGHT)
        );

        // Gera SVG da molécula
        const rawSvg = (
          mol as unknown as {
            toSVG: (w: number, h: number, opts?: unknown) => string;
          }
        ).toSVG(w, h, { autoCrop: true, margin: SVG_MARGIN });

        // Remove labels CIP e nomes
        const svgWithoutCIP = removeCIPLabelsAndNames(rawSvg);

        // Aplica enquadramento inicial
        const initialFramed = tightenViewBox(
          svgWithoutCIP,
          INITIAL_SCALE,
          INITIAL_Y_OFFSET_PX
        );

        // Aplica estilos no SVG
        const svgWithStyle = initialFramed
          .replace("<svg", `<svg preserveAspectRatio="${PRESERVE_RATIO}"`)
          .replace(
            "<svg",
            '<svg style="width:100%;height:100%;display:block;cursor:grab;touch-action:none;"'
          );

        // Insere SVG no container
        host.innerHTML = svgWithStyle;

        // Obtém referência ao SVG
        const svgEl = host.querySelector("svg") as SVGSVGElement | null;
        svgElRef.current = svgEl;

        // Aplica tema atual
        const mode: "dark" | "light" =
          document.documentElement.classList.contains("dark") ? "dark" : "light";
        if (svgEl) applyThemeToSVG(svgEl, mode);

        // 🔹 Centraliza molécula automaticamente
        if (svgEl) {
          const bounds = getContentBounds(svgEl);
          if (bounds) {
            contentBoundsRef.current = bounds;

            const containerRect = host.getBoundingClientRect();
            const newViewBox = centerViewBox(
              svgEl,
              bounds,
              containerRect.width,
              containerRect.height
            );

            vbRef.current = newViewBox;
            vbInitialRef.current = newViewBox;
          }
        }
      } catch (error) {
        console.error("Erro durante a renderização:", error);
      }
    }

    void render();
  }, [
    sdf,
    smiles,
    ready,
    contentBoundsRef,
    svgElRef,
    svgHostRef,
    vbInitialRef,
    vbRef,
  ]);

  return { ready };
}
