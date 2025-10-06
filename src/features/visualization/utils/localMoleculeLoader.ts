export async function loadLocalMolecule(key: string) {
  try {
    const basePath = `/data/molecules/${key.toLowerCase()}`;
    const [smilesRes, sdfRes] = await Promise.allSettled([
      fetch(`${basePath}.smiles`),
      fetch(`${basePath}.sdf`),
    ]);

    if (
      smilesRes.status !== "fulfilled" ||
      sdfRes.status !== "fulfilled" ||
      !smilesRes.value.ok ||
      !sdfRes.value.ok
    ) {
      return null; 
    }

    const smiles = await smilesRes.value.text();
    const sdf = await sdfRes.value.text();
    return { smiles, sdf };
  } catch (err) {
    console.error("❌ Erro ao carregar molécula local:", err);
    return null;
  }
}
