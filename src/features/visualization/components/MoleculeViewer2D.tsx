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
      } catch (e) {
        console.error(e);
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

  // Função utilitária para limitar o viewBox
  const clampViewBox = useCallback((vb: ViewBox, init: ViewBox): ViewBox => {
    // Calcula os limites máximos de deslocamento
    // Permitimos um deslocamento de até 30% da dimensão inicial para cada lado
    // Valor intermediário que permite mais liberdade de movimento sem perder a molécula
    const maxOffsetX = init.width * 0.37;
    const maxOffsetY = init.height * 0.25;

    // Limita as coordenadas para não ultrapassar os limites
    const clampedMinX = Math.max(
      init.minX - maxOffsetX,
      Math.min(init.minX + maxOffsetX, vb.minX)
    );
    const clampedMinY = Math.max(
      init.minY - maxOffsetY,
      Math.min(init.minY + maxOffsetY, vb.minY)
    );

    // Verifica se o viewBox está muito ampliado (zoom out extremo)
    // e centraliza a molécula se necessário
    const maxWidth = init.width * 4.0; // Consistente com o limite de zoom
    const maxHeight = init.height * 4.0;

    let finalWidth = vb.width;
    let finalHeight = vb.height;

    // Se o zoom estiver muito ampliado, ajusta para o tamanho máximo
    if (finalWidth > maxWidth) {
      finalWidth = maxWidth;
    }
    if (finalHeight > maxHeight) {
      finalHeight = maxHeight;
    }

    // Garante que a molécula permaneça visível mesmo em zoom extremo
    // Centraliza a molécula se o viewBox estiver muito deslocado
    if (
      Math.abs(clampedMinX - init.minX) > maxOffsetX * 0.95 ||
      Math.abs(clampedMinY - init.minY) > maxOffsetY * 0.95
    ) {
      // Se estiver próximo do limite, centraliza suavemente
      return {
        minX: clampedMinX,
        minY: clampedMinY,
        width: finalWidth,
        height: finalHeight,
      };
    }

    return {
      minX: clampedMinX,
      minY: clampedMinY,
      width: finalWidth,
      height: finalHeight,
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

        const initialFramed = tightenViewBox(
          rawSvg,
          INITIAL_SCALE,
          INITIAL_Y_OFFSET_PX
        );

        const svgWithStyle = initialFramed
          .replace("<svg", `<svg preserveAspectRatio="${PRESERVE_RATIO}"`)
          .replace(
            "<svg",
            '<svg style="width:100%;height:100%;display:block;overflow:hidden;cursor:grab;touch-action:none;max-width:100%;max-height:100%"'
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
      } catch (e) {
        console.error(e);
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
    <div className="absolute inset-0 min-h-0">
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
          maxWidth: "100%",
          maxHeight: "100%",
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
