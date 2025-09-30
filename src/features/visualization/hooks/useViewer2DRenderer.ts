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
  cleanStereochemistryLabels, // 🔥 ADICIONAR
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

// Função para normalizar SVG e remover labels de estereoquímica
function normalizeMoleculeSVG(svgString: string): string {
  return svgString
    .replace(/stroke-width="[\d.]+"/g, 'stroke-width="1.5"')
    .replace(/font-size="[\d.]+"/g, 'font-size="16"')
    .replace(/letter-spacing="[\d.-]+"/g, '')
    .replace(
      '<svg',
      '<svg shape-rendering="geometricPrecision" text-rendering="geometricPrecision"'
    )
    .replace(/font-family="[^"]*"/g, 'font-family="Arial, Helvetica, sans-serif"')
    .replace(/<text([^>]*)>\s+/g, '<text$1>')
    .replace(/\s+<\/text>/g, '</text>')
    // Remove labels "abs", "rac", "and", "or" que ainda passam
    .replace(/<text[^>]*>\s*(abs|rac|and|or|AND|OR)\s*<\/text>/gi, '')
    // Remove textos vermelhos (estereoquímica)
    .replace(/<text[^>]*fill="#[fF]{2}0{4}"[^>]*>.*?<\/text>/g, '')
    // Remove textos italic vermelhos
    .replace(/<text[^>]*font-style="italic"[^>]*fill="#[fF]{2}0{4}"[^>]*>.*?<\/text>/g, '');
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

        // Prepara molécula com coordenadas 2D otimizadas
        try {
          // ORDEM CORRETA: Adiciona hidrogênios ANTES de gerar coordenadas
          mol.addImplicitHydrogens?.();
          
          // Força geração de coordenadas 2D limpas
          if (mol.getAllAtoms() > 0) {
            mol.inventCoordinates();
          }
          
          mol.ensureHelperArrays?.(OCL.Molecule?.cHelperNeighbours ?? 0);
        } catch (error) {
          console.warn("⚠️ Erro ao preparar molécula:", error);
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

        // Gera SVG com opções balanceadas: cunhas visuais SIM, labels de texto NÃO
        const rawSvg = (
          mol as unknown as {
            toSVG: (w: number, h: number, opts?: unknown) => string;
          }
        ).toSVG(w, h, {
          autoCrop: true,
          autoCropMargin: SVG_MARGIN,
          suppressChiralText: true, // Remove textos R/S (mantém cunhas visuais)
          suppressESR: true, // Remove labels "abs", "rac", "and", "or"
          suppressCIPParity: true, // Remove paridade CIP em texto
          fontWeight: "normal",
          strokeWidth: 1.5,
          noStereoProblem: true, // Não marca problemas de estereoquímica
          showSymmetrySimple: true,
          noImplicitAtomLabelColors: false,
          showAtomNumber: false,
          showBondNumber: false,
        });

        // Normaliza o SVG antes de processar
        const normalizedSvg = normalizeMoleculeSVG(rawSvg);

        // Remove labels CIP e nomes remanescentes
        const svgWithoutCIP = removeCIPLabelsAndNames(normalizedSvg);

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
        if (svgEl) {
          applyThemeToSVG(svgEl, mode);
          cleanStereochemistryLabels(svgEl); // 🔥 NOVA LINHA: Limpeza pós-renderização
        }

        // Centraliza molécula automaticamente
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
        console.error("❌ Erro durante a renderização:", error);
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

  // Observa mudanças de tema e reaplica estilos
  useEffect(() => {
    if (!ready) return;

    const html = document.documentElement;
    const updateTheme = () => {
      const svgEl = svgElRef.current;
      if (!svgEl) return;
      
      const mode: "dark" | "light" = html.classList.contains("dark") ? "dark" : "light";
      applyThemeToSVG(svgEl, mode);
      cleanStereochemistryLabels(svgEl); // 🔥 NOVA LINHA: Limpeza pós-renderização
    };

    updateTheme();

    const observer = new MutationObserver(updateTheme);
    observer.observe(html, { attributes: true, attributeFilter: ["class"] });
    
    return () => observer.disconnect();
  }, [ready, svgElRef]);

  return { ready };
}