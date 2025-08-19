# Guia de Implementação i18n com Next.js 13+ e next-intl

## Índice

- [1. Preparação Inicial](#1-preparação-inicial)
- [2. Configuração do i18n](#2-configuração-do-i18n)
- [3. Implementação das Rotas](#3-implementação-das-rotas)
- [4. Migração de Componentes](#4-migração-de-componentes)
- [5. Resolução de Problemas Comuns](#5-resolução-de-problemas-comuns)
- [6. Boas Práticas](#6-boas-práticas)
- [7. Próximos Passos](#7-próximos-passos)

## 1. Preparação Inicial

### 1.1 Instalação das Dependências

```bash
npm install next-intl
```

### 1.2 Estrutura de Pastas

```
src/
├── app/
│   └── [locale]/           # Nova pasta para rotas dinâmicas
│       ├── layout.tsx      # Layout principal com i18n
│       ├── page.tsx        # Página inicial
│       └── calculators/    # Páginas específicas
├── i18n/                   # Nova pasta para configuração i18n
│   ├── routing.ts         # Configuração de rotas
│   ├── request.ts         # Configuração de requisições
│   └── messages/          # Arquivos de tradução
│       ├── en.json
│       └── pt.json
└── shared/
    └── components/
        └── Menu.tsx       # Componente que precisa ser atualizado
```

## 2. Configuração do i18n

### 2.1 Configuração de Rotas (`src/i18n/routing.ts`)

```typescript
export const routing = {
  locales: ["en", "pt"],
  defaultLocale: "en",
};
```

### 2.2 Configuração de Requisições (`src/i18n/request.ts`)

```typescript
import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";

export default getRequestConfig(async ({ locale }) => ({
  messages: (await import(`./messages/${locale}.json`)).default,
  timeZone: "America/Sao_Paulo",
  now: new Date(),
  formats: {
    dateTime: {
      short: {
        day: "numeric",
        month: "short",
        year: "numeric",
      },
      medium: {
        day: "numeric",
        month: "long",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
      },
      long: {
        day: "numeric",
        month: "long",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        timeZoneName: "short",
      },
    },
  },
}));
```

### 2.3 Arquivos de Mensagens

#### `src/i18n/messages/en.json`

```json
{
  "common": {
    "description": "This application is designed to help students and teachers with chemical calculations, data visualization, and content organization."
  },
  "calculators": {
    "title": "Calculators",
    "subtitle": "Open one or more calculators from the menu.",
    "molarMass": "Molar Mass Calculator"
  }
}
```

#### `src/i18n/messages/pt.json`

```json
{
  "common": {
    "description": "Esta aplicação foi projetada para ajudar estudantes e professores com cálculos químicos, visualização de dados e organização de conteúdo."
  },
  "calculators": {
    "title": "Calculadoras",
    "subtitle": "Abra uma ou mais calculadoras pelo menu.",
    "molarMass": "Calculadora de Massa Molar"
  }
}
```

## 3. Implementação das Rotas

### 3.1 Layout Principal (`src/app/[locale]/layout.tsx`)

```typescript
import { NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { routing } from "@/i18n/routing";
import { setRequestLocale } from "next-intl/server";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

// Função que informa ao Next.js quais locales devem ser pré-renderizados
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

// Função que gera metadados dinâmicos baseados no locale
export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  // Aguarda a resolução do params
  const { locale } = await Promise.resolve(params);
  const t = await getTranslations({ locale, namespace: "common" });

  return {
    title: {
      template: "%s | Mol Class",
      default: "Mol Class",
    },
    description: t("description"),
    metadataBase: new URL("https://molclass.vercel.app"),
    alternates: {
      languages: {
        "pt-BR": "/pt",
        "en-US": "/en",
      },
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  // Aguarda a resolução do params
  const { locale } = await Promise.resolve(params);

  // Garante que o locale recebido é válido
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  // Habilita renderização estática
  setRequestLocale(locale);

  return (
    <html lang={locale} className="dark">
      <body className={inter.className}>
        <ThemeProvider>
          <CalculatorInstancesProvider>
            <NextIntlClientProvider locale={locale}>
              {children}
            </NextIntlClientProvider>
          </CalculatorInstancesProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
```

### 3.2 Configuração do Next.js (`next.config.js`)

```javascript
const withNextIntl = require("next-intl/plugin")();

module.exports = withNextIntl({
  // outras configurações
});
```

## 4. Migração de Componentes

### 4.1 Atualização do Menu (`src/shared/components/Menu.tsx`)

```typescript
"use client";

import { useParams } from "next/navigation";
// ... outros imports

export default function Menu({ collapsed }: { collapsed: boolean }) {
  const params = useParams();
  const locale = params.locale as string;
  const router = useRouter();
  const pathname = usePathname();

  // ... resto do código

  return (
    // ... código do menu
    <Link
      href={`/${locale}/periodicTable`}
      className={cn(
        "flex items-center gap-2 px-4 py-2 rounded-md hover:bg-zinc-200 dark:hover:bg-zinc-800",
        pathname === `/${locale}/periodicTable` && "bg-zinc-100 dark:bg-zinc-900"
      )}
    >
      {/* ... */}
    </Link>

    <button
      onClick={() => {
        if (pathname === `/${locale}/calculators`) {
          addCalculator("molar-mass");
        } else {
          router.push(`/${locale}/calculators?open=molar-mass`);
        }
      }}
    >
      {/* ... */}
    </button>
    // ... resto do código
  );
}
```

## 5. Resolução de Problemas Comuns

### 5.1 Erro de Parâmetros Assíncronos

**Problema**: `params.locale` deve ser awaited
**Solução**: Usar `Promise.resolve(params)`

```typescript
const { locale } = await Promise.resolve(params);
```

### 5.2 Erro de Módulo Não Encontrado

**Problema**: TypeScript não encontra módulos
**Solução**: Usar barrel files (index.ts) para exportações

```typescript
// src/app/[locale]/index.ts
export { default as ClientLayout } from "./ClientLayout";
```

### 5.3 Erro de Mensagens Não Configuradas

**Problema**: `NextIntlClientProvider` sem mensagens
**Solução**: Garantir que mensagens são passadas corretamente

```typescript
<NextIntlClientProvider messages={messages} locale={locale}>
```

### 5.4 Erro de Timezone

**Problema**: Falta configuração de timezone
**Solução**: Adicionar em `request.ts`

```typescript
timeZone: "America/Sao_Paulo";
```

## 6. Boas Práticas

### 6.1 Organização de Traduções

- Usar namespaces para organizar mensagens
- Manter estrutura consistente entre idiomas
- Usar chaves descritivas
- Exemplo de estrutura:

```json
{
  "namespace": {
    "component": {
      "action": "texto"
    }
  }
}
```

### 6.2 Tipagem

- Definir tipos para mensagens
- Usar TypeScript para validação
- Manter consistência entre arquivos

```typescript
type Messages = {
  common: {
    description: string;
  };
  calculators: {
    title: string;
    subtitle: string;
    molarMass: string;
  };
};
```

### 6.3 Performance

- Usar `generateStaticParams` para pré-renderização
- Implementar fallbacks para idiomas não suportados
- Otimizar carregamento de mensagens

## 7. Próximos Passos

### 7.1 Melhorias de UX

- Adicionar seletor de idioma
- Persistir preferência do usuário
- Adicionar indicadores visuais

### 7.2 Expansão

- Adicionar mais idiomas
- Implementar detecção automática
- Adicionar suporte a RTL

### 7.3 Testes

- Testar em diferentes idiomas
- Validar navegação
- Verificar consistência

## Notas Adicionais

### Comandos Úteis

```bash
# Iniciar servidor de desenvolvimento
npm run dev

# Construir para produção
npm run build

# Verificar tipos
npm run type-check
```

### Recursos Úteis

- [Documentação next-intl](https://next-intl-docs.vercel.app/)
- [Next.js Internationalization](https://nextjs.org/docs/app/building-your-application/routing/internationalization)
- [MDN Intl](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl)

### Checklist de Implementação

- [ ] Instalar dependências
- [ ] Configurar estrutura de pastas
- [ ] Implementar configuração i18n
- [ ] Criar arquivos de mensagens
- [ ] Atualizar layout principal
- [ ] Migrar componentes
- [ ] Testar em diferentes idiomas
- [ ] Implementar melhorias de UX
- [ ] Documentar processo
