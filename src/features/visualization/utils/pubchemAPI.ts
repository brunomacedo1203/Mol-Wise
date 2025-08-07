export async function fetchMoleculeData(query: string) {
    try {
      const smilesRes = await fetch(
        `https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name/${query}/property/CanonicalSMILES/TXT`
      );
      const smilesText = await smilesRes.text();
  
      const sdfRes = await fetch(
        `https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name/${query}/SDF`
      );
      const sdfText = await sdfRes.text();
  
      return { smiles: smilesText.trim(), sdf: sdfText };
    } catch (error) {
      console.error("Erro ao buscar molécula:", error);
      return { smiles: "", sdf: "" };
    }
  }
  