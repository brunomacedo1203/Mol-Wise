// src/features/visualization/utils/translation/translationPubChem.ts

/* -------------------------------
   🔍 CONSULTA NA PUBCHEM
-------------------------------- */
export async function pubchemHasName(name: string): Promise<boolean> {
  const base = "https://pubchem.ncbi.nlm.nih.gov/rest/pug";
  const candidates = [
    encodeURIComponent(name),
    name.replace(/ /g, "%20"),
    name.replace(/ /g, "+"),
  ];
  for (const enc of candidates) {
    const url = `${base}/compound/name/${enc}/cids/TXT`;
    try {
      const r = await fetch(url, { cache: "no-store" });
      if (r.ok) {
        const txt = (await r.text()).trim();
        if (txt && /^\d+/.test(txt)) return true;
      }
    } catch {
      // ignora
    }
  }
  return false;
}

/* -------------------------------
   🧩 VARIAÇÕES DE NOMES COMUNS
-------------------------------- */
export function generateNameVariants(en: string): string[] {
  const variants: string[] = [];
  const s = en.toLowerCase().trim();

  const mapPairs: Array<[RegExp, string]> = [
    [/ferric oxide\b/, "iron(III) oxide"],
    [/ferrous oxide\b/, "iron(II) oxide"],
    [/cupric oxide\b/, "copper(II) oxide"],
    [/cuprous oxide\b/, "copper(I) oxide"],
    [/iron\(iii\) oxide\b/, "ferric oxide"],
    [/iron\(ii\) oxide\b/, "ferrous oxide"],
    [/copper\(ii\) oxide\b/, "cupric oxide"],
    [/copper\(i\) oxide\b/, "cuprous oxide"],
  ];

  for (const [re, rep] of mapPairs) {
    if (re.test(s)) variants.push(s.replace(re, rep));
  }
  
  // Common automatic cross-language heuristics
  const LATIN_ENDINGS: Array<[RegExp, string]> = [
    [/ia$/, "y"],       // amonia → ammony → ammonia (later handled)
    [/io$/, "ium"],     // sodio → sodium
    [/ico$/, "ic"],     // nitrico → nitric
    [/ato$/, "ate"],    // nitrato → nitrate
    [/ito$/, "ite"],    // sulfito → sulfite
    [/uro$/, "ide"],    // cloruro → chloride
    [/ina$/, "ine"],    // adicina → adicine (for bases)
  ];

  // 🌐 heurísticas automáticas simples
  for (const [re, rep] of LATIN_ENDINGS) {
    if (re.test(s)) variants.push(s.replace(re, rep));
  }

  // Caso especial direto
  /*if (s === "amonia" || s === "amoníaco" || s === "amoniaco") {
    variants.push("ammonia");
  }*/

  // 🌍 Heurísticas automáticas baseadas em terminações e similaridade fonética
  const latinHeuristics: Array<[RegExp, string]> = [
    [/ia$/, "y"],       // amonia → amony → ammonia
    [/io$/, "ium"],     // sodio → sodium
    [/ico$/, "ic"],     // nitrico → nitric
    [/ato$/, "ate"],    // nitrato → nitrate
    [/ito$/, "ite"],    // sulfito → sulfite
    [/uro$/, "ide"],    // cloruro → chloride
    [/ina$/, "ine"],    // adicina → adicine (bases)
    [/eno$/, "ene"],    // metano → methane
    [/ano$/, "ane"],    // etano → ethane
    [/eno$/, "ene"],    // propileno → propylene
    [/ol$/, "ol"],      // álcool → alcohol (casos já parecidos)
  ];

  for (const [pattern, replacement] of latinHeuristics) {
    if (pattern.test(s)) {
      const heuristicVariant = s.replace(pattern, replacement);
      variants.push(heuristicVariant);
    }
  }

  // 🔊 Caso específico: "amonia" → "ammonia"
  if (s === "amonia" || s === "amoníaco" || s === "amoniaco") {
    variants.push("ammonia");
  }

  return Array.from(new Set(variants));
}
