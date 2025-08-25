import { useEffect, useRef, useState } from "react";
import { ViewBox, OpenChemLibModule, INITIAL_SCALE, INITIAL_Y_OFFSET_PX, PRESERVE_RATIO } from "../types/viewer2d.types";
import { tightenViewBox, removeCIPLabelsAndNames, getContentBounds, applyThemeToSVG } from "../utils/svgUtils";
import { readViewBox } from "../utils/viewBoxUtils";
import {
  CONTENT_BOUNDS_DELAY,
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

  // Carrega OpenChemLib
  useEffect(() => {
    let disposed = false;
    (async () => {
      try {
        console.log("🔄 Iniciando carregamento do OpenChemLib...");
        const mod: OpenChemLibModule = await import("openchemlib");
        const OCL: OpenChemLibModule =
          (mod as unknown as { default?: OpenChemLibModule }).default ?? mod;
        if (disposed) return;
        oclRef.current = OCL;
        console.log("✅ OpenChemLib carregado com sucesso:", { hasOCL: !!OCL });
        setReady(true);
      } catch (error) {
        console.error("❌ Erro ao carregar OpenChemLib:", { error, userAgent: navigator.userAgent, isProduction: process.env.NODE_ENV === 'production' });
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

        // Tenta carregar a partir do SDF primeiro
        if (sdf) {
          try {
            mol = OCL.Molecule.fromMolfile(sdf);
            console.log("✅ SDF processado com sucesso para:", { sdf: sdf.substring(0, 50) + '...' });
          } catch (error) {
            console.error("❌ Erro ao processar SDF:", { error, sdf: sdf.substring(0, 100) });
          }
        }
        
        // Fallback para SMILES
        if (!mol && smiles) {
          try {
            mol = OCL.Molecule.fromSmiles(smiles);
            console.log("✅ SMILES processado com sucesso:", { smiles });
          } catch (error) {
            console.error("❌ Erro ao processar SMILES:", { error, smiles });
          }
        }

        // Se não conseguiu carregar nenhuma molécula, limpa o host
        if (!mol) {
          console.error("❌ Falha ao carregar molécula:", { sdf: sdf?.substring(0, 50), smiles });
          host.innerHTML = "";
          svgElRef.current = null;
          vbRef.current = null;
          vbInitialRef.current = null;
          contentBoundsRef.current = null;
          return;
        }

        // Processa a molécula
        try {
          mol.addImplicitHydrogens?.();
        } catch (error) {
          console.warn("Erro ao adicionar hidrogênios implícitos:", error);
        }
        
        try {
          mol.ensureHelperArrays?.(OCL.Molecule?.cHelperNeighbours ?? 0);
        } catch (error) {
          console.warn("Erro ao garantir arrays auxiliares:", error);
        }

        // Calcula dimensões do canvas
        const rect = host.getBoundingClientRect();
        const w = Math.max(MIN_CANVAS_WIDTH, Math.floor(rect.width || DEFAULT_CANVAS_WIDTH));
        const h = Math.max(MIN_CANVAS_HEIGHT, Math.floor(rect.height || DEFAULT_CANVAS_HEIGHT));

        // Gera SVG
        let rawSvg: string;
        try {
          rawSvg = (
            mol as unknown as {
              toSVG: (w: number, h: number, opts?: unknown) => string;
            }
          ).toSVG(w, h, { autoCrop: true, margin: SVG_MARGIN });
          console.log("✅ SVG gerado com sucesso:", { width: w, height: h, svgLength: rawSvg.length });
        } catch (error) {
          console.error("❌ Erro ao gerar SVG:", { error, width: w, height: h, smiles, sdf: sdf?.substring(0, 50) });
          throw error;
        }

        // Remove os rótulos CIP (R/S) e nomes de compostos do SVG
        const svgWithoutCIP = removeCIPLabelsAndNames(rawSvg);

        // Aplica enquadramento inicial
        const initialFramed = tightenViewBox(
          svgWithoutCIP,
          INITIAL_SCALE,
          INITIAL_Y_OFFSET_PX
        );

        // Adiciona estilos e atributos ao SVG
        const svgWithStyle = initialFramed
          .replace("<svg", `<svg preserveAspectRatio="${PRESERVE_RATIO}"`)
          .replace(
            "<svg",
            '<svg style="width:100%;height:100%;display:block;cursor:grab;touch-action:none;"'
          );

        // Insere o SVG no host
        host.innerHTML = svgWithStyle;

        // Obtém referência do elemento SVG
        const svgEl = host.querySelector("svg") as SVGSVGElement | null;
        svgElRef.current = svgEl;

        // Aplica tema atual
        const mode: "dark" | "light" =
          document.documentElement.classList.contains("dark")
            ? "dark"
            : "light";
        if (svgEl) applyThemeToSVG(svgEl, mode);

        // Guarda viewBox inicial
        const vb = svgEl ? readViewBox(svgEl) : null;
        if (vb) {
          vbRef.current = { ...vb };
          vbInitialRef.current = { ...vb };
        }

        // Calcula o bounding box real do conteúdo da molécula
        if (svgEl) {
          // Aguarda um pouco para que o SVG seja completamente renderizado
          setTimeout(() => {
            const contentBounds = getContentBounds(svgEl);
            contentBoundsRef.current = contentBounds;
          }, CONTENT_BOUNDS_DELAY);
        }
      } catch (error) {
        console.error("Erro durante a renderização:", error);
      }
    }
    
    void render();
  }, [sdf, smiles, ready, svgHostRef, svgElRef, vbRef, vbInitialRef, contentBoundsRef]);

  // Observa troca de tema e reaplica
  useEffect(() => {
    const html = document.documentElement;
    const obs = new MutationObserver(() => {
      const mode: "dark" | "light" = html.classList.contains("dark")
        ? "dark"
        : "light";
      const svg = svgElRef.current;
      if (svg) applyThemeToSVG(svg, mode);
    });
    obs.observe(html, { attributes: true, attributeFilter: ["class"] });
    return () => obs.disconnect();
  }, [svgElRef]);

  return {
    ready,
  };
}