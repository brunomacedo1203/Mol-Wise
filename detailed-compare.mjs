import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Função para extrair todas as chaves de um objeto JSON de forma recursiva
function extractKeysWithPaths(obj, prefix = '', result = []) {
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const fullKey = prefix ? `${prefix}.${key}` : key;
      
      if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
        extractKeysWithPaths(obj[key], fullKey, result);
      } else {
        result.push({
          key: fullKey,
          value: obj[key],
          type: typeof obj[key]
        });
      }
    }
  }
  return result;
}

// Função para contar linhas de um arquivo
function countLines(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  return content.split('\n').length;
}

// Função para analisar estrutura JSON
function analyzeJsonStructure(data) {
  const keys = extractKeysWithPaths(data);
  const structure = {
    totalKeys: keys.length,
    stringKeys: keys.filter(k => k.type === 'string').length,
    numberKeys: keys.filter(k => k.type === 'number').length,
    booleanKeys: keys.filter(k => k.type === 'boolean').length,
    arrayKeys: keys.filter(k => k.type === 'object' && Array.isArray(k.value)).length,
    keys: keys.map(k => k.key).sort()
  };
  
  return structure;
}

// Caminho para a pasta de mensagens
const messagesDir = path.join(__dirname, 'src', 'i18n', 'messages');

// Caminhos dos arquivos
const enPath = path.join(messagesDir, 'en.json');
const ptPath = path.join(messagesDir, 'pt.json');

console.log('=== ANÁLISE DETALHADA DE DIFERENÇAS ===\n');

// Contar linhas
const enLines = countLines(enPath);
const ptLines = countLines(ptPath);

console.log(`📄 Contagem de linhas:`);
console.log(`   en.json: ${enLines} linhas`);
console.log(`   pt.json: ${ptLines} linhas`);
console.log(`   Diferença: ${Math.abs(enLines - ptLines)} linhas\n`);

// Carregar e analisar arquivos JSON
const enData = JSON.parse(fs.readFileSync(enPath, 'utf8'));
const ptData = JSON.parse(fs.readFileSync(ptPath, 'utf8'));

const enStructure = analyzeJsonStructure(enData);
const ptStructure = analyzeJsonStructure(ptData);

console.log(`🔍 Análise estrutural:`);
console.log(`   en.json: ${enStructure.totalKeys} chaves (${enStructure.stringKeys} strings, ${enStructure.numberKeys} números, ${enStructure.booleanKeys} booleanos)`);
console.log(`   pt.json: ${ptStructure.totalKeys} chaves (${ptStructure.stringKeys} strings, ${ptStructure.numberKeys} números, ${ptStructure.booleanKeys} booleanos)`);
console.log(`   Diferença de chaves: ${Math.abs(enStructure.totalKeys - ptStructure.totalKeys)}\n`);

// Comparar chaves
const enKeys = new Set(enStructure.keys);
const ptKeys = new Set(ptStructure.keys);

const missingInPt = enStructure.keys.filter(key => !ptKeys.has(key));
const extraInPt = ptStructure.keys.filter(key => !enKeys.has(key));
const commonKeys = enStructure.keys.filter(key => ptKeys.has(key));

console.log(`🔄 Comparação de chaves:`);
console.log(`   Chaves comuns: ${commonKeys.length}`);
console.log(`   Faltantes em pt.json: ${missingInPt.length}`);
console.log(`   Extras em pt.json: ${extraInPt.length}\n`);

if (missingInPt.length > 0) {
  console.log(`❌ Chaves faltantes em pt.json:`);
  missingInPt.forEach(key => console.log(`   - ${key}`));
  console.log('');
}

if (extraInPt.length > 0) {
  console.log(`➕ Chaves extras em pt.json:`);
  extraInPt.forEach(key => console.log(`   - ${key}`));
  console.log('');
}

// Verificar diferenças de formatação
const enContent = fs.readFileSync(enPath, 'utf8');
const ptContent = fs.readFileSync(ptPath, 'utf8');

// Analisar espaçamento e formatação
const enEmptyLines = (enContent.match(/^\s*$/gm) || []).length;
const ptEmptyLines = (ptContent.match(/^\s*$/gm) || []).length;

const enIndentedLines = (enContent.match(/^\s+/gm) || []).length;
const ptIndentedLines = (ptContent.match(/^\s+/gm) || []).length;

console.log(`📐 Análise de formatação:`);
console.log(`   en.json: ${enEmptyLines} linhas vazias, ${enIndentedLines} linhas indentadas`);
console.log(`   pt.json: ${ptEmptyLines} linhas vazias, ${ptIndentedLines} linhas indentadas`);
console.log(`   Diferença de linhas vazias: ${Math.abs(enEmptyLines - ptEmptyLines)}`);
console.log(`   Diferença de linhas indentadas: ${Math.abs(enIndentedLines - ptIndentedLines)}\n`);

// Verificar se há diferenças no final do arquivo
const enEndsWithNewline = enContent.endsWith('\n');
const ptEndsWithNewline = ptContent.endsWith('\n');

console.log(`📝 Final do arquivo:`);
console.log(`   en.json termina com nova linha: ${enEndsWithNewline}`);
console.log(`   pt.json termina com nova linha: ${ptEndsWithNewline}`);

if (enEndsWithNewline !== ptEndsWithNewline) {
  console.log(`   ⚠️  Diferença detectada no final do arquivo!`);
}

console.log('\n=== RESUMO ===');
if (missingInPt.length === 0 && extraInPt.length === 0) {
  console.log('✅ As chaves JSON estão sincronizadas');
  console.log('⚠️  A diferença de linhas pode ser devido a:');
  console.log('   - Formatação diferente (espaçamento, indentação)');
  console.log('   - Linhas vazias extras');
  console.log('   - Diferenças no final do arquivo');
} else {
  console.log('❌ Existem diferenças nas chaves JSON que precisam ser corrigidas');
}