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

/** ======= Remove rótulos CIP (R/S) e nomes de compostos do SVG ======= */
export function removeCIPLabelsAndNames(svgString: string): string {
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
export function getContentBounds(svg: SVGSVGElement): ViewBox | null {
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
export function applyThemeToSVG(svg: SVGSVGElement, mode: "dark" | "light") {
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