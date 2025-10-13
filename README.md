# 🧠 Prompt Base Universal para o Projeto Mol Class (CLI, IDE, IA)

Este prompt deve ser usado por qualquer ferramenta de assistente de código (ChatGPT, Copilot, Cursor, IDEs) como contexto principal para **entender o projeto Mol Class**, respeitar suas convenções, **evitar alucinações**, e **sugerir soluções padronizadas e seguras**.

---

## ✨ Visão Geral do Projeto

O **Mol Class** é uma plataforma educacional web para cálculos e consultas em Química. Ela oferece:

- Tabela periódica interativa
- Calculadoras químicas (massa molar, diluição, etc.)
- Visualização molecular 2D/3D
- Internacionalização total (pt/en/...)
- Interface moderna, responsiva e acessível

Deploy oficial: `https://molclass.com`

---

## 🚀 Stack de Tecnologias

| Camada              | Tecnologias                                           |
| ------------------- | ----------------------------------------------------- |
| Frontend            | Next.js 15 (App Router, i18n, SSR, Metadata dinâmico) |
| UI/Estilo           | Tailwind CSS + shadcn/ui + Framer Motion              |
| Linguagem           | TypeScript (tipagem estrita)                          |
| Estado Global       | Zustand                                               |
| Visual Químico      | OpenChemLib, Kekule.js, 3Dmol.js                      |
| Internacionalização | `next-intl@4` com arquivos JSON localizados           |
| Deploy              | Vercel (domínio customizado)                          |

---

## ⚖️ Convenções Gerais

### Diretórios

- Organização por **feature** (domain-driven):

  - `features/periodic-table`, `features/catalog`, `features/visualization`, etc.

- Cada feature possui:

  - `components/`, `hooks/`, `store/`, `types/`, `utils/`, `constants/`, `events/`

### Linguagem e Estilo

- Sempre usar **TypeScript**. Nunca sugerir `any`.
- Preferir `type` ao invés de `interface`, exceto para objetos extensíveis.
- Imports devem usar alias `@/`
- Preferir hooks e utils modulares por responsabilidade.

### ESLint (FlatConfig)

```ts
"@typescript-eslint/no-explicit-any": "warn",
"@typescript-eslint/no-unused-vars": ["error", { "argsIgnorePattern": "^_", "varsIgnorePattern": "^_" }],
"react-hooks/exhaustive-deps": "warn",
```

Lint automático com:

```bash
npm run lint
```

### Regras de Código

- ❌ Proibido `any`
- ❌ Proibido `console.log` em produção
- ✅ Hooks no topo sempre
- ✅ Preferir composção de componentes e hooks pequenos
- ✅ Traduções via `useTranslations()` com chaves estruturadas

---

## 🌐 Internacionalização (i18n)

- Usamos `next-intl@4` com `App Router`
- Locales em:

  ```txt
  src/i18n/messages/pt.json
  src/i18n/messages/en.json
  ```

- Tradução automática de componentes com `useTranslations()`
- Toda nova feature deve suportar idiomas com:

```ts
const t = useTranslations("calculator");
t("title");
```

---

## 🔧 Comandos CLI

```bash
npm install          # instalar dependências
npm run dev          # rodar localmente
npm run build        # build para produção
npm run lint         # ESLint + autofix
```

---

## 📂 Versionamento Git

- Commits em padrão [Conventional Commits](https://www.conventionalcommits.org/):

```bash
git commit -m "feat(catalog): add filter by solubility"
git commit -m "fix(viewer2d): prevent overflow on large molecules"
```

- Branches devem ser nominais:

```bash
feature/compound-search
fix/translate-api-fallback
```

---

## 🚫 Regras Especiais para Assistentes de Código

Estas regras são para Copilot, ChatGPT, Cursor, Cody e outras IAs:

- ❌ Nunca usar `any`. Usar `unknown` ou `as Tipo` com validação.
- ✅ Sempre usar imports absolutos com `@/`
- ✅ Sempre seguir estrutura `features/` por domínio
- ✅ Sugira sempre hooks reutilizáveis e helpers com testes unitários
- ✅ Se sugerir comandos bash, usar `npm` (não `pnpm` nem `yarn`)
- ✅ Componentes devem suportar modo escuro (`dark:`)
- ✅ Toda função deve ser tipada

---

## ✨ Observações Finais

- Este projeto está em expansão constante
- Sempre verificar `README.md` para overview atual
- Sempre seguir a estrutura modular por feature

> Esta é a fonte oficial de verdade para todo o comportamento esperado de assistentes de código (IA/CLI/IDE) no projeto Mol Class. Atualize este arquivo sempre que houver mudanças de padrão no projeto.
