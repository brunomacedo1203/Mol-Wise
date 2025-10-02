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
import { centerViewBox } from "../utils/viewBoxUtils";
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
  svgHostRef: React.RefObject<HTMLDivElement | null>;
  svgElRef: React.RefObject<SVGSVGElement | null>;
  vbRef: React.RefObject<ViewBox | null>;
  vbInitialRef: React.RefObject<ViewBox | null>;
  contentBoundsRef: React.RefObject<ViewBox | null>;
  sdf: string | null;
  smiles: string | null;
}

// 🔧 Corrige ligações duplas "cross" (E/Z indefinida) → duplas normais
function clearUnknownDoubleBondStereo(
  mol: import("openchemlib").Molecule,
  OCL: OpenChemLibModule
): number {
  let patched = 0;
  const bondCount = mol.getAllBonds();

  for (let b = 0; b < bondCount; b++) {
    if (mol.getBondOrder(b) !== 2) continue;

    const isCross =
      (typeof mol.getBondType === "function" &&
        mol.getBondType(b) === OCL.Molecule.cBondTypeCross) ||
      (typeof (mol as import("openchemlib").Molecule).isBondParityUnknownOrNone === "function" &&
        (mol as import("openchemlib").Molecule).isBondParityUnknownOrNone(b));

    if (isCross) {
      mol.setBondParity?.(b, OCL.Molecule.cBondParityNone, false);
      mol.setBondType?.(b, OCL.Molecule.cBondTypeDouble);
      patched++;
    }
  }

  return patched;
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

        try {
          // 🔧 Remove hidrogênios APENAS quando ligados a carbono
          if (typeof mol.removeExplicitHydrogens === "function") {
            const atomCount = mol.getAllAtoms();
            for (let i = atomCount - 1; i >= 0; i--) {
              const atomicNo = mol.getAtomicNo(i);
              
              // Se é hidrogênio (atomicNo === 1)
              if (atomicNo === 1) {
                const connAtoms = mol.getAllConnAtoms?.(i) ?? 0;
                
                // Se tem exatamente 1 ligação
                if (connAtoms === 1) {
                  const neighborIdx = mol.getConnAtom?.(i, 0);
                  
                  if (neighborIdx !== undefined) {
                    const neighborAtomicNo = mol.getAtomicNo(neighborIdx);
                    
                    // Se o vizinho é carbono (atomicNo === 6), remove o H
                    if (neighborAtomicNo === 6) {
                      mol.deleteAtom?.(i);
                    }
                  }
                }
              }
            }
          }

          if (mol.getAllAtoms() > 0) {
            mol.inventCoordinates();
          }

          mol.ensureHelperArrays?.(
            OCL.Molecule.cHelperNeighbours |
              OCL.Molecule.cHelperRings |
              OCL.Molecule.cHelperParities
          );

          // 🔧 Corrige duplas com "X"
          clearUnknownDoubleBondStereo(mol, OCL);
        } catch (error) {
          console.warn("⚠️ Erro ao preparar molécula:", error);
        }

        const rect = host.getBoundingClientRect();
        const computedStyle = window.getComputedStyle(host);
        const rectWidth = parseInt(computedStyle.width, 10) || rect.width;
        const rectHeight = parseInt(computedStyle.height, 10) || rect.height;
        
        // ✅ CRITICAL: Se dimensões são inválidas, aguarda estabilização
        if (rectWidth < MIN_CANVAS_WIDTH || rectHeight < MIN_CANVAS_HEIGHT) {
          console.warn("⚠️ Container dimensions invalid, waiting...");
          
          // Agenda nova tentativa após o container estabilizar
          if (resizeTimeoutId) {
            clearTimeout(resizeTimeoutId);
          }
          
          resizeTimeoutId = setTimeout(() => {
            if (isMounted) {
              lastRenderedRef.current = null; // Force re-render
              void render();
            }
          }, 100); // Aguarda 100ms para estabilização
          
          isRendering = false;
          return;
        }
        
        const w = Math.floor(rectWidth);
        const h = Math.floor(rectHeight);

        const rawSvg = (
          mol as unknown as {
            toSVG: (w: number, h: number, opts?: unknown) => string;
          }
        ).toSVG(w, h, {
          autoCrop: true,
          autoCropMargin: SVG_MARGIN,
          suppressChiralText: true,
          suppressESR: true,
          suppressCIPParity: true,
          fontWeight: "normal",
          strokeWidth: 1.5,
          noStereoProblem: true,
          showSymmetrySimple: true,
          noImplicitAtomLabelColors: false,
          showAtomNumber: false,
          showBondNumber: false,
          showAtomLabels: true,
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

        const renderTime = performance.now() - startTime;
        trackMolecule2DLoad({
          molecule_name: moleculeName,
          load_time: Math.round(renderTime),
          data_source: dataSource,
          success: true,
        });

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