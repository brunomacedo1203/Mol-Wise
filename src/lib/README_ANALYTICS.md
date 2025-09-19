# 📊 Google Analytics (GA4) – Guia de Uso no Mol Class

## 🎯 **IMPORTANTE: NADA PRECISA SER CONFIGURADO NO GA4!**

✅ **O Google Analytics já está 100% configurado e funcionando!**  
✅ **Todos os eventos aparecem automaticamente no GA4!**  
✅ **Você só precisa implementar o código do evento no projeto!**

---

## 🔧 Arquivos de Configuração do Google Analytics

**Os arquivos relacionados à configuração do GA são exatamente:**

- `src/shared/hooks/useEventTrackers.ts` - Hooks centralizados para eventos
- `src/types/gtag.d.ts` - Tipagem TypeScript (opcional)
- `src/lib/gtag.ts` - Funções de tracking (pageview, event, exception)
- `src/shared/hooks/useGoogleAnalytics.ts` - Pageviews automáticos
- `.env.local` - Variável `NEXT_PUBLIC_GA_ID` (já configurada)

---

Este projeto já possui integração com o **Google Analytics 4 (GA4)** usando `gtag.js`, com configuração centralizada, envio de pageviews e eventos personalizados.

---

## ✅ Configuração Atual

- **ID de rastreamento**: Configurado via `NEXT_PUBLIC_GA_ID`
- **Script do GA4**: Injetado no `layout.tsx` automaticamente
- **Pageviews**: Enviados automaticamente via `useGoogleAnalytics`
- **Eventos**: Enviados via funções utilitárias em `gtag.ts`
- **Privacidade**: Ativada (`anonymize_ip: true`)
- **Status**: ✅ **FUNCIONANDO PERFEITAMENTE!**

---

## 🧠 Como o GA4 funciona aqui

| Item                        | Função                                                           |
| --------------------------- | ---------------------------------------------------------------- |
| `gtag.ts`                   | Contém funções de rastreamento: `pageview`, `event`, `exception` |
| `useGoogleAnalytics.ts`     | Hook que envia `pageview` ao mudar de rota                       |
| **Script no `layout.tsx`**  | Inicia o GA4 e injeta o `gtag()` no `window`                     |
| **Evento `search_element`** | Exemplo de evento custom já implementado                         |

---

## 📂 Arquivos Principais da Arquitetura

### 🎯 **4 Arquivos Essenciais para Google Analytics**

Estes são os **arquivos principais** que formam a arquitetura completa do GA4:

```
src/
├── app/[locale]/
│   └── layout.tsx              # 🔧 Configuração global e inicialização do GA4
├── lib/
│   └── gtag.ts                 # 📚 Biblioteca principal com funções de tracking
└── shared/hooks/
    ├── useGoogleAnalytics.ts   # 🔄 Hook para pageviews automáticos
    ├── useEventTrackers.ts     # 🎯 Hooks padronizados para eventos específicos
    └── useDebouncedValue.ts    # ⏱️ Hook para debounce de valores (digitação)
```

### 📋 **Função de Cada Arquivo**

| Arquivo                 | Responsabilidade                                  | Status            |
| ----------------------- | ------------------------------------------------- | ----------------- |
| `layout.tsx`            | Injeta scripts do GA4, configura ID e privacidade | ✅ **Essencial**  |
| `gtag.ts`               | Funções `pageview()`, `event()`, `exception()`    | ✅ **Essencial**  |
| `useGoogleAnalytics.ts` | Pageviews automáticos em mudanças de rota         | ✅ **Essencial**  |
| `useEventTrackers.ts`   | Hooks para eventos padronizados                   | ✅ **Essencial**  |
| `useDebouncedValue.ts`  | Controle de debounce para inputs e eventos        | 🔧 **Utilitário** |

### 🛠️ **Hooks Utilitários**

#### `useDebouncedValue.ts` - Controle de Digitação

Hook criado para aplicar debounce em valores de entrada, especialmente útil para:

- **Campos de busca** que disparam eventos GA4
- **Filtros em tempo real** que precisam de otimização
- **Qualquer input** que requer controle de frequência

```ts
import { useDebouncedValue } from "@/shared/hooks/useDebouncedValue";

const [searchTerm, setSearchTerm] = useState("");
const debouncedSearchTerm = useDebouncedValue(searchTerm, 500);

// Dispara evento GA4 apenas após 500ms de inatividade
useEffect(() => {
  if (debouncedSearchTerm) {
    trackElementSearch({ search_term: debouncedSearchTerm });
  }
}, [debouncedSearchTerm]);
```

**Benefícios:**

- ✅ Evita spam de eventos GA4 durante digitação
- ✅ Melhora performance da aplicação
- ✅ Reduz custos de API calls
- ✅ Experiência de usuário mais fluida

---

### 🚀 **Para Adicionar Novos Eventos**

Com esta arquitetura, você pode:

1. **Usar diretamente**: `import { event } from "@/lib/gtag"`
2. **Criar hook específico**: Adicionar em `useEventTrackers.ts`
3. **Criar arquivo específico**: Como `searchEvents.ts` para features
4. **Usar debounce**: Combinar com `useDebouncedValue` para inputs

---

## 🧩 Funções Disponíveis

### 1. `pageview(url: string)`

Envia um pageview manual (normalmente já feito automaticamente via `useGoogleAnalytics`).

```ts
import { pageview } from "@/lib/gtag";

pageview("/catalog?filter=metal");
```

---

### 2. `event(name: string, params?: object)`

Envia um evento GA4 com parâmetros personalizados.

```ts
import { event } from "@/lib/gtag";

event("search_element", {
  search_term: "H2O",
  result_count: 5,
  section: "catalog",
});
```

---

### 3. `exception(description: string, fatal?: boolean)`

Registra um erro (exemplo útil em try/catch).

```ts
import { exception } from "@/lib/gtag";

exception("Erro no cálculo", false);
```

---

## 📋 Resumo: Padrão Baseado no `search_element`

### **🔄 Sequência de Arquivos (Ordem de Implementação):**

1. **`e:\Projetos\Mol Class\src\types\gtag.d.ts`** - Adicionar tipos específicos (opcional)
2. **`e:\Projetos\Mol Class\src\features\[feature]\events\[eventName]Events.ts`** - Criar função de tracking específica
3. **`e:\Projetos\Mol Class\src\shared\hooks\useEventTrackers.ts`** - Adicionar hook centralizado (alternativa)
4. **`e:\Projetos\Mol Class\src\features\[feature]\components\[Component].tsx`** - Implementar no componente
5. **`e:\Projetos\Mol Class\src\components\debug\GADebugger.tsx`** - Testar o evento

### **📁 Exemplo Real do `search_element`:**

**Arquivo 1:** `src/features/periodic-table/events/searchEvents.ts`

```ts
import { event } from "@/lib/gtag";

export const trackElementSearch = ({
  search_term,
  section = "periodic_table",
}: {
  search_term: string;
  section?: string;
}): void => {
  console.log("[SEARCH_EVENTS] Disparando trackElementSearch:", {
    search_term,
    section,
  });
  event("search_element", {
    search_term,
    section,
  });
};
```

**Arquivo 2:** `src/features/periodic-table/components/ElementDetailsPanel.tsx`

```ts
import { trackElementSearch } from "../events/searchEvents";

const handleSearch = (value: string) => {
  setSearch(value);
  setSearchValue(value);

  if (value.trim() !== "") {
    trackElementSearch({ search_term: value });
  }
};
```

**Arquivo 3:** `src/shared/hooks/useEventTrackers.ts` (Alternativa)

```ts
const trackElementSearch = ({
  symbol,
  name,
  atomic_number,
  section = "periodic_table",
}) => {
  event("search_element", { symbol, name, atomic_number, section });
};
```

### **🎯 Estrutura Recomendada:**

- **Eventos específicos**: `src/features/[feature]/events/`
- **Hooks centralizados**: `src/shared/hooks/useEventTrackers.ts`
- **Tipagem**: `src/types/gtag.d.ts`
- **Implementação**: Componentes da feature

---

## 🚀 **COMO IMPLEMENTAR NOVOS EVENTOS (3 OPÇÕES)**

### **🎯 OPÇÃO 1: Uso Direto (Mais Simples)**

Para eventos simples, use diretamente a função `event`:

```ts
import { event } from "@/lib/gtag";

// Exemplo: Evento de clique em botão
const handleButtonClick = () => {
  event("button_click", {
    button_name: "download_pdf",
    section: "element_details",
  });
};

// Exemplo: Evento de busca
const handleSearch = (searchTerm: string) => {
  event("search", {
    search_term: searchTerm,
    section: "catalog",
  });
};
```

**✅ Vantagens**: Simples, direto, sem arquivos extras  
**❌ Desvantagens**: Código duplicado se usar em vários lugares

---

### **🎯 OPÇÃO 2: Arquivo Específico da Feature (Recomendado)**

Crie um arquivo específico para eventos da sua feature:

```ts
// src/features/calculators/events/calculationEvents.ts
import { event } from "@/lib/gtag";

export const trackCalculation = ({
  calculator_type,
  formula_input,
  result_value,
  section = "calculators",
}: {
  calculator_type: string;
  formula_input: string;
  result_value: number;
  section?: string;
}): void => {
  console.log("[CALCULATION_EVENTS] Disparando trackCalculation:", {
    calculator_type,
    formula_input,
    result_value,
    section,
  });

  event("calculation_performed", {
    calculator_type,
    formula_input,
    result_value,
    section,
  });
};
```

**No componente:**

```ts
import { trackCalculation } from "../events/calculationEvents";

const handleCalculate = (formula: string, result: number) => {
  // Sua lógica de cálculo...

  // Disparar evento GA
  trackCalculation({
    calculator_type: "molar_mass",
    formula_input: formula,
    result_value: result,
  });
};
```

**✅ Vantagens**: Organizado, reutilizável, fácil de manter  
**❌ Desvantagens**: Precisa criar arquivo

---

### **🎯 OPÇÃO 3: Hook Centralizado (Para Eventos Globais)**

Adicione no hook centralizado `useEventTrackers.ts`:

```ts
// src/shared/hooks/useEventTrackers.ts
import { event } from "@/lib/gtag";

export function useEventTrackers() {
  const trackCalculation = ({
    calculator_type,
    formula_input,
    result_value,
    section = "calculators",
  }: {
    calculator_type: string;
    formula_input: string;
    result_value: number;
    section?: string;
  }) => {
    event("calculation_performed", {
      calculator_type,
      formula_input,
      result_value,
      section,
    });
  };

  return {
    trackCalculation,
    // outros hooks...
  };
}
```

**No componente:**

```ts
import { useEventTrackers } from "@/shared/hooks/useEventTrackers";

const MolarMassCalculator = () => {
  const { trackCalculation } = useEventTrackers();

  const handleCalculate = (formula: string, result: number) => {
    trackCalculation({
      calculator_type: "molar_mass",
      formula_input: formula,
      result_value: result,
    });
  };
};
```

**✅ Vantagens**: Centralizado, disponível em qualquer lugar  
**❌ Desvantagens**: Arquivo pode ficar grande

---

## 🔍 **COMO VERIFICAR SE ESTÁ FUNCIONANDO**

### **1. Console do Navegador (Imediato)**

Abra DevTools → Console e veja logs como:

```
[CALCULATION_EVENTS] Disparando trackCalculation: {...}
```

### **2. GA4 Real-time (1-2 minutos)**

1. Acesse **Google Analytics → Relatórios → Tempo real**
2. Interaja com sua funcionalidade
3. Veja o evento aparecer na lista

### **3. GA4 Eventos (5-10 minutos)**

1. Acesse **Google Analytics → Relatórios → Eventos**
2. Procure por seu evento na lista
3. Clique para ver os parâmetros enviados

---

## ⚠️ **IMPORTANTE: NADA PRECISA SER CONFIGURADO NO GA4!**

- ✅ **Eventos aparecem automaticamente**
- ✅ **Parâmetros são enviados automaticamente**
- ✅ **Relatórios são gerados automaticamente**
- ✅ **Tudo funciona "out of the box"**

**Você só precisa:**

1. Implementar o código do evento
2. Testar no navegador
3. Verificar no GA4 (opcional)

---

## 📋 **EXEMPLO PRÁTICO: Evento de Busca de Moléculas**

Aqui está um exemplo real implementado no projeto para busca de moléculas no visualizador:

### **Arquivo de Evento:**

```ts
// src/features/visualization/events/moleculeSearchEvents.ts
import { event } from "@/lib/gtag";

export const trackMoleculeSearch = ({
  search_term,
  section = "molecule_visualizer",
  search_type,
  success = false,
}: {
  search_term: string;
  section?: string;
  search_type?: "name" | "formula" | "smiles" | "cid" | "unknown";
  success?: boolean;
}): void => {
  console.log("[MOLECULE_SEARCH_EVENTS] Disparando trackMoleculeSearch:", {
    search_term,
    section,
    search_type,
    success,
  });

  event("search", {
    search_term,
    section,
    search_type,
    success,
  });
};
```

### **Integração no Componente:**

```ts
// src/features/visualization/components/MoleculeToolbar.tsx
import { trackMoleculeSearch } from "../events/moleculeSearchEvents";

const handleSearch = async (query: string) => {
  const searchType = detectSearchType(query);

  try {
    // Sua lógica de busca...
    const result = await searchMolecule(query);

    // Tracking de busca bem-sucedida
    trackMoleculeSearch({
      search_term: query,
      search_type: searchType,
      success: true,
    });
  } catch (error) {
    // Tracking de busca falhada
    trackMoleculeSearch({
      search_term: query,
      search_type: searchType,
      success: false,
    });
  }
};
```

### **O que aparece no GA4:**

- **Evento**: `search`
- **Parâmetros**:
  - `search_term`: "benzene" (o que foi digitado)
  - `section`: "molecule_visualizer"
  - `search_type`: "name" (detectado automaticamente)
  - `success`: true/false

---

## 🔎 Como testar

1. Abra o site com `?debug_mode=true` na URL
2. Vá ao GA4 → Admin → DebugView
3. Interaja com a aplicação
4. Verifique se eventos aparecem corretamente
5. No DevTools → aba Network → filtre por `collect` e veja status `204`

---

## 🔐 Privacidade e Cookies

O GA4 está configurado com:

- `anonymize_ip: true` → os IPs dos usuários são anonimizados
- `cookie_flags: 'SameSite=None;Secure'` → cookies seguros, compatíveis com múltiplos navegadores

---

## 📌 Observações

- Evite usar os padrões antigos (`category`, `action`, `label`, `value`) do Universal Analytics.
- No GA4, os eventos são **livres** e organizados via **parâmetros nomeados**.
- Eventos como `search`, `view_item`, `generate_lead` têm tratamento especial e são recomendados.

---

## 📋 Exemplo de Evento Nomeado (recomendado)

```ts
event("view_item", {
  item_id: "Na",
  item_name: "Sódio",
  item_type: "element",
});
```

---

---

## 🎯 **EVENTOS CUSTOMIZADOS IMPLEMENTADOS**

### **📊 Resumo Geral**
- **Total de eventos**: 21 eventos customizados
- **Arquivos de eventos**: 9 arquivos específicos
- **Status**: ✅ Todos funcionando e enviando dados para GA4

---

### **🔥 EVENTOS PRINCIPAIS DO SISTEMA**

| Evento | Descrição | Arquivo | Parâmetros Principais |
|--------|-----------|---------|----------------------|
| `search_element` | Busca por elementos na tabela periódica | `searchEvents.ts` | `search_term`, `section` |
| `search` | Busca geral (moléculas, catálogo) | `moleculeSearchEvents.ts`, `catalogEvents.ts` | `search_term`, `section`, `search_type`, `success` |
| `calculation_performed` | Cálculos realizados | `scientificEvents.ts`, `molarMassEvents.ts` | `calculator_type`, `expression`, `result_value` |
| `mode_switch` | Mudança de modo/tema | `interfaceEvents.ts` | `mode_type`, `from_mode`, `to_mode` |
| `exception` | Erros e exceções | `gtag.ts` | `description`, `fatal` |

---

### **🎨 EVENTOS DE INTERFACE**

| Evento | Descrição | Arquivo | Parâmetros Principais |
|--------|-----------|---------|----------------------|
| `theme_changed` | Mudança de tema (claro/escuro) | `interfaceEvents.ts` | `theme`, `section` |
| `language_changed` | Mudança de idioma | `interfaceEvents.ts` | `language`, `previous_language` |
| `menu_interaction` | Interações com menus | `interfaceEvents.ts` | `menu_type`, `action`, `item_name` |
| `interface_toggle` | Toggle de elementos da UI | `interfaceEvents.ts` | `element_type`, `action`, `section` |
| `settings_changed` | Mudanças nas configurações | `interfaceEvents.ts` | `setting_type`, `new_value`, `section` |

---

### **🧪 EVENTOS DO CATÁLOGO DE COMPOSTOS**

| Evento | Descrição | Arquivo | Parâmetros Principais |
|--------|-----------|---------|----------------------|
| `view_item` | Visualização de composto | `catalogEvents.ts` | `compound_id`, `compound_name`, `compound_type` |
| `filter_applied` | Aplicação de filtros | `catalogEvents.ts` | `filter_type`, `filter_value`, `results_count` |
| `sort_applied` | Ordenação aplicada | `catalogEvents.ts` | `sort_field`, `sort_direction`, `results_count` |
| `pagination_used` | Navegação por páginas | `catalogEvents.ts` | `page_number`, `items_per_page`, `total_items` |
| `column_toggled` | Toggle de colunas da tabela | `catalogEvents.ts` | `column_name`, `action`, `visible_columns` |

---

### **🔢 EVENTOS DAS CALCULADORAS**

| Evento | Descrição | Arquivo | Parâmetros Principais |
|--------|-----------|---------|----------------------|
| `calculator_reset` | Reset da calculadora | `scientificEvents.ts`, `molarMassEvents.ts` | `calculator_type`, `section` |
| `function_used` | Uso de funções matemáticas | `scientificEvents.ts` | `function_name`, `calculator_type` |
| `memory_action` | Ações de memória (M+, M-, etc.) | `scientificEvents.ts` | `memory_action`, `calculator_type` |
| `history_action` | Ações no histórico | `scientificEvents.ts` | `history_action`, `calculator_type` |
| `formula_input_changed` | Mudança na fórmula química | `molarMassEvents.ts` | `formula_input`, `section` |

---

### **⚡ EVENTOS AUTOMÁTICOS**

| Evento | Descrição | Arquivo | Parâmetros Principais |
|--------|-----------|---------|----------------------|
| `page_view` | Visualização de página | `useGoogleAnalytics.ts` | `page_title`, `page_location` |

---

### **📁 ESTRUTURA DE ARQUIVOS DE EVENTOS**

```
src/
├── shared/
│   ├── hooks/
│   │   └── useEventTrackers.ts          # 🎯 Hooks centralizados
│   └── events/
│       └── interfaceEvents.ts           # 🎨 Eventos de interface
├── features/
│   ├── catalog/
│   │   └── events/
│   │       └── catalogEvents.ts         # 🧪 Eventos do catálogo
│   ├── calculators/
│   │   └── events/
│   │       ├── scientificEvents.ts      # 🔬 Calculadora científica
│   │       └── molarMassEvents.ts       # ⚖️ Calculadora de massa molar
│   ├── periodic-table/
│   │   └── events/
│   │       └── searchEvents.ts          # 🔍 Busca de elementos
│   └── visualization/
│       └── events/
│           └── moleculeSearchEvents.ts  # 🧬 Busca de moléculas
└── lib/
    └── gtag.ts                          # 📊 Funções base do GA4
```

---

### **📈 STATUS DE IMPLEMENTAÇÃO**

| Categoria | Eventos | Status | Observações |
|-----------|---------|--------|-------------|
| **Sistema Principal** | 5 eventos | ✅ Implementado | Funcionando perfeitamente |
| **Interface** | 5 eventos | ✅ Implementado | Todos os toggles e mudanças |
| **Catálogo** | 5 eventos | ✅ Implementado | Busca, filtros, paginação |
| **Calculadoras** | 5 eventos | ✅ Implementado | Científica e massa molar |
| **Automáticos** | 1 evento | ✅ Implementado | Pageviews automáticos |
| **TOTAL** | **21 eventos** | ✅ **100%** | **Todos funcionando** |

---

### **🔍 COMO VERIFICAR OS EVENTOS NO GA4**

#### **1. Tempo Real (Imediato)**
1. Acesse **Google Analytics → Relatórios → Tempo real**
2. Interaja com o site
3. Veja os eventos aparecerem instantaneamente

#### **2. Eventos Gerais (5-10 minutos)**
1. Acesse **Google Analytics → Relatórios → Eventos**
2. Procure pelos nomes dos eventos na lista
3. Clique para ver parâmetros detalhados

#### **3. Debug View (Desenvolvimento)**
1. Acesse **Google Analytics → Admin → DebugView**
2. Adicione `?debug_mode=true` na URL
3. Veja eventos em tempo real com todos os parâmetros

#### **4. Console do Navegador**
- Abra DevTools → Console
- Veja logs como: `[CATALOG_EVENTS] Disparando trackCatalogSearch: {...}`

---

### **🚀 RESUMO RÁPIDO: Como Adicionar um Novo Evento**

#### **1. Escolha uma das 3 opções:**
- **Simples**: `event('nome_do_evento', { param1: 'valor' })`
- **Organizado**: Crie `src/features/[feature]/events/[evento]Events.ts`
- **Global**: Adicione em `src/shared/hooks/useEventTrackers.ts`

#### **2. Implemente no componente:**
```ts
import { event } from "@/lib/gtag";
// ou
import { trackMeuEvento } from "../events/meuEventoEvents";

// Disparar evento
event("meu_evento", { section: "minha_secao" });
```

#### **3. Teste:**
- Console do navegador → veja os logs
- GA4 Real-time → veja o evento aparecer
- GA4 Eventos → veja os parâmetros

#### **4. Pronto!**
- ✅ **Nada mais precisa ser configurado**
- ✅ **Evento aparece automaticamente no GA4**
- ✅ **Parâmetros são enviados automaticamente**

---

**🎉 Pronto! Agora sua base de Analytics está preparada para escalar com segurança, organização e clareza.** ✨
