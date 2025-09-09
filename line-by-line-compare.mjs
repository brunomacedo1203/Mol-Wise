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

console.log('=== COMPARAÇÃO LINHA POR LINHA ===\n');

// Carregar conteúdo dos arquivos
const enContent = fs.readFileSync(enPath, 'utf8');
const ptContent = fs.readFileSync(ptPath, 'utf8');

// Dividir em linhas
const enLines = enContent.split('\n');
const ptLines = ptContent.split('\n');

console.log(`📄 Total de linhas:`);
console.log(`   en.json: ${enLines.length} linhas`);
console.log(`   pt.json: ${ptLines.length} linhas`);
console.log(`   Diferença: ${Math.abs(enLines.length - ptLines.length)} linhas\n`);

// Encontrar diferenças linha por linha
const maxLines = Math.max(enLines.length, ptLines.length);
const differences = [];

for (let i = 0; i < maxLines; i++) {
  const enLine = enLines[i] || '[LINHA AUSENTE]';
  const ptLine = ptLines[i] || '[LINHA AUSENTE]';
  
  if (enLine !== ptLine) {
    differences.push({
      lineNumber: i + 1,
      enLine: enLine,
      ptLine: ptLine,
      type: enLine === '[LINHA AUSENTE]' ? 'EXTRA_PT' : 
            ptLine === '[LINHA AUSENTE]' ? 'EXTRA_EN' : 'DIFFERENT'
    });
  }
}

console.log(`🔍 Diferenças encontradas: ${differences.length}`);

if (differences.length > 0) {
  console.log('\n📋 Detalhes das diferenças:\n');
  
  differences.forEach((diff, index) => {
    if (index < 20) { // Limitar a 20 diferenças para não sobrecarregar
      console.log(`${index + 1}. Linha ${diff.lineNumber} (${diff.type}):`);
      
      if (diff.type === 'EXTRA_EN') {
        console.log(`   EN: "${diff.enLine}"`);
        console.log(`   PT: [AUSENTE]`);
      } else if (diff.type === 'EXTRA_PT') {
        console.log(`   EN: [AUSENTE]`);
        console.log(`   PT: "${diff.ptLine}"`);
      } else {
        console.log(`   EN: "${diff.enLine}"`);
        console.log(`   PT: "${diff.ptLine}"`);
      }
      console.log('');
    }
  });
  
  if (differences.length > 20) {
    console.log(`... e mais ${differences.length - 20} diferenças.\n`);
  }
} else {
  console.log('\n✅ Nenhuma diferença encontrada nas linhas!');
}

// Análise de tipos de diferenças
const extraEn = differences.filter(d => d.type === 'EXTRA_EN').length;
const extraPt = differences.filter(d => d.type === 'EXTRA_PT').length;
const different = differences.filter(d => d.type === 'DIFFERENT').length;

console.log('📊 Resumo das diferenças:');
console.log(`   Linhas extras em en.json: ${extraEn}`);
console.log(`   Linhas extras em pt.json: ${extraPt}`);
console.log(`   Linhas diferentes: ${different}`);

// Verificar se a diferença de 9 linhas corresponde às linhas extras
const expectedDiff = Math.abs(enLines.length - ptLines.length);
const actualExtraDiff = Math.abs(extraEn - extraPt);

console.log(`\n🎯 Verificação:`);
console.log(`   Diferença esperada: ${expectedDiff} linhas`);
console.log(`   Diferença real (extras): ${actualExtraDiff} linhas`);

if (expectedDiff === actualExtraDiff) {
  console.log('   ✅ A diferença corresponde às linhas extras!');
} else {
  console.log('   ⚠️  A diferença não corresponde completamente.');
}

// Mostrar as primeiras e últimas linhas para contexto
console.log('\n📝 Contexto dos arquivos:');
console.log('\n🔝 Primeiras 3 linhas:');
for (let i = 0; i < Math.min(3, Math.max(enLines.length, ptLines.length)); i++) {
  console.log(`   ${i + 1}. EN: "${enLines[i] || '[AUSENTE]'}"`);  
  console.log(`      PT: "${ptLines[i] || '[AUSENTE]'}"`);  
}

console.log('\n🔚 Últimas 3 linhas:');
const startIdx = Math.max(0, Math.max(enLines.length, ptLines.length) - 3);
for (let i = startIdx; i < Math.max(enLines.length, ptLines.length); i++) {
  console.log(`   ${i + 1}. EN: "${enLines[i] || '[AUSENTE]'}"`);  
  console.log(`      PT: "${ptLines[i] || '[AUSENTE]'}"`);  
}