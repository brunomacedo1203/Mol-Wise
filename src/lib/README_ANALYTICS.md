# 📊 Google Analytics (GA4) – Guia de Uso no MolClass

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
    └── useEventTrackers.ts     # 🎯 Hooks padronizados para eventos específicos
```

### 📋 **Função de Cada Arquivo**

| Arquivo | Responsabilidade | Status |
|---------|------------------|--------|
| `layout.tsx` | Injeta scripts do GA4, configura ID e privacidade | ✅ **Essencial** |
| `gtag.ts` | Funções `pageview()`, `event()`, `exception()` | ✅ **Essencial** |
| `useGoogleAnalytics.ts` | Pageviews automáticos em mudanças de rota | ✅ **Essencial** |
| `useEventTrackers.ts` | Hooks para eventos padronizados | ✅ **Essencial** |

### 🚀 **Para Adicionar Novos Eventos**

Com esta arquitetura, você pode:
1. **Usar diretamente**: `import { event } from "@/lib/gtag"`
2. **Criar hook específico**: Adicionar em `useEventTrackers.ts`
3. **Criar arquivo específico**: Como `searchEvents.ts` para features

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

## 🚀 Como criar um novo evento (passo a passo)

### ✅ 1. No código

Use a função `event()` diretamente ou crie um hook específico em `useEventTrackers.ts`.

**Exemplo direto:**

```ts
import { event } from "@/lib/gtag";

event("calculation_performed", {
  calculator_type: "molar_mass",
  input_formula: "H2O",
  result_value: 18.015,
});
```

**Exemplo com hook nomeado (recomendado):**

```ts
import { useEventTrackers } from "@/hooks/useEventTrackers";

const { trackCalculation } = useEventTrackers();

trackCalculation({
  calculator_type: "molar_mass",
  input_formula: "H2O",
  result_value: 18.015,
});
```

---

### ✅ 2. No painel do GA4

Após o evento ser disparado pelo código:

1. Acesse o **Google Analytics → Admin → Eventos**
2. Clique em “Criar evento” se quiser derivar ou renomear algo
3. Acesse **Eventos recentes** para verificar se foi recebido
4. (Opcional) Marque como **conversão** se quiser acompanhar metas

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
