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
├── messages/                    # Arquivos de tradução organizados por idioma
│   ├── ar.json                 # Traduções principais em árabe
│   ├── ar/                     # Pasta do idioma árabe
│   │   ├── README.md          # Documentação específica do idioma
│   │   ├── common.json        # Traduções comuns
│   │   ├── components/        # Traduções de componentes
│   │   │   ├── compound-table.json
│   │   │   ├── multiselect.json
│   │   │   ├── navigation.json
│   │   │   └── table-headers.json
│   │   ├── data/              # Traduções de dados
│   │   │   ├── compounds.json
│   │   │   ├── elements.json
│   │   │   └── terms.json
│   │   ├── index.js           # Exportações do idioma
│   │   ├── legal/             # Traduções legais
│   │   │   ├── cookies.json
│   │   │   ├── privacy.json
│   │   │   └── terms.json
│   │   └── pages/             # Traduções de páginas
│   │       ├── calculators.json
│   │       ├── catalog.json
│   │       ├── home.json
│   │       ├── molar-mass.json
│   │       ├── periodic-table.json
│   │       └── visualization.json
│   ├── bn/                     # Pasta do idioma bengali
│   │   ├── README.md
│   │   ├── common.json
│   │   ├── components/
│   │   │   ├── button.json
│   │   │   ├── footer.json
│   │   │   ├── header.json
│   │   │   └── navigation.json
│   │   ├── data/
│   │   │   └── elements.json
│   │   ├── index.js
│   │   ├── legal/
│   │   │   ├── cookies.json
│   │   │   ├── privacy.json
│   │   │   └── terms.json
│   │   └── pages/
│   │       ├── about.json
│   │       ├── contact.json
│   │       └── home.json
│   ├── de.json                 # Traduções principais em alemão
│   ├── de/                     # Pasta do idioma alemão (estrutura similar)
│   ├── en.json                 # Traduções principais em inglês
│   ├── en/                     # Pasta do idioma inglês (estrutura similar)
│   ├── es.json                 # Traduções principais em espanhol
│   ├── es/                     # Pasta do idioma espanhol (estrutura similar)
│   ├── fr.json                 # Traduções principais em francês
│   ├── fr/                     # Pasta do idioma francês (estrutura similar)
│   ├── hi.json                 # Traduções principais em hindi
│   ├── hi/                     # Pasta do idioma hindi (estrutura similar)
│   ├── id/                     # Pasta do idioma indonésio
│   │   ├── README.md
│   │   ├── common.json
│   │   ├── components/
│   │   │   ├── button.json
│   │   │   ├── footer.json
│   │   │   ├── header.json
│   │   │   └── navigation.json
│   │   ├── data/
│   │   │   └── elements.json
│   │   ├── index.js
│   │   ├── legal/
│   │   │   ├── cookies.json
│   │   │   ├── privacy.json
│   │   │   └── terms.json
│   │   └── pages/
│   │       ├── about.json
│   │       ├── contact.json
│   │       └── home.json
│   ├── pt/                     # Pasta do idioma português (estrutura similar)
│   ├── ru.json                 # Traduções principais em russo
│   ├── ru/                     # Pasta do idioma russo (estrutura similar)
│   ├── zh.json                 # Traduções principais em chinês
│   └── zh/                     # Pasta do idioma chinês (estrutura similar)
├── navigation.ts               # Configuração de navegação internacionalizada
├── request.ts                  # Configuração de requisições i18n
└── routing.ts                  # Configuração de roteamento por locale
```

## 🌍 Idiomas Suportados

- **Português (pt)** - Idioma padrão
- **Inglês (en)** - Idioma secundário
- **Francês (fr)** - Idioma adicional
- **Espanhol (es)** - Idioma adicional
- **Alemão (de)** - Idioma adicional
- **Chinês (zh)** - Idioma adicional
- **Hindi (hi)** - Idioma adicional
- **Árabe (ar)** - Idioma adicional
- **Russo (ru)** - Idioma adicional
- **Português Brasileiro (pt-BR)** - Idioma adicional
- **Indonésio (id)** - Idioma adicional

## 📝 Organização Modular das Traduções

O projeto utiliza uma estrutura **híbrida** que combina:

### 1. **Arquivos Principais por Idioma** (ex: `en.json`, `pt.json`)
- Contêm as traduções mais utilizadas e críticas
- Carregados automaticamente pelo sistema de roteamento
- Ideais para conteúdo que aparece em múltiplas páginas

### 2. **Estrutura Modular por Pastas** (ex: `en/`, `pt/`, `id/`)
Cada idioma possui uma pasta organizada em módulos temáticos:

#### 📁 **components/** - Traduções de Componentes UI
```json
// components/navigation.json
{
  "home": "Home",
  "about": "About",
  "contact": "Contact"
}

// components/button.json
{
  "calculate": "Calculate",
  "clear": "Clear",
  "submit": "Submit"
}
```

#### 📁 **data/** - Traduções de Dados Científicos
```json
// data/elements.json
{
  "hydrogen": "Hydrogen",
  "helium": "Helium",
  "lithium": "Lithium"
}

// data/compounds.json
{
  "water": "Water",
  "carbonDioxide": "Carbon Dioxide"
}
```

#### 📁 **legal/** - Traduções Legais e Políticas
```json
// legal/privacy.json
{
  "title": "Privacy Policy",
  "lastUpdated": "Last updated"
}

// legal/cookies.json
{
  "title": "Cookie Policy",
  "accept": "Accept All"
}
```

#### 📁 **pages/** - Traduções Específicas de Páginas
```json
// pages/home.json
{
  "hero": {
    "title": "Welcome to MolClass",
    "subtitle": "Your chemistry learning platform"
  }
}

// pages/calculators.json
{
  "molarMass": {
    "title": "Molar Mass Calculator"
  }
}
```

### 🎯 **Vantagens desta Organização**

- ✅ **Modularidade**: Cada arquivo tem responsabilidade específica
- ✅ **Manutenibilidade**: Fácil localizar e editar traduções
- ✅ **Performance**: Carregamento sob demanda de módulos específicos
- ✅ **Colaboração**: Diferentes tradutores podem trabalhar em módulos separados
- ✅ **Escalabilidade**: Fácil adicionar novos módulos sem impactar existentes
- ✅ **Organização**: Separação clara entre UI, dados, legal e páginas

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

## 🚀 Como Usar as Traduções

### 1. **Traduções dos Arquivos Principais** (ex: `en.json`)

```typescript
import { useTranslations } from "next-intl";

export default function HomePage() {
  const t = useTranslations("common");

  return <h1>{t("welcome")}</h1>;
}
```

### 2. **Traduções Modulares** (carregamento dinâmico)

#### Componentes UI
```typescript
"use client";
import { useTranslations } from "next-intl";

export default function NavigationComponent() {
  // Carrega traduções do módulo components/navigation.json
  const t = useTranslations("components.navigation");

  return (
    <nav>
      <Link href="/">{t("home")}</Link>
      <Link href="/about">{t("about")}</Link>
      <Link href="/contact">{t("contact")}</Link>
    </nav>
  );
}
```

#### Dados Científicos
```typescript
import { useTranslations } from "next-intl";

export default function ElementCard({ symbol }: { symbol: string }) {
  // Carrega traduções do módulo data/elements.json
  const t = useTranslations("data.elements");

  return (
    <div className="element-card">
      <h3>{t(symbol.toLowerCase())}</h3>
      <span>{symbol}</span>
    </div>
  );
}
```

#### Páginas Específicas
```typescript
export default function CalculatorsPage() {
  // Carrega traduções do módulo pages/calculators.json
  const t = useTranslations("pages.calculators");

  return (
    <div>
      <h1>{t("molarMass.title")}</h1>
      <p>{t("molarMass.description")}</p>
    </div>
  );
}
```

#### Conteúdo Legal
```typescript
export default function CookieConsent() {
  // Carrega traduções do módulo legal/cookies.json
  const t = useTranslations("legal.cookies");

  return (
    <div className="cookie-banner">
      <p>{t("message")}</p>
      <button>{t("accept")}</button>
      <button>{t("decline")}</button>
    </div>
  );
}
```

### 3. **Navegação Internacionalizada**

```typescript
import { Link } from "@/i18n/navigation";

export default function Navigation() {
  return <Link href="/about">Sobre</Link>;
}
```

### 4. **Carregamento Condicional de Módulos**

```typescript
// Carrega apenas quando necessário
const loadElementTranslations = async (locale: string) => {
  const translations = await import(`@/i18n/messages/${locale}/data/elements.json`);
  return translations.default;
};
```

## 📋 Convenções de Nomenclatura

### **Para Arquivos Modulares**
1. **Nomes de arquivos**: `kebab-case` (ex: `compound-table.json`, `molar-mass.json`)
2. **Chaves JSON**: `camelCase` (ex: `periodicTable`, `molarMass`)
3. **Estrutura hierárquica**: Máximo 3 níveis de profundidade
4. **Consistência**: Mesma estrutura em todos os idiomas do módulo

### **Para Organização de Módulos**
- **components/**: Elementos de interface reutilizáveis
- **data/**: Informações científicas e dados estáticos
- **legal/**: Políticas, termos e conteúdo legal
- **pages/**: Conteúdo específico de páginas

### **Exemplos de Estrutura**
```json
// ✅ BOM: Estrutura clara e organizada
{
  "hero": {
    "title": "Welcome to MolClass",
    "subtitle": "Your chemistry platform"
  },
  "features": {
    "calculator": "Molar Mass Calculator",
    "table": "Periodic Table"
  }
}

// ❌ EVITAR: Muito profundo ou desorganizado
{
  "page": {
    "section": {
      "subsection": {
        "item": "Too deep"
      }
    }
  }
}
```

## 🔄 Adicionando Novas Traduções

### **Para Traduções Principais**
1. Adicione a chave em `messages/pt.json`
2. Adicione a tradução correspondente em `messages/en.json`
3. Use no componente: `useTranslations("chave")`

### **Para Traduções Modulares**
1. **Identifique o módulo correto**: components, data, legal ou pages
2. **Crie/edite o arquivo específico**: ex: `components/button.json`
3. **Mantenha consistência**: mesma estrutura em todos os idiomas
4. **Use no componente**: `useTranslations("components.button")`

### **Exemplo Prático**
```bash
# 1. Adicionar nova tradução de botão
# Editar: messages/en/components/button.json
{
  "save": "Save",
  "cancel": "Cancel",
  "delete": "Delete"  # ← Nova tradução
}

# 2. Replicar em outros idiomas
# Editar: messages/pt/components/button.json
{
  "save": "Salvar",
  "cancel": "Cancelar", 
  "delete": "Excluir"  # ← Nova tradução
}

# 3. Usar no componente
const t = useTranslations("components.button");
return <button>{t("delete")}</button>;
```

## 🌐 Implementando Novos Idiomas

### Passo a Passo Completo

#### 1. Atualizar Configuração de Roteamento

Edite `src/i18n/routing.ts` e adicione o novo código do idioma:

```typescript
export const routing = defineRouting({
  // Adicione o novo idioma aqui
  locales: ["pt", "en", "fr", "es"], // Exemplo: francês e espanhol
  defaultLocale: "pt",
});
```

#### 2. Criar Estrutura Completa do Idioma

##### **2.1. Arquivo Principal** (ex: `fr.json`)
Crie o arquivo principal na pasta `src/i18n/messages/`:

```json
{
  "common": {
    "welcome": "Bienvenue",
    "loading": "Chargement...",
    "language": {
      "fr": "Français",
      "pt": "Portugais",
      "en": "Anglais",
      "es": "Espagnol"
    }
  },
  "navigation": {
    "home": "Accueil",
    "about": "À propos"
  }
}
```

##### **2.2. Estrutura Modular** (pasta `fr/`)
Crie a pasta completa com todos os módulos:

```bash
src/i18n/messages/fr/
├── README.md                    # Documentação do idioma
├── common.json                  # Traduções comuns
├── index.js                     # Exportações do módulo
├── components/                  # Módulo de componentes
│   ├── button.json
│   ├── footer.json
│   ├── header.json
│   └── navigation.json
├── data/                        # Módulo de dados
│   └── elements.json
├── legal/                       # Módulo legal
│   ├── cookies.json
│   ├── privacy.json
│   └── terms.json
└── pages/                       # Módulo de páginas
    ├── about.json
    ├── contact.json
    └── home.json
```

##### **2.3. Exemplos de Arquivos Modulares**

**components/navigation.json**
```json
{
  "home": "Accueil",
  "about": "À propos",
  "contact": "Contact",
  "periodicTable": "Tableau Périodique",
  "calculators": "Calculatrices"
}
```

**data/elements.json**
```json
{
  "hydrogen": "Hydrogène",
  "helium": "Hélium",
  "lithium": "Lithium",
  "carbon": "Carbone",
  "oxygen": "Oxygène"
}
```

**legal/privacy.json**
```json
{
  "title": "Politique de Confidentialité",
  "lastUpdated": "Dernière mise à jour",
  "sections": {
    "dataCollection": "Collecte de Données",
    "cookies": "Utilisation des Cookies"
  }
}
```

**pages/home.json**
```json
{
  "hero": {
    "title": "Bienvenue sur MolClass",
    "subtitle": "Votre plateforme d'apprentissage de la chimie"
  },
  "features": {
    "calculator": "Calculatrice de Masse Molaire",
    "table": "Tableau Périodique Interactif"
  }
}
```

##### **2.4. Arquivo index.js**
Crie o arquivo de exportação para o módulo:

```javascript
// src/i18n/messages/fr/index.js
export { default as common } from './common.json';
export { default as components } from './components';
export { default as data } from './data';
export { default as legal } from './legal';
export { default as pages } from './pages';
```

#### 3. Atualizar Seletor de Idiomas (Opcional)

Modifique `src/shared/components/settings/LanguageSwitcher.tsx` para suportar múltiplos idiomas:

```typescript
const availableLocales = ["pt", "en", "fr", "es"];
const localeNames = {
  pt: "PT",
  en: "EN",
  fr: "FR",
  es: "ES",
};
```

#### 4. Configurar Geração Estática (Opcional)

Se usar geração estática, atualize `src/app/[locale]/layout.tsx`:

```typescript
export function generateStaticParams() {
  return [
    { locale: "pt" },
    { locale: "en" },
    { locale: "fr" },
    { locale: "es" },
  ];
}
```

#### 5. Atualizar Metadados SEO

No mesmo layout, configure os metadados:

```typescript
export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}) {
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

### 📝 Checklist de Implementação Completa

#### **🔧 Configuração Base**
- [ ] Atualizar `routing.ts` com novo locale
- [ ] Criar arquivo principal `[idioma].json` com traduções essenciais
- [ ] Atualizar `LanguageSwitcher.tsx` (se necessário)
- [ ] Configurar `generateStaticParams()` (se necessário)

#### **📁 Estrutura Modular**
- [ ] Criar pasta `messages/[idioma]/`
- [ ] Criar `README.md` específico do idioma
- [ ] Criar `common.json` com traduções comuns
- [ ] Criar `index.js` com exportações do módulo

#### **🧩 Módulos Temáticos**
- [ ] **components/**: Criar arquivos de componentes UI
  - [ ] `button.json` - Botões e ações
  - [ ] `footer.json` - Rodapé
  - [ ] `header.json` - Cabeçalho
  - [ ] `navigation.json` - Navegação
- [ ] **data/**: Criar arquivos de dados científicos
  - [ ] `elements.json` - Elementos químicos
  - [ ] `compounds.json` - Compostos (se aplicável)
  - [ ] `terms.json` - Terminologia científica (se aplicável)
- [ ] **legal/**: Criar arquivos legais
  - [ ] `cookies.json` - Política de cookies
  - [ ] `privacy.json` - Política de privacidade
  - [ ] `terms.json` - Termos de uso
- [ ] **pages/**: Criar arquivos de páginas específicas
  - [ ] `about.json` - Página sobre
  - [ ] `contact.json` - Página de contato
  - [ ] `home.json` - Página inicial
  - [ ] Outros arquivos conforme necessário

#### **⚠️ SEO e Metadados (OBRIGATÓRIO)**
- [ ] **Atualizar `src/lib/seo.ts`** com novo idioma
- [ ] **Atualizar `next-sitemap.config.js`** com novo idioma
- [ ] Atualizar metadados SEO no layout

#### **🧪 Testes e Validação**
- [ ] Testar navegação entre idiomas
- [ ] Verificar carregamento de traduções modulares
- [ ] Testar elementos químicos traduzidos
- [ ] Testar calculadoras em novo idioma
- [ ] Validar responsividade do seletor de idiomas
- [ ] Verificar funcionamento de todos os módulos
- [ ] Testar carregamento condicional de traduções

#### **📋 Finalização**
- [ ] Documentar traduções específicas do idioma
- [ ] Revisar consistência entre módulos
- [ ] Validar estrutura JSON de todos os arquivos
- [ ] Testar build de produção
- [ ] Verificar performance de carregamento

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

## 🧪 Desabilitação Temporária de Idiomas para Testes

### Quando Usar

É útil desabilitar temporariamente idiomas extras quando:

- Testando builds da aplicação
- Debugando problemas específicos de tradução
- Reduzindo complexidade durante desenvolvimento
- Melhorando performance de build em desenvolvimento

### Processo Passo a Passo

#### 1. Desabilitar no Roteamento

Edite `src/i18n/routing.ts`:

```typescript
// ANTES (todos os idiomas)
export const routing = defineRouting({
  locales: ["pt", "en", "fr", "es", "de", "zh", "hi", "ar", "ru"],
  defaultLocale: "pt",
  localePrefix: "as-needed",
});

// DEPOIS (apenas pt e en para teste)
export const routing = defineRouting({
  locales: ["pt", "en"], // Temporariamente desabilitados: 'fr', 'es', 'de', 'zh', 'hi', 'ar', 'ru'
  defaultLocale: "pt",
  localePrefix: "as-needed",
});
```

#### 2. Atualizar o Seletor de Idiomas

Edite `src/shared/components/settings/LanguageSwitcher.tsx`:

```typescript
// ANTES (todos os idiomas)
const LOCALES = [
  { code: "pt", flag: "/flags/br.png" },
  { code: "en", flag: "/flags/us.png" },
  { code: "fr", flag: "/flags/fr.png" },
  { code: "de", flag: "/flags/de.png" },
  { code: "es", flag: "/flags/es.png" },
  { code: "ar", flag: "/flags/sa.png" },
  { code: "hi", flag: "/flags/in.png" },
  { code: "ru", flag: "/flags/ru.png" },
  { code: "zh", flag: "/flags/cn.png" },
] as const;

// DEPOIS (apenas pt e en para teste)
const LOCALES = [
  { code: "pt", flag: "/flags/br.png" },
  { code: "en", flag: "/flags/us.png" },
  // Temporariamente desabilitados para teste:
  // { code: "fr", flag: "/flags/fr.png" },
  // { code: "de", flag: "/flags/de.png" },
  // { code: "es", flag: "/flags/es.png" },
  // { code: "ar", flag: "/flags/sa.png" },
  // { code: "hi", flag: "/flags/in.png" },
  // { code: "ru", flag: "/flags/ru.png" },
  // { code: "zh", flag: "/flags/cn.png" },
] as const;
```

#### 3. Testar o Build

```bash
npm run build
```

### Restaurando Todos os Idiomas

Para reativar todos os idiomas:

1. **No `routing.ts`**: Descomente os idiomas na array `locales`
2. **No `LanguageSwitcher.tsx`**: Descomente as linhas da constante `LOCALES`

### ⚠️ Importante

- **Use comentários**: Sempre comente ao invés de deletar para facilitar a reversão
- **Teste completo**: Após reativar, teste todos os idiomas
- **Documentação**: Mantenha este processo documentado para a equipe
- **Commits separados**: Faça commits separados para desabilitação e reativação

### Benefícios

- ✅ **Build mais rápido**: Menos arquivos de tradução para processar
- ✅ **Debug simplificado**: Foco apenas nos idiomas essenciais
- ✅ **Isolamento de problemas**: Identifica se erros são específicos de idiomas
- ✅ **Reversão fácil**: Processo simples de comentar/descomentar

## 📚 Recursos Adicionais

- [Documentação oficial do next-intl](https://next-intl-docs.vercel.app/)
- [Guia de migração](https://next-intl-docs.vercel.app/docs/getting-started)
- [Exemplos de uso](https://github.com/amannn/next-intl/tree/main/examples)
