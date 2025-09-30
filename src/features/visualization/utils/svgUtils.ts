import { ViewBox } from "../types/viewer2d.types";

/** Aperta o viewBox e aplica offset vertical */
export function tightenViewBox(
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

/** Remove TODOS os labels estereoquímicos de forma agressiva */
export function removeCIPLabelsAndNames(svgString: string): string {
  const parser = new DOMParser();
  const doc = parser.parseFromString(svgString, "image/svg+xml");
  const svg = doc.documentElement;

  const textElements = svg.querySelectorAll("text");
  const stereoLabels = ["R", "S", "E", "Z", "abs", "rac", "and", "or", "AND", "OR"];
  
  textElements.forEach((textEl) => {
    const content = textEl.textContent?.trim();
    if (!content) return;

    // Remove labels estereoquímicos
    if (stereoLabels.includes(content)) {
      textEl.remove();
      return;
    }

    // Remove textos vermelhos (estereoquímica)
    const fill = textEl.getAttribute("fill");
    if (fill && fill.toLowerCase().match(/#f{2}0{4}|rgb\(25[0-5],\s*0,\s*0\)/)) {
      textEl.remove();
      return;
    }

    // Remove textos italic vermelhos
    const style = textEl.getAttribute("font-style");
    if (style === "italic" && fill && fill.toLowerCase().includes("f")) {
      textEl.remove();
      return;
    }

    // Remove nomes de compostos (preserva elementos químicos)
    if (content.length > 3) {
      const preservedLabels = [
        "H", "He", "Li", "Be", "B", "C", "N", "O", "F", "Ne",
        "Na", "Mg", "Al", "Si", "P", "S", "Cl", "Ar", "K", "Ca",
        "Sc", "Ti", "V", "Cr", "Mn", "Fe", "Co", "Ni", "Cu", "Zn",
        "Ga", "Ge", "As", "Se", "Br", "Kr", "Rb", "Sr", "Y", "Zr",
        "Nb", "Mo", "Tc", "Ru", "Rh", "Pd", "Ag", "Cd", "In", "Sn",
        "Sb", "Te", "I", "Xe", "Cs", "Ba", "La", "Ce", "Pr", "Nd",
        "Pm", "Sm", "Eu", "Gd", "Tb", "Dy", "Ho", "Er", "Tm", "Yb",
        "Lu", "Hf", "Ta", "W", "Re", "Os", "Ir", "Pt", "Au", "Hg",
        "Tl", "Pb", "Bi", "Po", "At", "Rn", "Fr", "Ra", "Ac", "Th",
        "Pa", "U", "Np", "Pu", "Am", "Cm", "Bk", "Cf", "Es", "Fm",
        "Md", "No", "Lr", "Rf", "Db", "Sg", "Bh", "Hs", "Mt", "Ds",
        "Rg", "Cn", "Nh", "Fl", "Mc", "Lv", "Ts", "Og",
        "+", "-", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0",
        "NH", "OH", "CH", "NH2", "NH3", "CH2", "CH3", "COOH", "COO",
      ];

      const isPreserved = preservedLabels.some(
        (label) => content === label || content.startsWith(label)
      );

      if (!isPreserved) {
        textEl.remove();
      }
    }
  });

  const serializer = new XMLSerializer();
  return serializer.serializeToString(svg);
}

/** Limpa labels estereoquímicos diretamente do DOM (pós-renderização) */
export function cleanStereochemistryLabels(svg: SVGSVGElement): void {
  if (!svg) return;

  const stereoLabels = ["abs", "rac", "and", "or", "AND", "OR", "R", "S", "E", "Z"];
  
  svg.querySelectorAll("text").forEach((textEl) => {
    const content = textEl.textContent?.trim();
    if (!content) return;

    // Remove se for label estereoquímico
    if (stereoLabels.includes(content)) {
      textEl.remove();
      return;
    }

    // Remove textos vermelhos
    const fill = textEl.getAttribute("fill");
    if (fill && (
      fill.toLowerCase().match(/#f{2}0{4}/) ||
      fill.toLowerCase().match(/rgb\(25[0-5],\s*0,\s*0\)/)
    )) {
      textEl.remove();
      return;
    }

    // Remove textos muito pequenos (< 10px) que geralmente são labels indesejados
    const fontSize = textEl.getAttribute("font-size");
    if (fontSize && parseFloat(fontSize) < 10) {
      textEl.remove();
    }
  });
}

/** Calcula o bounding box real da molécula */
export function getContentBounds(svg: SVGSVGElement): ViewBox | null {
  try {
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

/** Theming: Preserva cores de estereoquímica */
export function applyThemeToSVG(svg: SVGSVGElement, mode: "dark" | "light") {
  if (!svg) return;

  const isDark = mode === "dark";
  const baseStroke = isDark ? "#e5e7eb" : "#111827";
  const baseFill = baseStroke;

  if (!svg.hasAttribute("data-themed-init")) {
    svg.setAttribute("data-themed-init", "true");

    svg.querySelectorAll<SVGElement>("[stroke]").forEach((el) => {
      const s = el.getAttribute("stroke");
      if (s != null) {
        const normalizedStroke = isRedWedge(s) ? "rgb(0,0,0)" : s;
        el.setAttribute("data-stroke-original", normalizedStroke);
      }
    });

    svg.querySelectorAll<SVGElement>("[fill]").forEach((el) => {
      const f = el.getAttribute("fill");
      if (f != null) {
        const parentTag = el.tagName.toLowerCase();
        const isWedge = parentTag === "polygon" || parentTag === "line";
        const normalizedFill = (isWedge && isRedWedge(f)) ? "rgb(0,0,0)" : f;
        el.setAttribute("data-fill-original", normalizedFill);
      }
    });

    svg.querySelectorAll<SVGElement>("[stroke-width]").forEach((el) => {
      const sw = el.getAttribute("stroke-width");
      if (sw != null) el.setAttribute("data-stroke-width-original", sw);
    });
  }

  svg.querySelectorAll<SVGElement>("[stroke]").forEach((el) => {
    const orig = el.getAttribute("data-stroke-original");
    const wasBlack = isBlackColor(orig);
    if (isDark) {
      el.setAttribute("stroke", wasBlack ? baseStroke : orig ?? baseStroke);
    } else {
      el.setAttribute("stroke", orig ?? baseStroke);
    }
  });

  svg.querySelectorAll<SVGElement>("[fill]").forEach((el) => {
    const orig = el.getAttribute("data-fill-original");
    const wasBlack = isBlackColor(orig);
    if (isDark) {
      el.setAttribute("fill", wasBlack ? baseFill : orig ?? baseFill);
    } else {
      el.setAttribute("fill", orig ?? baseFill);
    }
  });

  svg.querySelectorAll<SVGElement>("text").forEach((t) => {
    const orig = t.getAttribute("data-fill-original") ?? t.getAttribute("fill") ?? "";
    const wasBlack = isBlackColor(orig);
    if (isDark) {
      t.setAttribute("fill", wasBlack ? baseFill : orig);
    } else {
      t.setAttribute("fill", orig);
    }
  });

  svg.querySelectorAll<SVGElement>("[data-stroke-width-original]").forEach((el) => {
    const orig = el.getAttribute("data-stroke-width-original");
    if (!orig) return;
    const n = parseFloat(orig);
    if (Number.isNaN(n)) return;
    el.setAttribute("stroke-width", isDark ? String(n * 1.15) : orig);
  });
}

function isBlackColor(v?: string | null): boolean {
  if (!v) return true;
  const normalized = v.toLowerCase().trim();
  return (
    normalized === "black" ||
    normalized === "#000000" ||
    normalized === "#000" ||
    normalized === "rgb(0,0,0)" ||
    normalized === "rgb(0, 0, 0)"
  );
}

export function isRedWedge(color?: string | null): boolean {
  if (!color) return false;
  const normalized = color.toLowerCase().trim();
  return (
    normalized === "#a00000" ||
    normalized === "#c00000" ||
    normalized === "rgb(160,0,0)" ||
    normalized === "rgb(160, 0, 0)" ||
    normalized === "rgb(192,0,0)" ||
    normalized === "rgb(192, 0, 0)" ||
    normalized.match(/^#[a-f0-9]{2}0000$/i) !== null
  );
}