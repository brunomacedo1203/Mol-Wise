export async function fetchMoleculeData(query: string) {
  try {
    const smilesRes = await fetch(
      `https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name/${query}/property/CanonicalSMILES/TXT`
    );
    let smilesText = (await smilesRes.text()).trim();

    // Se não houver SMILES válido, seta para string vazia
    if (!smilesText || smilesText.toLowerCase().includes("notfound")) {
      smilesText = "";
    }

    const sdfRes = await fetch(
      `https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name/${query}/SDF`
    );
    const sdfText = await sdfRes.text();

    return { smiles: smilesText, sdf: sdfText };
  } catch (error) {
    console.error("Erro ao buscar molécula:", error);
    return { smiles: "", sdf: "" };
  }
}
