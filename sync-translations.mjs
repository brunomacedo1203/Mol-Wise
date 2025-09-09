import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Função para extrair todas as chaves de um objeto JSON de forma recursiva
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

// Função para obter valor de uma chave aninhada
function getNestedValue(obj, keyPath) {
  return keyPath.split('.').reduce((current, key) => current && current[key], obj);
}

// Função para definir valor de uma chave aninhada
function setNestedValue(obj, keyPath, value) {
  const keys = keyPath.split('.');
  const lastKey = keys.pop();
  const target = keys.reduce((current, key) => {
    if (!current[key] || typeof current[key] !== 'object') {
      current[key] = {};
    }
    return current[key];
  }, obj);
  target[lastKey] = value;
}

// Função para remover uma chave aninhada
function removeNestedKey(obj, keyPath) {
  const keys = keyPath.split('.');
  const lastKey = keys.pop();
  const target = keys.reduce((current, key) => current && current[key], obj);
  if (target && target.hasOwnProperty(lastKey)) {
    delete target[lastKey];
  }
}

// Função para limpar objetos vazios
function cleanEmptyObjects(obj) {
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
        cleanEmptyObjects(obj[key]);
        if (Object.keys(obj[key]).length === 0) {
          delete obj[key];
        }
      }
    }
  }
}

// Função para sincronizar um arquivo com o de referência
function syncTranslationFile(referenceData, targetFilePath, fileName) {
  console.log(`\n🔄 Sincronizando ${fileName}...`);
  
  try {
    const targetData = JSON.parse(fs.readFileSync(targetFilePath, 'utf8'));
    const referenceKeys = extractKeys(referenceData);
    const targetKeys = extractKeys(targetData);
    
    const missingKeys = referenceKeys.filter(key => !targetKeys.includes(key));
    const extraKeys = targetKeys.filter(key => !referenceKeys.includes(key));
    
    console.log(`   📊 Chaves faltantes: ${missingKeys.length}`);
    console.log(`   📊 Chaves extras: ${extraKeys.length}`);
    
    // Adicionar chaves faltantes com placeholder
    missingKeys.forEach(key => {
      const referenceValue = getNestedValue(referenceData, key);
      setNestedValue(targetData, key, `[${fileName.replace('.json', '').toUpperCase()}] ${referenceValue}`);
    });
    
    // Remover chaves extras
    extraKeys.forEach(key => {
      removeNestedKey(targetData, key);
    });
    
    // Limpar objetos vazios
    cleanEmptyObjects(targetData);
    
    // Salvar arquivo sincronizado
    fs.writeFileSync(targetFilePath, JSON.stringify(targetData, null, 2), 'utf8');
    
    console.log(`   ✅ ${fileName} sincronizado com sucesso!`);
    
    if (missingKeys.length > 0) {
      console.log(`   📝 Chaves adicionadas com placeholder para tradução:`);
      missingKeys.slice(0, 5).forEach(key => console.log(`      - ${key}`));
      if (missingKeys.length > 5) {
        console.log(`      ... e mais ${missingKeys.length - 5} chaves`);
      }
    }
    
    return {
      fileName,
      success: true,
      missingAdded: missingKeys.length,
      extraRemoved: extraKeys.length
    };
    
  } catch (error) {
    console.log(`   ❌ Erro ao sincronizar ${fileName}: ${error.message}`);
    return {
      fileName,
      success: false,
      error: error.message
    };
  }
}

// Caminho para a pasta de mensagens
const messagesDir = path.join(__dirname, 'src', 'i18n', 'messages');

// Carregar arquivo de referência (en.json)
const referencePath = path.join(messagesDir, 'en.json');
const referenceData = JSON.parse(fs.readFileSync(referencePath, 'utf8'));

console.log(`\n=== SINCRONIZAÇÃO DE ARQUIVOS DE TRADUÇÃO ===`);
console.log(`Arquivo de referência: en.json`);
console.log(`Total de chaves de referência: ${extractKeys(referenceData).length}\n`);

// Lista de arquivos para sincronizar
const filesToSync = ['pt.json', 'fr.json', 'de.json', 'es.json', 'ar.json', 'hi.json', 'ru.json', 'zh.json'];

const results = [];

filesToSync.forEach(fileName => {
  const filePath = path.join(messagesDir, fileName);
  const result = syncTranslationFile(referenceData, filePath, fileName);
  results.push(result);
});

// Resumo final
console.log(`\n\n=== RESUMO DA SINCRONIZAÇÃO ===`);
const successfulSyncs = results.filter(r => r.success);
const failedSyncs = results.filter(r => !r.success);

console.log(`✅ Arquivos sincronizados com sucesso: ${successfulSyncs.length}`);
successfulSyncs.forEach(r => {
  console.log(`   - ${r.fileName}: +${r.missingAdded} chaves, -${r.extraRemoved} chaves`);
});

if (failedSyncs.length > 0) {
  console.log(`\n❌ Arquivos com erro: ${failedSyncs.length}`);
  failedSyncs.forEach(r => {
    console.log(`   - ${r.fileName}: ${r.error}`);
  });
}

const totalAdded = successfulSyncs.reduce((sum, r) => sum + r.missingAdded, 0);
const totalRemoved = successfulSyncs.reduce((sum, r) => sum + r.extraRemoved, 0);

console.log(`\n📊 Total de chaves adicionadas: ${totalAdded}`);
console.log(`📊 Total de chaves removidas: ${totalRemoved}`);
console.log(`\n🎯 Todos os arquivos agora têm a mesma estrutura do en.json!`);
console.log(`⚠️  Lembre-se de traduzir os placeholders marcados com [IDIOMA] para o idioma correspondente.`);