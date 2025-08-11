"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useVisualizationStore } from "../store/visualizationStore";
import { useTranslations } from "next-intl";

type OpenChemLibModule = typeof import("openchemlib");
type ViewBox = { minX: number; minY: number; width: number; height: number };

/** 🔧 Ajustes finos do enquadramento inicial (fáceis de calibrar) */
const INITIAL_SCALE = 2.5; // 1.0 = sem zoom; >1 aproxima um pouco
const INITIAL_Y_OFFSET_PX = 0; // px: positivo desce, negativo sobe
const PRESERVE_RATIO = "xMidYMid meet"; // centraliza no palco (antes era xMidYMin)

/** Apertar viewBox e aplicar offset vertical */
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

  // offset em px no sistema de coords do viewBox (1:1 com unidades do SVG)
  const newMinX = minX + dx;
  const newMinY = minY + dy + verticalOffsetPx;

  return svg.replace(
    /viewBox="[^"]+"/,
    `viewBox="${newMinX} ${newMinY} ${newW} ${newH}"`
  );
}

export function MoleculeViewer2D() {
  const svgHostRef = useRef<HTMLDivElement | null>(null);
  const [ready, setReady] = useState(false);

  const smiles = useVisualizationStore((s) => s.smilesData);
  const sdf = useVisualizationStore((s) => s.sdfData);

  const oclRef = useRef<OpenChemLibModule | null>(null);
  const svgElRef = useRef<SVGSVGElement | null>(null);

  const vbRef = useRef<ViewBox | null>(null);
  const vbInitialRef = useRef<ViewBox | null>(null);

  useEffect(() => {
    let disposed = false;
    async function loadOCL() {
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
    }
    void loadOCL();
    return () => {
      disposed = true;
    };
  }, []);

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

  const resetViewBox = useCallback(() => {
    const svg = svgElRef.current;
    if (!svg || !vbInitialRef.current) return;
    vbRef.current = { ...vbInitialRef.current };
    writeViewBox(svg, vbRef.current);
  }, [writeViewBox]);

  const handleWheel = useCallback(
    (e: React.WheelEvent<HTMLDivElement>) => {
      const svg = svgElRef.current;
      if (!svg || !vbRef.current) return;
      e.preventDefault();

      const rect = svg.getBoundingClientRect();
      const relX = (e.clientX - rect.left) / rect.width;
      const relY = (e.clientY - rect.top) / rect.height;

      const vb = vbRef.current;
      const zoom = Math.pow(1.0015, e.deltaY);
      const newWidth = vb.width * zoom;

      const init = vbInitialRef.current ?? vb;
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

      vbRef.current = next;
      writeViewBox(svg, next);
    },
    [writeViewBox]
  );

  const handleWheelPan = useCallback(
    (e: React.WheelEvent<HTMLDivElement>) => {
      if (!e.shiftKey) return;
      const svg = svgElRef.current;
      if (!svg || !vbRef.current) return;
      e.preventDefault();

      const vb = vbRef.current;
      const panFactor = 0.0015;
      const next: ViewBox = {
        minX: vb.minX + vb.width * panFactor * e.deltaY,
        minY: vb.minY + vb.height * panFactor * e.deltaX,
        width: vb.width,
        height: vb.height,
      };

      vbRef.current = next;
      writeViewBox(svg, next);
    },
    [writeViewBox]
  );

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
      if (!isDragging || !dragStartRef.current.vb || !vbRef.current) return;

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

      vbRef.current = next;
      writeViewBox(svg, next);
    },
    [isDragging, writeViewBox]
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
    if (svgHostRef.current) {
      const svg = svgHostRef.current.querySelector("svg");
      if (svg) svg.style.cursor = "grab";
    }
  }, []);

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

      vbRef.current = next;
      writeViewBox(svg, next);
    },
    [isDragging, writeViewBox]
  );

  const handleTouchEnd = useCallback(() => {
    setIsDragging(false);
  }, []);
  const handleDoubleClick = useCallback(() => {
    resetViewBox();
  }, [resetViewBox]);

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

        // mede o palco disponível
        const rect = host.getBoundingClientRect();
        const w = Math.max(200, Math.floor(rect.width || 400));
        const h = Math.max(150, Math.floor(rect.height || 300));

        const rawSvg = (
          mol as unknown as {
            toSVG: (w: number, h: number, opts?: unknown) => string;
          }
        ).toSVG(w, h, { autoCrop: true, margin: 6 });

        // 📌 aplica o enquadramento inicial “bom” que você curtia
        const initialFramed = tightenViewBox(
          rawSvg,
          INITIAL_SCALE,
          INITIAL_Y_OFFSET_PX
        );

        const svgWithStyle = initialFramed
          .replace("<svg", `<svg preserveAspectRatio="${PRESERVE_RATIO}"`)
          .replace(
            "<svg",
            // mantém o fix do scroll: sem overflow visível
            '<svg style="width:100%;height:100%;display:block;overflow:hidden;cursor:grab;touch-action:none"'
          );

        host.innerHTML = svgWithStyle;

        const svgEl = host.querySelector("svg") as SVGSVGElement | null;
        svgElRef.current = svgEl;

        const vb = svgEl ? readViewBox(svgEl) : null;
        if (vb) {
          vbRef.current = { ...vb };
          vbInitialRef.current = { ...vb }; // reset volta pra esse framing
        }
      } catch (e) {
        console.error(e);
      }
    }
    void render();
  }, [sdf, smiles, ready, readViewBox]);

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
