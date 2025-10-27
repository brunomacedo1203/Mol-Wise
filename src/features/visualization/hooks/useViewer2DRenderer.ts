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
  cleanStereochemistryLabels,
} from "../utils/svgUtils";
import { normalizeMolecule } from "../utils/moleculeNormalization";
import { centerViewBox } from "../utils/viewBoxUtils";
import { getElementSize } from "../utils/elementSize";
import {
  MIN_CANVAS_WIDTH,
  MIN_CANVAS_HEIGHT,
  SVG_MARGIN,
} from "../constants/viewer2d.constants";
import { getMoleculeKey } from "../utils/moleculeKey";
import {
  trackMolecule2DView,
  trackMolecule2DLoad,
  trackMolecule2DError,
} from "../events/molecule2DEvents";

interface UseViewer2DRendererProps {
  svgHostRef: React.MutableRefObject<HTMLDivElement | null>;
  svgElRef: React.MutableRefObject<SVGSVGElement | null>;
  vbRef: React.MutableRefObject<ViewBox | null>;
  vbInitialRef: React.MutableRefObject<ViewBox | null>;
  contentBoundsRef: React.MutableRefObject<ViewBox | null>;
  sdf: string | null;
  smiles: string | null;
}


// Normalizador de SVG (ajustes visuais básicos)
function normalizeMoleculeSVG(svgString: string): string {
  return svgString
    .replace(/stroke-width="[\d.]+"/g, 'stroke-width="1.5"')
    .replace(/font-size="[\d.]+"/g, 'font-size="16"')
    .replace(/letter-spacing="[\d.-]+"/g, "")
    .replace(
      "<svg",
      '<svg shape-rendering="geometricPrecision" text-rendering="geometricPrecision"'
    )
    .replace(
      /font-family="[^"]*"/g,
      'font-family="Arial, Helvetica, sans-serif"'
    )
    .replace(/<text([^>]*)>\s+/g, "<text$1>")
    .replace(/\s+<\/text>/g, "</text>")
    .replace(/<text[^>]*>\s*(abs|rac|and|or|AND|OR)\s*<\/text>/gi, "")
    .replace(
      /<text[^>]*fill="#[fF]{2}0{4}"[^>]*>.*?<\/text>/g,
      ""
    )
    .replace(
      /<text[^>]*font-style="italic"[^>]*fill="#[fF]{2}0{4}"[^>]*>.*?<\/text>/g,
      ""
    );
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
  const lastRenderedRef = useRef<string | null>(null);
  const hasTrackedViewRef = useRef<Set<string>>(new Set());
  const retryCountRef = useRef(0);

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

  useEffect(() => {
    let isRendering = false;
    let isMounted = true;
    let resizeTimeoutId: NodeJS.Timeout | null = null;

    async function render() {
      if (!isMounted) return;

      const host = svgHostRef.current;
      const OCL = oclRef.current;
      if (!host || !OCL || !ready || isRendering) return;

      const moleculeName = getMoleculeKey(smiles, sdf);

      if (lastRenderedRef.current === moleculeName) {
        return;
      }

      isRendering = true;
      lastRenderedRef.current = moleculeName;

      const startTime = performance.now();
      let dataSource: "smiles" | "sdf" | "molfile" | undefined;

      try {
        let mol: import("openchemlib").Molecule | null = null;

        if (sdf) {
          try {
            mol = OCL.Molecule.fromMolfile(sdf);
            dataSource = "sdf";
          } catch (error) {
            console.error("❌ Erro ao processar SDF:", error);
            trackMolecule2DError({
              molecule_name: moleculeName,
              error_type: "data_invalid",
              error_message: `SDF parsing failed: ${
                error instanceof Error ? error.message : "Unknown error"
              }`,
            });
          }
        }

        if (!mol && smiles) {
          try {
            mol = OCL.Molecule.fromSmiles(smiles);
            dataSource = "smiles";
          } catch (error) {
            console.error("❌ Erro ao processar SMILES:", error);
            trackMolecule2DError({
              molecule_name: moleculeName,
              error_type: "data_invalid",
              error_message: `SMILES parsing failed: ${
                error instanceof Error ? error.message : "Unknown error"
              }`,
            });
          }
        }

        if (!mol) {
          host.innerHTML = "";
          svgElRef.current = null;
          vbRef.current = null;
          vbInitialRef.current = null;
          contentBoundsRef.current = null;

          trackMolecule2DLoad({
            molecule_name: moleculeName,
            success: false,
            data_source: dataSource,
          });
          return;
        }

        normalizeMolecule(mol, OCL);

        // ✅ FORÇA exibição de hidrogênios explícitos APENAS para moléculas muito pequenas
        mol.ensureHelperArrays(OCL.Molecule.cHelperNeighbours);
        
        // Conta átomos pesados (não-hidrogênio)
        let heavyAtomCount = 0;
        for (let i = 0; i < mol.getAllAtoms(); i++) {
          if (mol.getAtomicNo(i) > 1) {
            heavyAtomCount++;
          }
        }
        
        // 🔧 Corrige geometria 2D para moléculas pequenas
        // Só adiciona hidrogênios explícitos se a molécula tiver 4 ou menos átomos pesados
        // Isso cobre H2O, NH3, CH4, etc.
        if (heavyAtomCount <= 4) {
          try {
            mol.addImplicitHydrogens();
            const molOps = mol as unknown as {
              addMissingChirality?: () => void;
              clean?: (mode: number, coords: null) => void;
            };
            molOps.addMissingChirality?.();
            molOps.clean?.(2, null); // reorganiza coordenadas
          } catch (e) {
            console.warn("Ajuste de geometria falhou:", e);
          }
        }

        // Determina se a molécula deve receber ajustes específicos
        const isSmallMolecule = heavyAtomCount <= 4;

        let { width: rectWidth, height: rectHeight } = getElementSize(host);
        const prevWidthStyle = host.style.width;
        const prevHeightStyle = host.style.height;
        
        // ✅ CRITICAL: Se dimensões são inválidas, aguarda estabilização
        if (rectWidth < MIN_CANVAS_WIDTH || rectHeight < MIN_CANVAS_HEIGHT) {
          // Força dimensões mínimas e usa fallback imediatamente
          host.style.minWidth = `${MIN_CANVAS_WIDTH}px`;
          host.style.minHeight = `${MIN_CANVAS_HEIGHT}px`;
          rectWidth = Math.max(rectWidth, MIN_CANVAS_WIDTH);
          rectHeight = Math.max(rectHeight, MIN_CANVAS_HEIGHT);
          retryCountRef.current = 0;
        }
        
        const w = Math.floor(rectWidth);
        const h = Math.floor(rectHeight);

        const rawSvg = (
          mol as unknown as {
            toSVG: (w: number, h: number, opts?: unknown) => string;
          }
        ).toSVG(w, h, {
          autoCrop: !isSmallMolecule, // ❌ desativa crop para pequenas
          autoCropMargin: isSmallMolecule ? 0 : SVG_MARGIN,
          suppressChiralText: true,
          suppressESR: true,
          suppressCIPParity: true,
          fontWeight: "normal",
          strokeWidth: 1.5,
          noStereoProblem: true,
          showSymmetrySimple: false,
          noImplicitAtomLabelColors: true,
          showAtomNumber: false,
          showBondNumber: false,
          showAtomLabels: true,
          showAtomMappingNo: false,
          showAtomMass: false,
          showAtomCharge: true,
          showBonds: true,
          inflateToMaxAVBL: isSmallMolecule ? 3.0 : 2.0, // ✅ maior espaçamento para evitar sobreposição
          noImplicitHydrogen: false,
        });

        const normalizedSvg = normalizeMoleculeSVG(rawSvg);
        const svgWithoutCIP = removeCIPLabelsAndNames(normalizedSvg);
        const initialFramed = tightenViewBox(
          svgWithoutCIP,
          INITIAL_SCALE,
          INITIAL_Y_OFFSET_PX
        );

        const svgWithStyle = initialFramed
          .replace("<svg", `<svg preserveAspectRatio="${PRESERVE_RATIO}"`)
          .replace(
            "<svg",
            '<svg style="width:100%;height:100%;display:block;cursor:grab;touch-action:none;"'
          );

        // Durante render, garante que o host tenha dimensões explícitas
        host.style.width = `${w}px`;
        host.style.height = `${h}px`;
        host.innerHTML = svgWithStyle;

        const svgEl = host.querySelector("svg") as SVGSVGElement | null;
        svgElRef.current = svgEl;

        const mode: "dark" | "light" = document.documentElement.classList.contains(
          "dark"
        )
          ? "dark"
          : "light";
        if (svgEl) {
          applyThemeToSVG(svgEl, mode);
          cleanStereochemistryLabels(svgEl);
        }

        if (svgEl) {
          const bounds = getContentBounds(svgEl);
          if (bounds) {
            contentBoundsRef.current = bounds;

            const newViewBox = centerViewBox(
              svgEl,
              bounds,
              w,
              h
            );

            vbRef.current = newViewBox;
            vbInitialRef.current = newViewBox;
          }
        }

        const renderTime = performance.now() - startTime;
        trackMolecule2DLoad({
          molecule_name: moleculeName,
          load_time: Math.round(renderTime),
          data_source: dataSource,
          success: true,
        });
        // Reset contagem e limpa estilos temporários
        retryCountRef.current = 0;
        host.style.width = prevWidthStyle;
        host.style.height = prevHeightStyle;

        if (!hasTrackedViewRef.current.has(moleculeName)) {
          hasTrackedViewRef.current.add(moleculeName);
          trackMolecule2DView({
            molecule_name: moleculeName,
            render_time: Math.round(renderTime),
            view_style: "2d_structure",
            success: true,
          });
        }
      } catch (error) {
        console.error("❌ Erro durante a renderização:", error);

        const renderTime = performance.now() - startTime;
        trackMolecule2DError({
          molecule_name: moleculeName,
          error_type: "render_failed",
          error_message:
            error instanceof Error ? error.message : "Unknown render error",
        });

        trackMolecule2DLoad({
          molecule_name: moleculeName,
          load_time: Math.round(renderTime),
          data_source: dataSource,
          success: false,
        });
      } finally {
        isRendering = false;
      }
    }

    if (sdf?.trim() || smiles?.trim()) {
      void render();
    }

    return () => {
      isMounted = false;
      isRendering = false;
      
      // ✅ Limpa timeout de redimensionamento se existir
      if (resizeTimeoutId) {
        clearTimeout(resizeTimeoutId);
        resizeTimeoutId = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sdf, smiles, ready]);

  useEffect(() => {
    if (!ready) return;

    const html = document.documentElement;
    const updateTheme = () => {
      const svgEl = svgElRef.current;
      if (!svgEl) return;

      const mode: "dark" | "light" = html.classList.contains("dark")
        ? "dark"
        : "light";
      applyThemeToSVG(svgEl, mode);
      cleanStereochemistryLabels(svgEl);
    };

    updateTheme();

    const observer = new MutationObserver(updateTheme);
    observer.observe(html, { attributes: true, attributeFilter: ["class"] });

    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready]);

  return { ready };
}
