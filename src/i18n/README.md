# Internacionalização (i18n) - MolClass

Este diretório contém toda a implementação de internacionalização do projeto Mol class, permitindo suporte a múltiplos idiomas.

## 📚 Biblioteca Utilizada

O projeto utiliza **next-intl**, uma biblioteca moderna e robusta para internacionalização em aplicações Next.js que oferece:

- ✅ Suporte completo ao App Router do Next.js 13+
- ✅ Type-safety para traduções
- ✅ Roteamento baseado em locale
- ✅ Formatação de datas, números e moedas
- ✅ Pluralização automática
- ✅ Lazy loading de mensagens

## 🗂️ Estrutura de Arquivos

```
src/i18n/
├── messages/           # Arquivos de tradução
│   ├── en.json        # Traduções em inglês
│   └── pt.json        # Traduções em português
├── navigation.ts      # Configuração de navegação internacionalizada
├── request.ts         # Configuração de requisições i18n
└── routing.ts         # Configuração de roteamento por locale
```

## 🌍 Idiomas Suportados

- **Português (pt)** - Idioma padrão
- **Inglês (en)** - Idioma secundário

## 📝 Estrutura das Traduções

As traduções são organizadas em objetos JSON hierárquicos para facilitar a manutenção:

```json
{
  "common": {
    "buttons": {
      "calculate": "Calcular",
      "clear": "Limpar"
    },
    "navigation": {
      "home": "Início",
      "about": "Sobre"
    }
  },
  "periodicTable": {
    "title": "Tabela Periódica",
    "elements": {
      "hydrogen": "Hidrogênio"
    }
  }
}
```

## 🔧 Configuração

### 1. Roteamento (`routing.ts`)

Define os locales suportados e configurações de roteamento:

```typescript
import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["pt", "en"],
  defaultLocale: "pt",
});
```

### 2. Navegação (`navigation.ts`)

Cria helpers tipados para navegação internacionalizada:

```typescript
import { createSharedPathnamesNavigation } from "next-intl/navigation";
import { routing } from "./routing";

export const { Link, redirect, usePathname, useRouter } =
  createSharedPathnamesNavigation(routing);
```

### 3. Requisições (`request.ts`)

Configura como as mensagens são carregadas:

```typescript
import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";

export default getRequestConfig(async ({ locale }) => {
  return {
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
```

## 🚀 Como Usar

### Em Componentes do Servidor

```typescript
import { useTranslations } from "next-intl";

export default function HomePage() {
  const t = useTranslations("common");

  return <h1>{t("welcome")}</h1>;
}
```

### Em Componentes do Cliente

```typescript
"use client";
import { useTranslations } from "next-intl";

export default function ClientComponent() {
  const t = useTranslations("periodicTable");

  return <button>{t("buttons.calculate")}</button>;
}
```

### Navegação Internacionalizada

```typescript
import { Link } from "@/i18n/navigation";

export default function Navigation() {
  return <Link href="/about">Sobre</Link>;
}
```

## 📋 Convenções de Nomenclatura

1. **Chaves em camelCase**: `periodicTable`, `molarMass`
2. **Hierarquia lógica**: Agrupe traduções relacionadas
3. **Prefixos descritivos**: `buttons.`, `navigation.`, `errors.`
4. **Consistência**: Mantenha a mesma estrutura em todos os idiomas

## 🔄 Adicionando Novas Traduções

1. Adicione a chave em `messages/pt.json`
2. Adicione a tradução correspondente em `messages/en.json`
3. Use a nova chave no componente com `useTranslations()`

## 🌐 URLs Internacionalizadas

O projeto utiliza roteamento baseado em locale:

- `/pt/tabela-periodica` (Português)
- `/en/periodic-table` (Inglês)

O locale padrão (pt) não aparece na URL para melhor SEO.

## 🛠️ Ferramentas de Desenvolvimento

- **Type Safety**: As traduções são tipadas automaticamente
- **Hot Reload**: Mudanças nas traduções são refletidas instantaneamente
- **Validação**: Chaves faltantes são detectadas em tempo de desenvolvimento

## 📚 Recursos Adicionais

- [Documentação oficial do next-intl](https://next-intl-docs.vercel.app/)
- [Guia de migração](https://next-intl-docs.vercel.app/docs/getting-started)
- [Exemplos de uso](https://github.com/amannn/next-intl/tree/main/examples)
