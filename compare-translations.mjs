import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Função para extrair todas as chaves de um objeto JSON de forma recursiva
function extractKeys(obj, prefix = "") {
  const keys = [];

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const fullKey = prefix ? `${prefix}.${key}` : key;

      if (
        typeof obj[key] === "object" &&
        obj[key] !== null &&
        !Array.isArray(obj[key])
      ) {
        keys.push(...extractKeys(obj[key], fullKey));
      } else {
        keys.push(fullKey);
      }
    }
  }

  return keys;
}

// Função para comparar dois conjuntos de chaves
function compareKeys(referenceKeys, targetKeys, fileName) {
  const missing = referenceKeys.filter((key) => !targetKeys.includes(key));
  const extra = targetKeys.filter((key) => !referenceKeys.includes(key));

  return {
    fileName,
    missing,
    extra,
    totalReference: referenceKeys.length,
    totalTarget: targetKeys.length,
  };
}

// Caminho para a pasta de mensagens
const messagesDir = path.join(__dirname, "src", "i18n", "messages");

// Carregar arquivo de referência (en.json)
const referencePath = path.join(messagesDir, "en.json");
const referenceData = JSON.parse(fs.readFileSync(referencePath, "utf8"));
const referenceKeys = extractKeys(referenceData).sort();

console.log(`\n=== COMPARAÇÃO DE ARQUIVOS DE TRADUÇÃO ===`);
console.log(
  `Arquivo de referência: en.json (${referenceKeys.length} chaves)\n`
);

// Lista de arquivos para comparar
const filesToCompare = [
  "pt.json",
  "fr.json",
  "de.json",
  "es.json",
  "ar.json",
  "hi.json",
  "ru.json",
  "zh.json",
];

const results = [];

filesToCompare.forEach((fileName) => {
  try {
    const filePath = path.join(messagesDir, fileName);
    const fileData = JSON.parse(fs.readFileSync(filePath, "utf8"));
    const fileKeys = extractKeys(fileData).sort();

    const comparison = compareKeys(referenceKeys, fileKeys, fileName);
    results.push(comparison);

    console.log(`📄 ${fileName}:`);
    console.log(`   Total de chaves: ${comparison.totalTarget}`);

    if (comparison.missing.length > 0) {
      console.log(`   ❌ Chaves faltantes (${comparison.missing.length}):`);
      comparison.missing.forEach((key) => console.log(`      - ${key}`));
    }

    if (comparison.extra.length > 0) {
      console.log(`   ➕ Chaves extras (${comparison.extra.length}):`);
      comparison.extra.forEach((key) => console.log(`      - ${key}`));
    }

    if (comparison.missing.length === 0 && comparison.extra.length === 0) {
      console.log(`   ✅ Arquivo sincronizado com en.json`);
    }

    console.log("");
  } catch (error) {
    console.log(`❌ Erro ao processar ${fileName}: ${error.message}\n`);
  }
});

// Resumo final
console.log(`\n=== RESUMO ===`);
const filesWithIssues = results.filter(
  (r) => r.missing.length > 0 || r.extra.length > 0
);
const filesOk = results.filter(
  (r) => r.missing.length === 0 && r.extra.length === 0
);

console.log(`✅ Arquivos sincronizados: ${filesOk.length}`);
filesOk.forEach((r) => console.log(`   - ${r.fileName}`));

console.log(`\n❌ Arquivos com problemas: ${filesWithIssues.length}`);
filesWithIssues.forEach((r) => {
  console.log(
    `   - ${r.fileName}: ${r.missing.length} faltantes, ${r.extra.length} extras`
  );
});

console.log(`\n📊 Total de chaves de referência: ${referenceKeys.length}`);