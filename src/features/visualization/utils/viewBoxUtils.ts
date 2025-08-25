import { ViewBox } from "../types/viewer2d.types";

/** Lê o viewBox de um elemento SVG */
export function readViewBox(svg: SVGSVGElement): ViewBox | null {
  const vb = svg.getAttribute("viewBox");
  if (!vb) return null;
  const parts = vb.trim().split(/\s+/).map(Number);
  if (parts.length !== 4 || parts.some((n) => Number.isNaN(n))) return null;
  const [minX, minY, width, height] = parts;
  return { minX, minY, width, height };
}

/** Escreve o viewBox em um elemento SVG */
export function writeViewBox(svg: SVGSVGElement, vb: ViewBox) {
  svg.setAttribute(
    "viewBox",
    `${vb.minX} ${vb.minY} ${vb.width} ${vb.height}`
  );
}

/**
 * Centraliza a molécula no SVG baseado nos limites calculados.
 * @param svg SVG onde a molécula será renderizada.
 * @param contentBounds Bounding box da molécula.
 * @param containerWidth Largura visível do container.
 * @param containerHeight Altura visível do container.
 * @param toolbarOffset Offset no topo para não sobrepor a toolbar.
 */
export function centerViewBox(
  svg: SVGSVGElement,
  contentBounds: ViewBox,
  containerWidth: number,
  containerHeight: number,
  toolbarOffset = 50
): ViewBox {
  const vbWidth = contentBounds.width;
  const vbHeight = contentBounds.height;

  const minX = contentBounds.minX - (containerWidth - vbWidth) / 2;
  const minY =
    contentBounds.minY - (containerHeight - vbHeight) / 2 + toolbarOffset;

  const vb: ViewBox = {
    minX,
    minY,
    width: containerWidth,
    height: containerHeight - toolbarOffset,
  };

  svg.setAttribute("viewBox", `${vb.minX} ${vb.minY} ${vb.width} ${vb.height}`);
  return vb;
}

/** Limita o viewBox para evitar que a molécula suma da tela */
export function clampViewBox(
  vb: ViewBox,
  init: ViewBox,
  contentBounds: ViewBox | null
): ViewBox {
  if (!contentBounds) {
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

  const minWidth = init.width * 0.1;
  const maxWidth = init.width * 4.0;
  const aspect = init.height / init.width;

  const clampedWidth = Math.min(Math.max(vb.width, minWidth), maxWidth);
  const clampedHeight = clampedWidth * aspect;

  const moleculeLeft = contentBounds.minX;
  const moleculeRight = contentBounds.minX + contentBounds.width;
  const moleculeTop = contentBounds.minY;
  const moleculeBottom = contentBounds.minY + contentBounds.height;

  const maxMinX = moleculeRight - clampedWidth * 0.1;
  const minMinX = moleculeLeft - clampedWidth * 0.9;
  const maxMinY = moleculeBottom - clampedHeight * 0.1;
  const minMinY = moleculeTop - clampedHeight * 0.9;

  const clampedMinX = Math.max(minMinX, Math.min(maxMinX, vb.minX));
  const clampedMinY = Math.max(minMinY, Math.min(maxMinY, vb.minY));

  return {
    minX: clampedMinX,
    minY: clampedMinY,
    width: clampedWidth,
    height: clampedHeight,
  };
}
