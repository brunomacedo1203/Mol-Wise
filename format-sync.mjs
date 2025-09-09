import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Caminho para a pasta de mensagens
const messagesDir = path.join(__dirname, 'src', 'i18n', 'messages');

// Caminhos dos arquivos
const enPath = path.join(messagesDir, 'en.json');
const ptPath = path.join(messagesDir, 'pt.json');

console.log('=== SINCRONIZAÇÃO DE FORMATAÇÃO ===\n');

// Carregar arquivo de referência (en.json) para obter a formatação
const enContent = fs.readFileSync(enPath, 'utf8');
const enData = JSON.parse(enContent);

// Carregar arquivo pt.json
const ptData = JSON.parse(fs.readFileSync(ptPath, 'utf8'));

// Contar linhas antes da formatação
const ptLinesBefore = fs.readFileSync(ptPath, 'utf8').split('\n').length;

console.log(`📄 Antes da formatação:`);
console.log(`   pt.json: ${ptLinesBefore} linhas`);

// Reformatar pt.json com a mesma formatação do en.json (2 espaços de indentação)
const formattedPtContent = JSON.stringify(ptData, null, 2);

// Salvar arquivo reformatado
fs.writeFileSync(ptPath, formattedPtContent, 'utf8');

// Contar linhas após a formatação
const ptLinesAfter = fs.readFileSync(ptPath, 'utf8').split('\n').length;
const enLines = enContent.split('\n').length;

console.log(`\n📄 Após a formatação:`);
console.log(`   en.json: ${enLines} linhas`);
console.log(`   pt.json: ${ptLinesAfter} linhas`);
console.log(`   Diferença: ${Math.abs(enLines - ptLinesAfter)} linhas`);

if (enLines === ptLinesAfter) {
  console.log('\n✅ Formatação sincronizada com sucesso!');
  console.log('🎯 Ambos os arquivos agora têm o mesmo número de linhas.');
} else {
  console.log('\n⚠️  Ainda existe diferença no número de linhas.');
  console.log('📝 Isso pode indicar diferenças estruturais mais profundas.');
}

console.log('\n=== VERIFICAÇÃO FINAL ===');

// Verificar se as chaves ainda estão sincronizadas
function extractKeys(obj, prefix = '') {
  const keys = [];
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const fullKey = prefix ? `${prefix}.${key}` : key;
      if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
        keys.push(...extractKeys(obj[key], fullKey));
      } else {
        keys.push(fullKey);
      }
    }
  }
  return keys;
}

const enKeys = extractKeys(enData).sort();
const ptKeys = extractKeys(ptData).sort();

const keysMatch = JSON.stringify(enKeys) === JSON.stringify(ptKeys);

console.log(`🔑 Chaves sincronizadas: ${keysMatch ? '✅ Sim' : '❌ Não'}`);
console.log(`📊 Total de chaves: en.json(${enKeys.length}) | pt.json(${ptKeys.length})`);

if (keysMatch) {
  console.log('\n🎉 Sincronização completa!');
  console.log('📋 O arquivo pt.json foi reformatado e está sincronizado com en.json.');
} else {
  console.log('\n⚠️  Atenção: As chaves não estão sincronizadas.');
  console.log('🔧 Execute o script sync-translations.mjs novamente se necessário.');
}