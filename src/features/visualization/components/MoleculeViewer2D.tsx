"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useVisualizationStore } from "../store/visualizationStore";
import { useTranslations } from "next-intl";

type OpenChemLibModule = typeof import("openchemlib");
type ViewBox = { minX: number; minY: number; width: number; height: number };

/** ======= Ajustes do enquadramento inicial ======= */
const INITIAL_SCALE = 3; // >1 aproxima (maior desenho)
const INITIAL_Y_OFFSET_PX = 0; // + desce | - sobe
const PRESERVE_RATIO = "xMidYMid meet"; // centraliza no palco

/** Aperta o viewBox e aplica offset vertical */
function tightenViewBox(
  svg: string,
  scaleFactor = 1.15,
  verticalOffsetPx = 0
): string {
  const m = svg.match(/viewBox="([\d.\-\s]+)"/);
  if (!m) return svg;
  const [minX, minY, width, height] = m[1].trim().split(/\s+/).map(Number) as [
    number,
    number,
    number,
    number
  ];

  const newW = width / scaleFactor;
  const newH = height / scaleFactor;
  const dx = (width - newW) / 2;
  const dy = (height - newH) / 2;

  const newMinX = minX + dx;
  const newMinY = minY + dy + verticalOffsetPx;
  return svg.replace(
    /viewBox="[^"]+"/,
    `viewBox="${newMinX} ${newMinY} ${newW} ${newH}"`
  );
}

/** ======= Remove rótulos CIP (R/S) e nomes de compostos do SVG ======= */
function removeCIPLabelsAndNames(svgString: string): string {
  // Cria um parser temporário para processar o SVG
  const parser = new DOMParser();
  const doc = parser.parseFromString(svgString, "image/svg+xml");
  const svg = doc.documentElement;

  // Remove todos os elementos <text> que contêm apenas "R" ou "S"
  const textElements = svg.querySelectorAll("text");
  textElements.forEach((textEl) => {
    const content = textEl.textContent?.trim();

    // Remove rótulos CIP (R/S)
    if (content === "R" || content === "S") {
      textEl.remove();
      return;
    }

    // Remove nomes de compostos (texto longo que não são rótulos de átomos)
    // Heurística: se o texto tem mais de 3 caracteres e não é um elemento químico comum
    if (content && content.length > 3) {
      // Lista de elementos químicos e rótulos comuns que devemos preservar
      const preservedLabels = [
        // Elementos químicos comuns
        "H",
        "He",
        "Li",
        "Be",
        "B",
        "C",
        "N",
        "O",
        "F",
        "Ne",
        "Na",
        "Mg",
        "Al",
        "Si",
        "P",
        "S",
        "Cl",
        "Ar",
        "K",
        "Ca",
        "Sc",
        "Ti",
        "V",
        "Cr",
        "Mn",
        "Fe",
        "Co",
        "Ni",
        "Cu",
        "Zn",
        "Ga",
        "Ge",
        "As",
        "Se",
        "Br",
        "Kr",
        "Rb",
        "Sr",
        "Y",
        "Zr",
        "Nb",
        "Mo",
        "Tc",
        "Ru",
        "Rh",
        "Pd",
        "Ag",
        "Cd",
        "In",
        "Sn",
        "Sb",
        "Te",
        "I",
        "Xe",
        "Cs",
        "Ba",
        "La",
        "Ce",
        "Pr",
        "Nd",
        "Pm",
        "Sm",
        "Eu",
        "Gd",
        "Tb",
        "Dy",
        "Ho",
        "Er",
        "Tm",
        "Yb",
        "Lu",
        "Hf",
        "Ta",
        "W",
        "Re",
        "Os",
        "Ir",
        "Pt",
        "Au",
        "Hg",
        "Tl",
        "Pb",
        "Bi",
        "Po",
        "At",
        "Rn",
        "Fr",
        "Ra",
        "Ac",
        "Th",
        "Pa",
        "U",
        "Np",
        "Pu",
        "Am",
        "Cm",
        "Bk",
        "Cf",
        "Es",
        "Fm",
        "Md",
        "No",
        "Lr",
        "Rf",
        "Db",
        "Sg",
        "Bh",
        "Hs",
        "Mt",
        "Ds",
        "Rg",
        "Cn",
        "Nh",
        "Fl",
        "Mc",
        "Lv",
        "Ts",
        "Og",
        // Números e cargas
        "+",
        "-",
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "0",
        // Combinações comuns
        "NH",
        "OH",
        "CH",
        "NH2",
        "NH3",
        "CH2",
        "CH3",
        "COOH",
        "COO",
      ];

      // Se não é um rótulo preservado e tem mais de 3 caracteres, provavelmente é um nome
      const isPreserved = preservedLabels.some(
        (label) => content === label || content.startsWith(label)
      );

      if (!isPreserved) {
        textEl.remove();
      }
    }
  });

  // Serializa o SVG de volta para string
  const serializer = new XMLSerializer();
  return serializer.serializeToString(svg);
}

/** ======= Nova função para calcular o bounding box real da molécula ======= */
function getContentBounds(svg: SVGSVGElement): ViewBox | null {
  try {
    // Seleciona todos os elementos gráficos que fazem parte da molécula
    const graphicElements = svg.querySelectorAll(
      "line, circle, ellipse, path, polygon, polyline, text"
    );

    if (graphicElements.length === 0) return null;

    let minX = Infinity,
      minY = Infinity,
      maxX = -Infinity,
      maxY = -Infinity;

    graphicElements.forEach((element) => {
      try {
        const bbox = (element as SVGGraphicsElement).getBBox();
        if (bbox.width > 0 && bbox.height > 0) {
          minX = Math.min(minX, bbox.x);
          minY = Math.min(minY, bbox.y);
          maxX = Math.max(maxX, bbox.x + bbox.width);
          maxY = Math.max(maxY, bbox.y + bbox.height);
        }
      } catch (error) {
        console.error(error);
      }
    });

    if (minX === Infinity || minY === Infinity) return null;

    // Adiciona uma pequena margem para evitar cortes nas bordas
    const margin = Math.max((maxX - minX) * 0.05, (maxY - minY) * 0.05, 5);

    return {
      minX: minX - margin,
      minY: minY - margin,
      width: maxX - minX + margin * 2,
      height: maxY - minY + margin * 2,
    };
  } catch (e) {
    console.warn("Erro ao calcular content bounds:", e);
    return null;
  }
}

/** ======= Theming robusto (salva originais e reaplica no toggle) ======= */
function applyThemeToSVG(svg: SVGSVGElement, mode: "dark" | "light") {
  if (!svg) return;

  const isDark = mode === "dark";
  const baseStroke = isDark
    ? "#e5e7eb" /* zinc-200 */
    : "#111827"; /* gray-900 */
  const baseFill = baseStroke;

  // Salva originais 1x
  if (!svg.hasAttribute("data-themed-init")) {
    svg.setAttribute("data-themed-init", "true");

    svg.querySelectorAll<SVGElement>("[stroke]").forEach((el) => {
      const s = el.getAttribute("stroke");
      if (s != null) el.setAttribute("data-stroke-original", s);
    });

    svg.querySelectorAll<SVGElement>("[fill]").forEach((el) => {
      const f = el.getAttribute("fill");
      if (f != null) el.setAttribute("data-fill-original", f);
    });

    svg.querySelectorAll<SVGElement>("[stroke-width]").forEach((el) => {
      const sw = el.getAttribute("stroke-width");
      if (sw != null) el.setAttribute("data-stroke-width-original", sw);
    });
  }

  // Utilitário
  const isBlack = (v?: string | null) =>
    !v ||
    /^#?000000$/i.test(v) ||
    v.toLowerCase() === "black" ||
    v.toLowerCase() === "rgb(0,0,0)";

  // Stroke
  svg.querySelectorAll<SVGElement>("[stroke]").forEach((el) => {
    const orig = el.getAttribute("data-stroke-original");
    const wasBlack = isBlack(orig);
    if (isDark) {
      el.setAttribute("stroke", wasBlack ? baseStroke : orig ?? baseStroke);
    } else {
      el.setAttribute("stroke", orig ?? baseStroke);
    }
  });

  // Fill
  svg.querySelectorAll<SVGElement>("[fill]").forEach((el) => {
    const orig = el.getAttribute("data-fill-original");
    const wasBlack = isBlack(orig);
    if (isDark) {
      el.setAttribute("fill", wasBlack ? baseFill : orig ?? baseFill);
    } else {
      el.setAttribute("fill", orig ?? baseFill);
    }
  });

  // Textos
  svg.querySelectorAll<SVGElement>("text").forEach((t) => {
    const orig =
      t.getAttribute("data-fill-original") ?? t.getAttribute("fill") ?? "";
    const wasBlack = isBlack(orig);
    if (isDark) {
      t.setAttribute(
        "fill",
        wasBlack ? baseFill : t.getAttribute("data-fill-original") ?? orig
      );
    } else {
      t.setAttribute("fill", t.getAttribute("data-fill-original") ?? orig);
    }
  });

  // Espessura (boost no dark, restore no light)
  svg
    .querySelectorAll<SVGElement>("[data-stroke-width-original]")
    .forEach((el) => {
      const orig = el.getAttribute("data-stroke-width-original");
      if (!orig) return;
      const n = parseFloat(orig);
      if (Number.isNaN(n)) return;
      el.setAttribute("stroke-width", isDark ? String(n * 1.15) : orig);
    });
}

/** ======= Componente ======= */
export function MoleculeViewer2D() {
  const svgHostRef = useRef<HTMLDivElement | null>(null);
  const [ready, setReady] = useState(false);

  const smiles = useVisualizationStore((s) => s.smilesData);
  const sdf = useVisualizationStore((s) => s.sdfData);

  const oclRef = useRef<OpenChemLibModule | null>(null);
  const svgElRef = useRef<SVGSVGElement | null>(null);

  const vbRef = useRef<ViewBox | null>(null);
  const vbInitialRef = useRef<ViewBox | null>(null);
  const contentBoundsRef = useRef<ViewBox | null>(null);

  // Carrega OCL
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
        console.error(error);
      }
    })();
    return () => {
      disposed = true;
    };
  }, []);

  // Utils viewBox
  const readViewBox = useCallback((svg: SVGSVGElement): ViewBox | null => {
    const vb = svg.getAttribute("viewBox");
    if (!vb) return null;
    const parts = vb.trim().split(/\s+/).map(Number);
    if (parts.length !== 4 || parts.some((n) => Number.isNaN(n))) return null;
    const [minX, minY, width, height] = parts;
    return { minX, minY, width, height };
  }, []);

  const writeViewBox = useCallback((svg: SVGSVGElement, vb: ViewBox) => {
    svg.setAttribute(
      "viewBox",
      `${vb.minX} ${vb.minY} ${vb.width} ${vb.height}`
    );
  }, []);

  // Nova função de limitação baseada no conteúdo real
  const clampViewBox = useCallback((vb: ViewBox, init: ViewBox): ViewBox => {
    const contentBounds = contentBoundsRef.current;
    if (!contentBounds) {
      // Fallback para o comportamento anterior se não conseguirmos calcular os bounds
      const maxOffsetX = init.width * 0.37;
      const maxOffsetY = init.height * 0.25;

      const clampedMinX = Math.max(
        init.minX - maxOffsetX,
        Math.min(init.minX + maxOffsetX, vb.minX)
      );
      const clampedMinY = Math.max(
        init.minY - maxOffsetY,
        Math.min(init.minY + maxOffsetY, vb.minY)
      );

      const maxWidth = init.width * 4.0;
      const maxHeight = init.height * 4.0;

      return {
        minX: clampedMinX,
        minY: clampedMinY,
        width: Math.min(vb.width, maxWidth),
        height: Math.min(vb.height, maxHeight),
      };
    }

    // Limites de zoom baseados no tamanho inicial
    const minWidth = init.width * 0.1;
    const maxWidth = init.width * 4.0;
    const aspect = init.height / init.width;

    // Clamp do zoom
    const clampedWidth = Math.min(Math.max(vb.width, minWidth), maxWidth);
    const clampedHeight = clampedWidth * aspect;

    // Calcula os limites para que a molécula não saia da vista
    // A molécula deve estar sempre pelo menos parcialmente visível
    const moleculeLeft = contentBounds.minX;
    const moleculeRight = contentBounds.minX + contentBounds.width;
    const moleculeTop = contentBounds.minY;
    const moleculeBottom = contentBounds.minY + contentBounds.height;

    // Limites do viewBox: deve mostrar pelo menos uma parte da molécula
    // Permite que a molécula chegue até as bordas, mas não desapareça completamente
    const maxMinX = moleculeRight - clampedWidth * 0.1; // Mostra pelo menos 10% da molécula
    const minMinX = moleculeLeft - clampedWidth * 0.9; // Mostra pelo menos 10% da molécula
    const maxMinY = moleculeBottom - clampedHeight * 0.1;
    const minMinY = moleculeTop - clampedHeight * 0.9;

    // Aplica os limites
    const clampedMinX = Math.max(minMinX, Math.min(maxMinX, vb.minX));
    const clampedMinY = Math.max(minMinY, Math.min(maxMinY, vb.minY));

    return {
      minX: clampedMinX,
      minY: clampedMinY,
      width: clampedWidth,
      height: clampedHeight,
    };
  }, []);

  const resetViewBox = useCallback(() => {
    const svg = svgElRef.current;
    if (!svg || !vbInitialRef.current) return;
    vbRef.current = { ...vbInitialRef.current };
    writeViewBox(svg, vbRef.current);
  }, [writeViewBox]);

  // Zoom (scroll)
  const handleWheel = useCallback(
    (e: React.WheelEvent<HTMLDivElement>) => {
      const svg = svgElRef.current;
      if (!svg || !vbRef.current || !vbInitialRef.current) return;
      e.preventDefault();

      const rect = svg.getBoundingClientRect();
      const relX = (e.clientX - rect.left) / rect.width;
      const relY = (e.clientY - rect.top) / rect.height;

      const vb = vbRef.current;
      const zoom = Math.pow(1.0015, e.deltaY);
      const newWidth = vb.width * zoom;

      const init = vbInitialRef.current;
      const aspect = init.height / init.width;
      const minW = init.width * 0.1;
      const maxW = init.width * 4.0;

      const clampedW = Math.min(Math.max(newWidth, minW), maxW);
      const clampedH = clampedW * aspect;

      const dx = (vb.width - clampedW) * relX;
      const dy = (vb.height - clampedH) * relY;

      const next: ViewBox = {
        minX: vb.minX + dx,
        minY: vb.minY + dy,
        width: clampedW,
        height: clampedH,
      };

      // Aplica limites ao viewBox para zoom extremo
      const clamped = clampViewBox(next, init);
      vbRef.current = clamped;
      writeViewBox(svg, clamped);
    },
    [writeViewBox, clampViewBox]
  );

  // Pan (Shift + scroll)
  const handleWheelPan = useCallback(
    (e: React.WheelEvent<HTMLDivElement>) => {
      if (!e.shiftKey) return;
      const svg = svgElRef.current;
      if (!svg || !vbRef.current || !vbInitialRef.current) return;
      e.preventDefault();

      const vb = vbRef.current;
      const panFactor = 0.0015;
      const next: ViewBox = {
        minX: vb.minX + vb.width * panFactor * e.deltaY,
        minY: vb.minY + vb.height * panFactor * e.deltaX,
        width: vb.width,
        height: vb.height,
      };

      // Aplica limites ao viewBox
      const clamped = clampViewBox(next, vbInitialRef.current);
      vbRef.current = clamped;
      writeViewBox(svg, clamped);
    },
    [writeViewBox, clampViewBox]
  );

  // Drag
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef<{ x: number; y: number; vb: ViewBox | null }>({
    x: 0,
    y: 0,
    vb: null,
  });

  const handleMouseDown = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!vbRef.current) return;
    setIsDragging(true);
    dragStartRef.current = {
      x: e.clientX,
      y: e.clientY,
      vb: { ...vbRef.current },
    };
    if (svgHostRef.current) {
      const svg = svgHostRef.current.querySelector("svg");
      if (svg) svg.style.cursor = "grabbing";
    }
  }, []);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (
        !isDragging ||
        !dragStartRef.current.vb ||
        !vbRef.current ||
        !vbInitialRef.current
      )
        return;

      const dx = e.clientX - dragStartRef.current.x;
      const dy = e.clientY - dragStartRef.current.y;

      const svg = svgElRef.current;
      if (!svg) return;

      const rect = svg.getBoundingClientRect();
      const scaleX = vbRef.current.width / rect.width;
      const scaleY = vbRef.current.height / rect.height;

      const next: ViewBox = {
        minX: dragStartRef.current.vb.minX - dx * scaleX,
        minY: dragStartRef.current.vb.minY - dy * scaleY,
        width: vbRef.current.width,
        height: vbRef.current.height,
      };

      // Aplica limites ao viewBox durante o drag
      const clamped = clampViewBox(next, vbInitialRef.current);
      vbRef.current = clamped;
      writeViewBox(svg, clamped);
    },
    [isDragging, writeViewBox, clampViewBox]
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
    if (svgHostRef.current) {
      const svg = svgHostRef.current.querySelector("svg");
      if (svg) svg.style.cursor = "grab";
    }
  }, []);

  // Touch
  const handleTouchStart = useCallback(
    (e: React.TouchEvent<HTMLDivElement>) => {
      if (!vbRef.current || e.touches.length !== 1) return;
      setIsDragging(true);
      dragStartRef.current = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY,
        vb: { ...vbRef.current },
      };
    },
    []
  );

  const handleTouchMove = useCallback(
    (e: React.TouchEvent<HTMLDivElement>) => {
      if (
        !isDragging ||
        !dragStartRef.current.vb ||
        !vbRef.current ||
        !vbInitialRef.current ||
        e.touches.length !== 1
      )
        return;
      e.preventDefault();

      const dx = e.touches[0].clientX - dragStartRef.current.x;
      const dy = e.touches[0].clientY - dragStartRef.current.y;

      const svg = svgElRef.current;
      if (!svg) return;

      const rect = svg.getBoundingClientRect();
      const scaleX = vbRef.current.width / rect.width;
      const scaleY = vbRef.current.height / rect.height;

      const next: ViewBox = {
        minX: dragStartRef.current.vb.minX - dx * scaleX,
        minY: dragStartRef.current.vb.minY - dy * scaleY,
        width: vbRef.current.width,
        height: vbRef.current.height,
      };

      // Aplica limites ao viewBox durante o touch
      const clamped = clampViewBox(next, vbInitialRef.current);
      vbRef.current = clamped;
      writeViewBox(svg, clamped);
    },
    [isDragging, writeViewBox, clampViewBox]
  );

  const handleTouchEnd = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleDoubleClick = useCallback(() => {
    resetViewBox();
  }, [resetViewBox]);

  // Render principal
  useEffect(() => {
    async function render() {
      const host = svgHostRef.current;
      const OCL = oclRef.current;
      if (!host || !OCL || !ready) return;

      try {
        let mol: import("openchemlib").Molecule | null = null;

        if (sdf) {
          try {
            mol = OCL.Molecule.fromMolfile(sdf);
          } catch {}
        }
        if (!mol && smiles) {
          try {
            mol = OCL.Molecule.fromSmiles(smiles);
          } catch {}
        }

        if (!mol) {
          host.innerHTML = "";
          svgElRef.current = null;
          vbRef.current = null;
          vbInitialRef.current = null;
          contentBoundsRef.current = null;
          return;
        }

        try {
          mol.addImplicitHydrogens?.();
        } catch {}
        try {
          mol.ensureHelperArrays?.(OCL.Molecule?.cHelperNeighbours ?? 0);
        } catch {}

        const rect = host.getBoundingClientRect();
        const w = Math.max(200, Math.floor(rect.width || 400));
        const h = Math.max(150, Math.floor(rect.height || 300));

        const rawSvg = (
          mol as unknown as {
            toSVG: (w: number, h: number, opts?: unknown) => string;
          }
        ).toSVG(w, h, { autoCrop: true, margin: 6 });

        // Remove os rótulos CIP (R/S) e nomes de compostos do SVG
        const svgWithoutCIP = removeCIPLabelsAndNames(rawSvg);

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

        // Aplica tema atual
        const mode: "dark" | "light" =
          document.documentElement.classList.contains("dark")
            ? "dark"
            : "light";
        if (svgEl) applyThemeToSVG(svgEl, mode);

        // Guarda viewBox
        const vb = svgEl ? readViewBox(svgEl) : null;
        if (vb) {
          vbRef.current = { ...vb };
          vbInitialRef.current = { ...vb };
        }

        // Calcula o bounding box real do conteúdo da molécula
        if (svgEl) {
          // Precisamos aguardar um pouco para que o SVG seja completamente renderizado
          setTimeout(() => {
            const contentBounds = getContentBounds(svgEl);
            contentBoundsRef.current = contentBounds;
          }, 50);
        }
      } catch (error) {
        console.error(error);
      }
    }
    void render();
  }, [sdf, smiles, ready, readViewBox]);

  // Observa troca de tema e reaplica SEMPRE a partir dos originais
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
  }, []);

  const onWheel = useCallback(
    (e: React.WheelEvent<HTMLDivElement>) => {
      if (e.shiftKey) handleWheelPan(e);
      else handleWheel(e);
    },
    [handleWheel, handleWheelPan]
  );

  const t = useTranslations("visualization.controls");

  return (
    <div
      className="w-full h-full relative"
      style={{
        contain: "layout style paint",
        overflow: "hidden",
      }}
    >
      <div
        ref={svgHostRef}
        onWheel={onWheel}
        onDoubleClick={handleDoubleClick}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onTouchCancel={handleTouchEnd}
        className="w-full h-full select-none"
        style={{
          position: "relative",
          touchAction: "none",
          overflow: "hidden",
          cursor: "grab",
          contain: "layout style paint",
        }}
        title={t("tooltip")}
      />
      {!ready && (
        <p className="absolute bottom-2 left-3 text-sm text-zinc-500 dark:text-zinc-400 pointer-events-none">
          Carregando motor 2D…
        </p>
      )}
    </div>
  );
}
