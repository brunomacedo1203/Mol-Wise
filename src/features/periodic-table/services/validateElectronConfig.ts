import elementsData from "../data/elementsData";

const maxElectrons: Record<string, number> = { s: 2, p: 6, d: 10, f: 14 };

function validateElectronConfig(config: string) {
  const regex = /([spdf])(\d+)/g;
  let match;
  const errors: string[] = [];
  while ((match = regex.exec(config)) !== null) {
    const [_, sublevel, count] = match;
    if (parseInt(count) > maxElectrons[sublevel]) {
      errors.push(`${sublevel}${count}`);
    }
  }
  return errors;
}

function main() {
  let hasError = false;
  elementsData.forEach((el) => {
    if (el.electronConfiguration) {
      const errors = validateElectronConfig(el.electronConfiguration);
      if (errors.length > 0) {
        hasError = true;
        console.log(
          `Inconsistência em ${el.name} (${el.symbol}): ${errors.join(", ")} na configuração "${el.electronConfiguration}"`
        );
      }
    }
  });
  if (!hasError) {
    console.log("Todas as configurações eletrônicas estão corretas quanto aos expoentes máximos.");
  }
}

main(); 