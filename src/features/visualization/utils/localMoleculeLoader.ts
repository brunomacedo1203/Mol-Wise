let manifestCache: Record<string, string> | null = null;

async function loadManifest(): Promise<Record<string, string>> {
  if (manifestCache) return manifestCache;
  try {
    const res = await fetch("/data/molecules/manifest.json");
    if (res.ok) {
      manifestCache = (await res.json()) as Record<string, string>;
    } else {
      manifestCache = {};
    }
  } catch {
    manifestCache = {};
  }
  return manifestCache;
}

// Fallback embutido para garantir H2O mesmo sem manifest.json (opcional)
const BUILTIN: Record<string, string> = {
  h2o: "h2o",
  water: "h2o",
  "7732185": "h2o",
};

export async function loadLocalMolecule(rawKey: string) {
  try {
    const key = rawKey.trim().toLowerCase();
    const manifest = await loadManifest();

    // Só tenta buscar arquivo se existir no manifest ou no fallback BUILTIN
    const base = manifest[key] ?? BUILTIN[key];
    if (!base) return null;

    const basePath = `/data/molecules/${base}`;
    const [smilesRes, sdfRes] = await Promise.all([
      fetch(`${basePath}.smiles`),
      fetch(`${basePath}.sdf`),
    ]);

    if (!smilesRes.ok || !sdfRes.ok) return null;

    const [smiles, sdf] = await Promise.all([smilesRes.text(), sdfRes.text()]);
    console.info(`✅ Molécula "${rawKey}" carregada localmente como "${base}".`);
    return { smiles, sdf };
  } catch (err) {
    console.error("❌ Erro ao carregar molécula local:", err);
    return null;
  }
}
