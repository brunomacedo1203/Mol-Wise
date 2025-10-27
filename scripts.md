# 📋 Documentação dos Scripts do Projeto

## 🎯 Visão Geral

Este documento lista todos os scripts disponíveis no projeto Mol Class, suas funcionalidades e instruções de execução.

---

## 🔧 Scripts de Tradução e Internacionalização

### 1. `compare-translations.mjs`

**Funcionalidade:** Compara todos os arquivos de tradução com o arquivo de referência `en.json` para identificar chaves faltantes ou extras.

**Como executar:**

```bash
node compare-translations.mjs
```

**O que faz:**

- Analisa todos os arquivos de tradução (pt, fr, de, es, ar, hi, ru, zh)
- Identifica chaves faltantes em cada arquivo
- Identifica chaves extras que não existem no arquivo de referência
- Gera relatório detalhado do status de sincronização

**Saída esperada:**

- Lista de arquivos sincronizados
- Lista de arquivos com problemas
- Detalhes das chaves faltantes/extras por arquivo

---

### 2. `sync-translations.mjs`

**Funcionalidade:** Sincroniza automaticamente todos os arquivos de tradução com o arquivo de referência `en.json`.

**Como executar:**

```bash
node sync-translations.mjs
```

**O que faz:**

- Adiciona chaves faltantes com placeholders de tradução
- Remove chaves extras que não existem no arquivo de referência
- Mantém a estrutura hierárquica dos objetos JSON
- Preserva traduções existentes
- Gera backup automático antes das modificações

**⚠️ Atenção:** Este script modifica os arquivos de tradução. Sempre faça backup antes de executar.

---

### 3. `detailed-compare.mjs`

**Funcionalidade:** Realiza análise detalhada de diferenças entre arquivos de tradução, incluindo formatação e estrutura.

**Como executar:**

```bash
node detailed-compare.mjs
```

**O que faz:**

- Conta linhas e analisa formatação
- Compara estrutura JSON (tipos de dados, hierarquia)
- Identifica diferenças de indentação e espaçamento
- Verifica final de arquivo e quebras de linha
- Analisa chaves comuns, faltantes e extras

**Ideal para:** Debugging de problemas de formatação e estrutura.

---

### 4. `line-by-line-compare.mjs`

**Funcionalidade:** Compara arquivos linha por linha para identificar diferenças específicas de formatação.

**Como executar:**

```bash
node line-by-line-compare.mjs
```

**O que faz:**

- Compara cada linha dos arquivos `en.json` e `pt.json`
- Identifica linhas extras, ausentes ou diferentes
- Mostra contexto das primeiras e últimas linhas
- Categoriza tipos de diferenças encontradas

**Ideal para:** Investigar diferenças específicas de formatação entre arquivos.

---

### 5. `format-sync.mjs`

**Funcionalidade:** Sincroniza a formatação de arquivos de tradução com o padrão do arquivo de referência.

**Como executar:**

```bash
node format-sync.mjs
```

**O que faz:**

- Reformata arquivos JSON com indentação padrão (2 espaços)
- Mantém a mesma estrutura de formatação do `en.json`
- Verifica se as chaves permanecem sincronizadas após formatação
- Compara número de linhas antes e depois da formatação

---

## 🌐 Scripts de SEO e Sitemap

### 6. `generate-sitemap.cjs`

**Funcionalidade:** Gera sitemap XML para otimização de SEO.

**Como executar:**

```bash
node generate-sitemap.cjs
```

**O que faz:**

- Gera arquivo `sitemap.xml` na pasta `public`
- Inclui todas as rotas da aplicação
- Considera múltiplos idiomas
- Define prioridades e frequências de atualização

---

## 📦 Scripts NPM (package.json)

### Scripts de Desenvolvimento

```bash
# Iniciar servidor de desenvolvimento
npm run dev
# ou
yarn dev

# Construir aplicação para produção
npm run build
# ou
yarn build

# Iniciar aplicação em produção
npm start
# ou
yarn start

# Executar linting
npm run lint
# ou
yarn lint
```

---

## 🔄 Fluxo de Trabalho Recomendado

### Para Sincronização de Traduções:

1. **Verificar status atual:**

   ```bash
   node compare-translations.mjs
   ```

2. **Sincronizar arquivos (se necessário):**

   ```bash
   node sync-translations.mjs
   ```

3. **Verificar sincronização:**

   ```bash
   node compare-translations.mjs
   ```

4. **Análise detalhada (se houver problemas):**
   ```bash
   node detailed-compare.mjs
   ```

### Para Debugging de Formatação:

1. **Análise detalhada:**

   ```bash
   node detailed-compare.mjs
   ```

2. **Comparação linha por linha:**

   ```bash
   node line-by-line-compare.mjs
   ```

3. **Sincronizar formatação:**
   ```bash
   node format-sync.mjs
   ```

---

## 📁 Estrutura de Arquivos Relacionados

```
e:\Projetos\molclass\
├── compare-translations.mjs     # Comparação de traduções
├── sync-translations.mjs        # Sincronização de traduções
├── detailed-compare.mjs         # Análise detalhada
├── line-by-line-compare.mjs     # Comparação linha por linha
├── format-sync.mjs              # Sincronização de formatação
├── generate-sitemap.cjs         # Geração de sitemap
├── package.json                 # Scripts NPM
└── src\i18n\messages\           # Arquivos de tradução
    ├── en.json                  # Arquivo de referência
    ├── pt.json                  # Português
    ├── fr.json                  # Francês
    ├── de.json                  # Alemão
    ├── es.json                  # Espanhol
    ├── ar.json                  # Árabe
    ├── hi.json                  # Hindi
    ├── ru.json                  # Russo
    └── zh.json                  # Chinês
```

---

## ⚠️ Notas Importantes

1. **Backup:** Sempre faça backup dos arquivos de tradução antes de executar scripts que modificam arquivos.

2. **Ordem de execução:** Execute `compare-translations.mjs` antes de `sync-translations.mjs` para entender o que será modificado.

3. **Arquivo de referência:** O arquivo `en.json` é sempre usado como referência. Não modifique sua estrutura sem atualizar os outros arquivos.

4. **Placeholders:** Após sincronização, traduza os placeholders marcados com `[IDIOMA]` para o idioma correspondente.

5. **Formatação:** Use `format-sync.mjs` apenas se houver problemas específicos de formatação que afetem a funcionalidade.

---

## 🆘 Solução de Problemas

### Erro: "Cannot find module"

- Certifique-se de estar no diretório raiz do projeto
- Verifique se o Node.js está instalado

### Erro: "SyntaxError: Cannot use import statement outside a module"

- Os scripts usam extensão `.mjs` para suporte a ES modules
- Execute com `node script.mjs` (não `.js`)

### Arquivos não sincronizando

1. Execute `detailed-compare.mjs` para análise detalhada
2. Verifique se o arquivo `en.json` está íntegro
3. Execute `sync-translations.mjs` novamente

---

_Documentação atualizada em: $(date)_
_Versão do projeto: Mol Class v1.0_
