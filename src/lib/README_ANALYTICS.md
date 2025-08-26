# 📊 Google Analytics (GA4) – Guia de Uso no Mol Class

## 🔧 Arquivos de Configuração do Google Analytics

**Os arquivos relacionados à configuração do GA são exatamente:**

- `e:\Projetos\Mol Class\src\shared\hooks\useEventTrackers.ts`
- `e:\Projetos\Mol Class\src\types\gtag.d.ts`
- `e:\Projetos\Mol Class\src\lib\gtag.ts`
- `e:\Projetos\Mol Class\src\shared\hooks\useGoogleAnalytics.ts`
- `e:\Projetos\Mol Class\.env.local`

---

Este projeto já possui integração com o **Google Analytics 4 (GA4)** usando `gtag.js`, com configuração centralizada, envio de pageviews e eventos personalizados.

---

## ✅ Configuração Atual

- ID de rastreamento: `G-P4NHF7L5NV`
- Script do GA4 injetado no `layout.tsx` automaticamente
- Pageviews e eventos enviados via funções utilitárias
- Privacidade ativada (`anonymize_ip: true`)

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

| Arquivo | Responsabilidade | Status |
|---------|------------------|--------|
| `layout.tsx` | Injeta scripts do GA4, configura ID e privacidade | ✅ **Essencial** |
| `gtag.ts` | Funções `pageview()`, `event()`, `exception()` | ✅ **Essencial** |
| `useGoogleAnalytics.ts` | Pageviews automáticos em mudanças de rota | ✅ **Essencial** |
| `useEventTrackers.ts` | Hooks para eventos padronizados | ✅ **Essencial** |
| `useDebouncedValue.ts` | Controle de debounce para inputs e eventos | 🔧 **Utilitário** |

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
  console.log("[SEARCH_EVENTS] Disparando trackElementSearch:", { search_term, section });
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
const trackElementSearch = ({ symbol, name, atomic_number, section = "periodic_table" }) => {
  event("search_element", { symbol, name, atomic_number, section });
};
```

### **🎯 Estrutura Recomendada:**
- **Eventos específicos**: `src/features/[feature]/events/`
- **Hooks centralizados**: `src/shared/hooks/useEventTrackers.ts`
- **Tipagem**: `src/types/gtag.d.ts`
- **Implementação**: Componentes da feature

---

## 🚀 Passos para Implementar um Novo Evento de Google Analytics

### **Passo 1: Definir o Evento (Opcional)**

Se você quiser tipagem TypeScript para seu evento, adicione-o em `gtag.d.ts`:

```ts
// src/types/gtag.d.ts
export namespace Gtag {
  interface EventParams {
    // Eventos padrão do GA4
    search_term?: string;
    content_type?: string;
    item_id?: string;
    
    // Seus eventos customizados
    calculator_type?: string;
    formula_input?: string;
    result_value?: number;
  }
}
```

---

### **Passo 2: Criar Hook de Tracking (Recomendado)**

Adicione seu hook em `useEventTrackers.ts`:

```ts
// src/shared/hooks/useEventTrackers.ts
import { event } from '@/lib/gtag';

export const useEventTrackers = () => {
  const trackCalculation = (params: {
    calculator_type: string;
    formula_input: string;
    result_value: number;
  }) => {
    event('calculation_performed', {
      calculator_type: params.calculator_type,
      formula_input: params.formula_input,
      result_value: params.result_value,
      section: 'calculators'
    });
  };

  return {
    trackCalculation,
    // outros hooks...
  };
};
```

---

### **Passo 3: Usar o Hook no Componente**

Importe e use o hook em seu componente:

```ts
// Em qualquer componente
import { useEventTrackers } from '@/shared/hooks/useEventTrackers';

const MolarMassCalculator = () => {
  const { trackCalculation } = useEventTrackers();

  const handleCalculate = (formula: string, result: number) => {
    // Sua lógica de cálculo...
    
    // Disparar evento GA
    trackCalculation({
      calculator_type: 'molar_mass',
      formula_input: formula,
      result_value: result
    });
  };

  return (
    <button onClick={() => handleCalculate('H2O', 18.015)}>
      Calcular
    </button>
  );
};
```

---

### **Alternativa: Uso Direto (Para Casos Simples)**

Para eventos simples, use diretamente a função `event`:

```ts
import { event } from '@/lib/gtag';

// Disparar evento diretamente
event('button_click', {
  button_name: 'download_pdf',
  section: 'element_details'
});
```

---

### **Passo 4: Verificar se Funciona**

#### **4.1 Usando GADebugger (Desenvolvimento)**

1. Adicione o componente `GADebugger` em qualquer página:

```tsx
import { GADebugger } from '@/components/debug/GADebugger';

// No seu componente
<GADebugger />
```

2. Interaja com sua funcionalidade
3. Veja os eventos em tempo real no debugger

#### **4.2 Console do Navegador**

Abra DevTools → Console e veja logs como:
```
[GA] Event sent: calculation_performed
[GA] Params: {calculator_type: "molar_mass", ...}
```

#### **4.3 Painel do GA4**

1. Acesse **Google Analytics → Relatórios → Eventos**
2. Procure por seu evento (pode demorar alguns minutos)
3. Verifique os parâmetros enviados

---

### **Passo 5: Configurar no GA4 (Opcional)**

Após o evento aparecer no GA4:

1. Vá em **Admin → Eventos**
2. Encontre seu evento na lista
3. (Opcional) Marque como **Conversão** se for uma meta importante
4. (Opcional) Crie **Audiências** baseadas neste evento

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

Pronto! Agora sua base de Analytics está preparada para escalar com segurança, organização e clareza. ✨
