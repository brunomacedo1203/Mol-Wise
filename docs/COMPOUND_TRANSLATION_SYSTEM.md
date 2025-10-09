# 🧪 Mol Class Translation Engine

**Local:** `src/features/visualization/utils/translation/`
**Responsável:** `translateNameToEnglish`
**Descrição:**
Sistema de tradução química modular, projetado para interpretar, traduzir e normalizar nomes de substâncias químicas em múltiplos idiomas, integrando heurísticas químicas, dicionários locais, cache inteligente e validação via PubChem.

---

## 📁 Estrutura do Módulo

```
translation/
├── index.ts                     → Função pública principal `translateNameToEnglish`
├── translationPatterns.ts       → Heurísticas de tradução química (padrões inteligentes)
├── translationHelpers.ts        → Funções auxiliares (cache, normalização, logs, idioma)
├── translationPubChem.ts        → Integração e validação com PubChem API
└── translationPostProcess.ts    → Pós-processamento e correções linguísticas
```

---

## ⚙️ 1. Overview Arquitetural

A engine é organizada como um **pipeline de tradução inteligente** com camadas independentes:

| Etapa | Módulo                     | Descrição                                                           |
| ----- | -------------------------- | ------------------------------------------------------------------- |
| 1️⃣    | **translationHelpers**     | Normaliza texto, remove acentos, gerencia cache e logs.             |
| 2️⃣    | **translationPatterns**    | Aplica heurísticas químicas (`ácido`, `óxido`, `sal`, etc).         |
| 3️⃣    | **translationPubChem**     | Verifica se o nome traduzido é reconhecido pela PubChem.            |
| 4️⃣    | **translationPostProcess** | Corrige e reorganiza termos após tradução automática.               |
| 5️⃣    | **index.ts**               | Coordena todo o fluxo, unificando dicionário, cache e fallback API. |

---

## 🧠 2. Fluxo de Execução

```text
Entrada: "ácido lático"

↓ Normalização
"acido latico"

↓ Heurísticas (translationPatterns)
→ trySmartAcidTranslation → "lactic acid"

↓ Pós-processamento
→ normalizeToASCII("lactic acid")

↓ Verificação PubChem (translationPubChem)
→ CID válido encontrado

↓ Cache Local
→ Armazenado por 30 dias

✅ Saída Final: "lactic acid"
```

---

## 🧉 3. Módulos em Detalhe

### 🔹 `index.ts`

**Ponto de entrada principal**

Responsável por:

- Coordenar a execução sequencial das heurísticas.
- Integrar o dicionário químico local (`findInChemicalDictionary`).
- Consultar o cache antes de recorrer à API externa.
- Fazer fallback para `/api/translate` apenas em último caso.

**Principais etapas:**

```ts
translateNameToEnglish(name):
  1. normalize(name)
  2. checkCache()
  3. findInChemicalDictionary()
  4. applyTranslationPatterns()
  5. callLibreTranslateIfNeeded()
  6. postProcessChemicalTranslation()
  7. verifyWithPubChem()
  8. saveCache()
```

---

### 🔹 `translationPatterns.ts`

**Núcleo heurístico de tradução local.**

Cada função `trySmartXTranslation()` detecta e traduz padrões químicos específicos usando o `LEXICON`.

| Função                         | Padrão Detectado             | Exemplo                | Resultado         |
| ------------------------------ | ---------------------------- | ---------------------- | ----------------- |
| `trySmartAcidTranslation`      | `ácido X`                    | ácido sulfúrico        | sulfuric acid     |
| `trySmartOxideTranslation`     | `óxido de X` / `óxido X`     | óxido de ferro (III)   | iron(III) oxide   |
| `trySmartHydroxideTranslation` | `hidróxido de X`             | hidróxido de sódio     | sodium hydroxide  |
| `trySmartSaltTranslation`      | `X de Y` (sais)              | nitrato de potássio    | potassium nitrate |
| `trySmartBinaryTranslation`    | compostos genéricos `A de B` | cloreto de sódio       | sodium chloride   |
| `trySmartPeroxideTranslation`  | `peróxido de X`              | peróxido de hidrogênio | hydrogen peroxide |

**Extensível:**
Basta adicionar novas funções seguindo o padrão:

```ts
export function trySmartXTranslation(name: string): string | null {
  const pattern = /regex/i;
  // lógica de tradução
  return translatedName;
}
```

---

### 🔹 `translationHelpers.ts`

**Funções utilitárias universais**

| Função                        | Descrição                                                 |
| ----------------------------- | --------------------------------------------------------- |
| `normalizeToASCII(text)`      | Remove acentos, caracteres especiais e múltiplos espaços. |
| `stripDiacritics(text)`       | Mantém letras ASCII puras.                                |
| `loadCache()` / `saveCache()` | Lê e grava cache persistente (`localStorage`).            |
| `cleanOldEntries()`           | Remove itens expirados (TTL = 30 dias).                   |
| `detectLanguage(text)`        | (opcional) Detecta idioma da entrada.                     |
| `logTranslationStep()`        | Exibe logs agrupados no console para depuração.           |

**Exemplo de log:**

```
[translateNameToEnglish] 🔍 "ácido lático"
✅ Dicionário: lactic acid
💾 Cache salvo: molclass:translation-cache
```

---

### 🔹 `translationPubChem.ts`

**Validação e fallback de nomes químicos**

Integra-se à REST API da PubChem para:

- Verificar se o nome traduzido existe.
- Retornar variações possíveis (nome preferido, sinônimos, CID, SMILES).
- Fazer fallback automático em caso de 404.

**Exemplo de uso:**

```ts
const verified = await verifyPubChemName("sulfuric acid");
// → { valid: true, cid: 1118, smiles: "O=S(=O)(O)O" }
```

---

### 🔹 `translationPostProcess.ts`

**Limpeza e reorganização final da tradução**

- Remove artigos e palavras irrelevantes (`the`, `a`, `an`).
- Corrige ordem “acid sulfuric” → “sulfuric acid”.
- Converte “hydroxide of ammonia” → “ammonium hydroxide”.
- Aplica mapeamento de correção semântica (`acid nitric` → `nitric acid`).

**Regras básicas:**

```ts
acid sulfuric → sulfuric acid
acid acetic → acetic acid
acid formic → formic acid
acid phosphoric → phosphoric acid
acid lactic → lactic acid
```

---

## 🧠 4. Cache e Persistência

| Tipo         | Local          | TTL        | Chave                         |
| ------------ | -------------- | ---------- | ----------------------------- |
| LocalStorage | Navegador      | 30 dias    | `molclass:translation-cache`  |
| In-memory    | Backend (Node) | 30 minutos | `${source}:${target}:${term}` |

**Política de limpeza:**

- Executada a cada carregamento do app.
- Remove entradas cujo timestamp exceda `CACHE_TTL_DAYS * 24h`.

---

## 🌍 5. Integração com `/api/translate`

A API é chamada **apenas quando todas as heurísticas locais falham**.
Ela consulta:

1. **LEXICON** local (anions, cations, acids).
2. **LibreTranslate / Argos** para fallback automático.
3. Retorna `{ translatedText: "..." }` padronizado.

---

## 🔬 6. Pós-Processamento e Correções

Padrões tratados no `translationPostProcess.ts`:

| Padrão                 | Correção             |
| ---------------------- | -------------------- |
| `acid sulfuric`        | `sulfuric acid`      |
| `acid nitric`          | `nitric acid`        |
| `acid hydrochloric`    | `hydrochloric acid`  |
| `hydroxide of ammonia` | `ammonium hydroxide` |
| `acid lactic`          | `lactic acid`        |

---

## 🧱 7. Exemplo de Log Completo

```
[translateNameToEnglish] 🔍 "óxido de ferro (III)"
→ [trySmartOxideTranslation] (número romano detectado)
✅ "iron(III) oxide"
💾 Cache salvo: molclass:translation-cache
```

```
[translateNameToEnglish] 🔍 "nitrato de chumbo"
→ [trySmartSaltTranslation] "lead nitrate"
→ [translationPubChem] CID encontrado: 24423
✅ Tradução validada e armazenada
```

---

## 🚀 8. Extensibilidade

| Categoria                | Exemplo de expansão                                         |
| ------------------------ | ----------------------------------------------------------- |
| Novas heurísticas        | `trySmartPeroxideTranslation`, `trySmartHydrateTranslation` |
| Novos idiomas            | Adicionar `detectLanguage` → redirecionar sourceLang        |
| Suporte avançado PubChem | Buscar descritores adicionais (IUPACName, MolecularFormula) |
| Cache híbrido            | Redis ou IndexedDB para persistência offline                |

---

## ✅ 9. Benefícios da Arquitetura Modular

- **Alta legibilidade** → cada módulo com responsabilidade única.
- **Facilidade de testes unitários** → cada `trySmartXTranslation` pode ser testado isoladamente.
- **Reuso em outros contextos** → como o módulo “Catalog” ou “Visualization”.
- **Resiliência a falhas** → múltiplos fallbacks (LEXICON → heurística → API → PubChem).
- **Performance** → reduz chamadas de rede em mais de 90% após aquecimento do cache.

---

## 🧟‍♂️ 10. Conclusão

O novo módulo de tradução química do Mol Class é uma **engine de NLP especializada para terminologia científica**, combinando:

- Linguística aplicada à Química;
- Cache e fallback otimizados;
- Verificação semântica em base científica (PubChem).

Essa arquitetura garante **precisão, desempenho e extensibilidade** — sendo um dos pilares mais robustos do ecossistema Mol Class.

---

> **Autor:** Bruno Macedo
> **Última atualização:** 09/10/2025
> **Local:** `src/features/visualization/utils/translation/`

---

## 🔄 Atualizações recentes (09/10/2025)

### Fallback fonético em `index.ts`
- Adicionado um fallback fonético no início de `translateNameToEnglish()` antes de qualquer chamada de API.
- Regra: se o termo normalizado termina com `ia` e não com `eia`, substitui `ia` por `y` e verifica via `pubchemHasName`.
- Caso exista na PubChem, retorna imediatamente essa variante.
- Exemplo: `"amonia"` → `"amony"` (validação) → `"ammonia"` (via variantes e pós-processo), evitando dependência de API externa.

### Fallback externo atualizado em `index.ts`
- Substituída a chamada direta a `/api/translate` por uma estratégia robusta:
  - `applyCommonPtFixes(name)` para reintroduzir acentos e correções frequentes do PT.
  - `callTranslateAPIWithFallbacks(name, srcLang)` para lidar com fallbacks de idioma.
- Resultado traduzido passa por `postProcessChemicalTranslation()` seguido de validação via PubChem e geração de variantes.

### Heurísticas latinas e variantes em `translationPubChem.ts`
- `generateNameVariants(en)` foi enriquecida com heurísticas de terminações latinas (cross-language):
  - `ia → y`, `io → ium`, `ico → ic`, `ato → ate`, `ito → ite`,
  - `uro → ide`, `ina → ine`, `eno → ene`, `ano → ane`, `ol → ol`.
- Caso específico: termos `amonia`, `amoníaco` e `amoniaco` adicionam a variante `ammonia`.
- Duplicatas removidas com `Array.from(new Set(variants))`.

### Otimizações de PubChem em `pubchemAPI.ts`
- `fetchTxt(url)`:
  - Silencia `404` e `503` (retorna `null`) e registra apenas em modo debug.
  - Logs: `isDebug?.()` controla mensagens como `[fetchTxt] <status> ignorado: <url>` e erros.
  - Parâmetros não usados seguem a convenção `_silent404` para lint.
- Deduplicação e miss cache:
  - `triedUrls` evita refazer a mesma requisição.
  - `missCache` (TTL 5 min) marca termos com falhas recentes (`recentlyMissed`, `markMiss`).
- `getCidFromName(name)`:
  - Usa `fetchJsonWithRetry` para buscar `description/JSON` com pequeno retry/backoff.
  - Aplica estratégias de codificação, variantes (`generateNameVariants`) e fallbacks.
  - Logs agrupados com `console.groupCollapsed`.

Essas melhorias aumentam a precisão e resiliência do pipeline, reduzindo chamadas desnecessárias e melhorando a compatibilidade multi-idioma.

---

## 📈 Fluxograma: Entrada → getSmiles(query)

```
 🧪 Entrada do usuário → getSmiles(query) 
         │ 
         ├── 🧩 Detecta tipo de entrada 
         │       ├── CID numérico → busca direta por CID 
         │       ├── Fórmula → fastformula → CID 
         │       ├── SMILES → usa diretamente 
         │       └── Nome químico → getSmilesByNameWithTranslation() 
         │ 
         ▼ 
 📘 [getSmilesByNameWithTranslation] 
         │ 
         ├── 🔄 Etapa 1: Tradução → translateNameToEnglish(name) 
         │       │ 
         │       ├── (1) 📗 Dicionário local 
         │       │       → “óxido de ferro” → “iron oxide” 
         │       │ 
         │       ├── (2) ⚙️ Smart patterns químicos 
         │       │       → tenta regras linguísticas: 
         │       │          ácido / óxido / peróxido / hidróxido / sal / binário 
         │       │       → ex: “ácido clorídrico” → “hydrochloric acid” 
         │       │ 
         │       ├── (3) 🔍 Validação PubChem 
         │       │       → pubchemHasName(cleaned) 
         │       │       → só aceita se existir 
         │       │ 
         │       ├── (4) 💾 Cache local (TTL 30 dias) 
         │       │       → evita retradução 
         │       │ 
         │       ├── (5) ✏️ Correções de português (applyCommonPtFixes) 
         │       │       → “oxido” → “óxido”, “amonia” → “amônia” 
         │       │ 
         │       ├── (6) 🌐 API de tradução (LibreTranslate) 
         │       │       → callTranslateAPIWithFallbacks(preFixed, srcLang) 
         │       │       → tenta 'pt' → 'en', depois 'es' → 'en', 'fr' → 'en'... 
         │       │ 
         │       ├── (7) 🔬 Pós-processamento químico 
         │       │       → remove ruídos, normaliza capitalização 
         │       │ 
         │       ├── (8) 🌍 Geração de variantes (generateNameVariants) 
         │       │       → “iron(III)” ↔ “ferric” 
         │       │       → “amonia” → “ammonia” 
         │       │       → “sodio” → “sodium” 
         │       │ 
         │       ├── (9) ✅ Segunda verificação PubChem 
         │       │       → confirma que o nome traduzido/variado existe 
         │       │ 
         │       └── 🔚 Retorna nome em inglês validado 
         │ 
         ▼ 
 🔬 [getSmilesByNameWithTranslation] continua: 
         │ 
         ├── Tenta diferentes codificações: 
         │       encodeURIComponent, %20, + 
         │ 
         ├── Para cada tentativa: 
         │       🔗 Chama PubChem → /property/IsomericSMILES/TXT 
         │ 
         ├── Se nenhuma resposta: 
         │       → tenta variantes geradas 
         │ 
         ├── Se ainda falhar: 
         │       → fallback com nome original 
         │ 
         ├── Se sucesso: 
         │       → retorna SMILES e armazena em cache 
         │ 
         ▼ 
 🧠 [getSmiles] retorna SMILES → usado para: 
         - obter CID (getCidFromSmiles) 
         - obter SDF (2D ou 3D) 
         - renderizar molécula
```
