export async function getSdf3D(id: string): Promise<string | null> {
  try {
    const res = await fetch(
      `https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name/${id}/SDF?record_type=3d`
    );

    if (!res.ok) {
      console.warn(`⚠️ Falha ao buscar SDF 3D para '${id}'. Status: ${res.status}`);
      return null;
    }

    return await res.text();
  } catch (err) {
    console.error("❌ Erro ao buscar SDF 3D:", err);
    return null;
  }
}
