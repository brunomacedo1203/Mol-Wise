# Internacionalização (i18n) - Mol Class

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
- **Francês (fr)** - Idioma adicional
- **Espanhol (es)** - Idioma adicional

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

## 🌐 Implementando Novos Idiomas

### Passo a Passo Completo

#### 1. Atualizar Configuração de Roteamento

Edite `src/i18n/routing.ts` e adicione o novo código do idioma:

```typescript
export const routing = defineRouting({
  // Adicione o novo idioma aqui
  locales: ['pt', 'en', 'fr', 'es'], // Exemplo: francês e espanhol
  defaultLocale: 'pt'
});
```

#### 2. Criar Arquivo de Traduções

Crie um novo arquivo JSON na pasta `src/i18n/messages/`:

- Para francês: `fr.json`
- Para espanhol: `es.json`
- Para alemão: `de.json`
- etc.

**Estrutura do arquivo** (copie de `en.json` ou `pt.json` como base):

```json
{
  "molarMass": {
    "title": "Calculadora de Masa Molar",
    "subtitle": "Calcula la masa molar de compuestos químicos"
  },
  "common": {
    "welcome": "Bienvenido",
    "loading": "Cargando...",
    "language": {
      "es": "Español",
      "pt": "Portugués",
      "en": "Inglés",
      "fr": "Francés",
      "toggle": "Cambiar idioma"
    }
    // ... resto das traduções
  }
}
```

#### 3. Atualizar Seletor de Idiomas (Opcional)

Modifique `src/shared/components/settings/LanguageSwitcher.tsx` para suportar múltiplos idiomas:

```typescript
const availableLocales = ['pt', 'en', 'fr', 'es'];
const localeNames = {
  pt: 'PT',
  en: 'EN', 
  fr: 'FR',
  es: 'ES'
};
```

#### 4. Configurar Geração Estática (Opcional)

Se usar geração estática, atualize `src/app/[locale]/layout.tsx`:

```typescript
export function generateStaticParams() {
  return [
    { locale: 'pt' },
    { locale: 'en' },
    { locale: 'fr' },
    { locale: 'es' }
  ];
}
```

#### 5. Atualizar Metadados SEO

No mesmo layout, configure os metadados:

```typescript
export async function generateMetadata({ params }: { params: { locale: string } }) {
  const { locale } = await Promise.resolve(params);
  const t = await getTranslations({ locale, namespace: "common" });

  return {
    alternates: {
      languages: {
        "pt-BR": "/pt",
        "en-US": "/en",
        "fr-FR": "/fr", // Novo idioma
        "es-ES": "/es", // Novo idioma
      },
    },
  };
}
```

#### 6. ⚠️ OBRIGATÓRIO: Atualizar Configurações de Metadados

**IMPORTANTE**: Sempre que um novo idioma for implementado, você DEVE atualizar os seguintes arquivos:

##### 6.1. Arquivo `src/lib/seo.ts`

Adicione o novo idioma na seção `alternates.languages`:

```typescript
alternates: {
  canonical: url,
  languages: {
    "pt-BR": `${BASE_URL}/pt${path}`,
    "en-US": `${BASE_URL}/en${path}`,
    "fr-FR": `${BASE_URL}/fr${path}`, // Adicionar novo idioma
    "es-ES": `${BASE_URL}/es${path}`, // Adicionar novo idioma
    // ... outros idiomas
  },
},
```

##### 6.2. Arquivo `next-sitemap.config.js`

Adicione o novo idioma na seção `alternateRefs`:

```javascript
alternateRefs: [
  {
    href: "https://molclass.com/pt",
    hreflang: "pt-BR",
  },
  {
    href: "https://molclass.com/en",
    hreflang: "en-US",
  },
  {
    href: "https://molclass.com/fr", // Adicionar novo idioma
    hreflang: "fr-FR",
  },
  {
    href: "https://molclass.com/es", // Adicionar novo idioma
    hreflang: "es-ES",
  },
  // ... outros idiomas
],
```

**Por que isso é importante?**
- Garante SEO adequado para todos os idiomas
- Permite que motores de busca identifiquem versões alternativas
- Melhora a indexação internacional do site
- Evita problemas de conteúdo duplicado

### 🧪 Testando o Novo Idioma

1. **Inicie o servidor**: `npm run dev`
2. **Acesse a URL**: `http://localhost:3000/[novo-idioma]`
3. **Teste o seletor de idiomas**
4. **Verifique todas as seções** do aplicativo
5. **Teste a tabela periódica** (nomes dos elementos)

### 📝 Checklist de Implementação

- [ ] Atualizar `routing.ts` com novo locale
- [ ] Criar arquivo `[idioma].json` com todas as traduções
- [ ] Atualizar `LanguageSwitcher.tsx` (se necessário)
- [ ] Configurar `generateStaticParams()` (se necessário)
- [ ] **⚠️ OBRIGATÓRIO: Atualizar `src/lib/seo.ts` com novo idioma**
- [ ] **⚠️ OBRIGATÓRIO: Atualizar `next-sitemap.config.js` com novo idioma**
- [ ] Atualizar metadados SEO no layout
- [ ] Testar navegação entre idiomas
- [ ] Verificar elementos químicos traduzidos
- [ ] Testar calculadoras em novo idioma
- [ ] Validar responsividade do seletor de idiomas

### 🌍 Idiomas Sugeridos para Expansão

**Prioridade Alta:**
- Espanhol (es) - Grande comunidade científica
- Francês (fr) - Tradição em química

**Prioridade Média:**
- Alemão (de) - Berço da química moderna
- Italiano (it) - Comunidade científica ativa

**Considerações Especiais:**
- Para idiomas RTL (árabe, hebraico): configurar `dir="rtl"`
- Para idiomas com caracteres especiais: verificar encoding UTF-8

### ⚠️ Problemas Comuns

1. **Erro de JSON inválido**: Verifique se o arquivo JSON está bem formatado
2. **Locale não reconhecido**: Certifique-se de que foi adicionado ao `routing.ts`
3. **Traduções faltando**: Use as mesmas chaves em todos os arquivos de idioma
4. **Cache do navegador**: Limpe o cache após adicionar novos idiomas

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
