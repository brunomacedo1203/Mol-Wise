export interface ElementSize {
  width: number;
  height: number;
}

/**
 * Mede o tamanho do elemento de forma robusta, priorizando client/offset.
 */
export function getElementSize(el: HTMLElement): ElementSize {
  let width = el.clientWidth;
  let height = el.clientHeight;

  if (!width || !height) {
    width = el.offsetWidth;
    height = el.offsetHeight;
  }

  if (!width || !height) {
    const rect = el.getBoundingClientRect();
    width = Math.round(rect.width);
    height = Math.round(rect.height);
  }

  if (!width || !height) {
    const cs = window.getComputedStyle(el);
    const w = parseFloat(cs.width);
    const h = parseFloat(cs.height);
    if (!Number.isNaN(w)) width = Math.round(w);
    if (!Number.isNaN(h)) height = Math.round(h);
  }

  return { width, height };
}

/** Verifica se o elemento possui tamanho não-zero (ou mínimo customizável). */
export function hasNonZeroSize(
  el: HTMLElement,
  minWidth = 1,
  minHeight = 1
): boolean {
  const { width, height } = getElementSize(el);
  return width >= minWidth && height >= minHeight;
}

/**
 * Aguarda até que o elemento tenha tamanho não-zero.
 * Resolve true se válido antes do timeout, false caso contrário.
 */
export async function waitForNonZeroSize(
  el: HTMLElement,
  maxWaitMs = 1000,
  minWidth = 1,
  minHeight = 1
): Promise<boolean> {
  if (hasNonZeroSize(el, minWidth, minHeight)) return true;

  const start = Date.now();
  return new Promise((resolve) => {
    let rafId: number | null = null;
    const observer = new ResizeObserver(() => {
      if (hasNonZeroSize(el, minWidth, minHeight)) {
        if (rafId != null) cancelAnimationFrame(rafId);
        observer.disconnect();
        resolve(true);
      }
    });
    observer.observe(el);

    const poll = () => {
      if (hasNonZeroSize(el, minWidth, minHeight)) {
        observer.disconnect();
        resolve(true);
        return;
      }
      if (Date.now() - start > maxWaitMs) {
        observer.disconnect();
        resolve(false);
        return;
      }
      rafId = requestAnimationFrame(poll);
    };
    poll();
  });
}